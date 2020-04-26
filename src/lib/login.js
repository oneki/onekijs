import qs from "query-string";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { call } from "redux-saga/effects";
import { authService } from "./auth";
import { notificationService, useNotificationService } from "./notification";
import { latest } from "./saga";
import { useLocalService } from "./service";
import { generateCodeChallenge, generateCodeVerifier, generateNonce, generateState, getIdp, parseJwt } from "./utils/auth";
import { sha256 } from "./utils/crypt";
import { get } from "./utils/object";
import { absoluteUrl } from "./utils/url";
import { asyncHttp, asyncPost } from "./xhr";

const isOauth = idp => ["oauth2", "oidc"].includes(idp.type);
const isExternal = idp => {
  return isOauth(idp) || idp.type === "external";
};

const parseUrlToken = hash => {
  const token = {};
  const params = qs.parse(hash);
  [
    "access_token",
    "id_token",
    "refresh_token",
    "expires_in",
    "expires_at",
    "token_type"
  ].forEach(k => {
    if (params[k]) {
      token[k] = params[k];
    }
  });
  return token;
};

function* login(payload, { store, router, settings }) {
  try {
    if (!sessionStorage.getItem("onekijs.from")) {
      // check if the location state if we put a from element and save it in the sessionStorage
      const locationState = router.location.state || null;
      let from = get(settings, "routes.home", "/");
      if (locationState) {
        from = locationState.pathname || get(settings, "routes.home", "/");
        from += locationState.search || "";
        from += locationState.hash || "";
      }
      sessionStorage.setItem("onekijs.from", from);
    }

    const idp = getIdp(settings, payload.name);

    if (isOauth(idp)) {
      try {
        yield call(this.authService.loadToken);
        let token = get(store.getState(), "auth.token");
        if (token && parseInt(token.expires_at) >= Date.now()) {
          // do a success login
          return yield call(this.successLogin, {
            name: payload.name,
            token
          });
        }
      } catch (e) {}
    }

    let done = false;
    // try to fetch the security context to see if we are already logged in
    try {
      yield call(this.authService.fetchSecurityContext, {
        onSuccess: securityContext => {
          done = true;
          return this.successLogin({
            name: payload.name,
            securityContext
          });
        }
      });
    } catch (e) {}
    
    if (!done) {
      if (isExternal(idp)) {
        
        yield call(this.externalLogin, { name: payload.name });
      } else {
        // let print the form
        yield call(this.setRender, true);
      }
    }
  } catch (e) {
    if (payload.onError) {
      yield call(payload.onError, e);
    } else {
      throw e;
    }
  }
}

// redirect to the page managing external login
function* externalLogin(payload, { store, router, settings }) {
  try {
    // get external url from config
    const idp = getIdp(settings, payload.name);
    const redirectUri = absoluteUrl(`${router.location.pathname}/callback`);

    if (!isExternal(idp)) {
      throw Error(
        `IDP type ${idp.type} is not valid for an external authentication`
      );
    }

    if (isOauth(idp)) {
      if (typeof idp.authorizeUrl === "function") {
        const url = yield call(idp.authorizeUrl, idp, {
          store,
          router,
          settings
        });
        window.location.href = `${absoluteUrl(
          url,
          get(settings, "server.baseUrl")
        )}`;
      } else {
        const responseType = idp.responseType || "code";
        const redirectKey = idp.postLoginRedirectKey || "redirect_uri";
        const scope = idp.scope
          ? idp.scope
          : idp.type === "oidc"
          ? "openid"
          : null;
        let search = `?${redirectKey}=${redirectUri}&client_id=${idp.clientId}&response_type=${responseType}`;
        if (scope) {
          search += `&scope=${idp.scope}`;
        }
        if (idp.nonce || responseType.includes("id_token")) {
          const nonce = generateNonce();
          sessionStorage.setItem("onekijs.nonce", nonce);
          const hash = yield call(sha256, nonce);
          search += `&nonce=${hash}`;
        } else {
          sessionStorage.removeItem("onekijs.nonce");
        }
        if (idp.state) {
          const state = generateState();
          sessionStorage.setItem("onekijs.state", state);
          const hash = yield call(sha256, state);
          search += `&state=${hash}`;
        } else {
          sessionStorage.removeItem("onekijs.state");
        }
        if (responseType === "code" && idp.pkce) {
          const verifier = generateCodeVerifier();
          sessionStorage.setItem("onekijs.verifier", verifier);
          const challenge = yield call(generateCodeChallenge, verifier);
          search += `&code_challenge=${challenge}&code_challenge_method=S256`;
        } else {
          sessionStorage.removeItem("onekijs.verifier");
        }
        window.location.href = `${absoluteUrl(
          idp.authorizeUrl,
          get(settings, "server.baseUrl")
        )}${search}`;
      }
    } else if (typeof idp.loginUrl === "function") {
      const url = yield call(idp.loginUrl, idp, { store, router, settings });
      window.location.href = `${absoluteUrl(
        url,
        get(settings, "server.baseUrl")
      )}`;
    } else {
      const search = idp.postLoginRedirectKey
        ? `?${idp.postLoginRedirectKey}=${redirectUri}`
        : "";
      window.location.href = `${absoluteUrl(
        idp.loginUrl,
        get(settings, "server.baseUrl")
      )}${search}`;
    }
  } catch (e) {
    if (payload.onError) {
      yield call(payload.onError, e);
    } else {
      throw e;
    }
  }
}

function* externalLoginCallback(payload, { store, router, settings }) {
  try {
    const idp = getIdp(settings, payload.name);
    let callback = idp.callback;
    let token = null;
    let securityContext = null;
    let content = router.location;
    if (isOauth(idp)) {
      const responseType = idp.responseType || "code";
      if (responseType === "code") {
        if (typeof idp.tokenFetch === "function") {
          token = yield call(idp.tokenFetch, "authorization_code", idp, {
            store,
            router,
            settings
          });
        } else {
          const params = qs.parse(router.location.search);
          const state = sessionStorage.getItem("onekijs.state");
          sessionStorage.removeItem("onekijs.state");
          const headers = {
            "Content-Type": "application/x-www-form-urlencoded"
          };
          const hash = yield call(sha256, state);
          if (idp.state && hash !== params.state) {
            throw Error("Invalid oauth2 state");
          }
          const body = {
            grant_type: "authorization_code",
            client_id: idp.clientId,
            redirect_uri: absoluteUrl(`${router.location.pathname}`),
            code: params.code
          };
          if (idp.clientSecret) {
            if (idp.clientAuth === "body") {
              body.client_secret = idp.clientSecret;
            } else {
              headers.auth = {
                basic: {
                  user: idp.clientId,
                  password: idp.clientSecret
                }
              };
            }
          }
          if (idp.pkce) {
            body.code_verifier = sessionStorage.getItem("onekijs.verifier");
            sessionStorage.removeItem("onekijs.verifier");
          }

          token = yield call(asyncPost, idp.tokenFetch, body, { headers });
        }

        content = token;
      } else if (!callback || callback === "token") {
        callback = location => {
          return [parseUrlToken(location.hash), null];
        };
      }
    }

    if (typeof callback === "function") {
      [token, securityContext] = yield call(callback, content, idp, {
        store,
        router,
        settings
      });
    }

    if (isOauth(idp) && idp.nonce && token.id_token) {
      // check nonce in id token
      const id_token = parseJwt(token.id_token);
      const nonce = sessionStorage.getItem("onekijs.nonce");
      sessionStorage.removeItem("onekijs.nonce");
      const hash = yield call(sha256, nonce);
      if (hash !== id_token.nonce) {
        throw Error("Invalid oauth2 nonce");
      }
    }

    this.successLogin({
      token,
      securityContext,
      name: payload.name
    });
  } catch (e) {
    if (payload.onError) {
      yield call(payload.onError, e);
    } else {
      throw e;
    }
  }
}

function* formLogin(payload, { store, router, settings }) {
  try {
    // forward to reducer to set loading flag
    yield call(this.setLoading, true);
    const idp = getIdp(settings, payload.name);
    let result;

    if (typeof idp.loginFetch === "function") {
      result = yield call(idp.loginFetch, idp, payload, {
        store,
        router,
        settings
      });
    } else {
      const method = idp.loginMethod || "POST";
      const usernameKey = idp.usernameKey || "username";
      const passwordKey = idp.passwordKey || "password";
      const rememberMeKey = idp.rememberMeKey || "rememberMe";
      const contentType = idp.loginContentType || "application/json";

      let url = idp.loginFetch;

      let body = null;
      if (method === "GET") {
        url += `?${usernameKey}=${payload.username}&${passwordKey}=${payload.password}&${rememberMeKey}=${payload.rememberMe}`;
      } else {
        body = {
          [usernameKey]: payload.username,
          [passwordKey]: payload.password,
          [rememberMeKey]: payload.rememberMe
        };
      }

      result = yield call(
        asyncHttp,
        absoluteUrl(url, get(settings, "server.baseUrl")),
        method,
        body,
        {
          headers: {
            "Content-Type": contentType
          }
        }
      );
    }

    const callback = idp.callback || "cookie";
    // forward to reducer to save the security context
    let token = null,
      securityContext = null;
    if (typeof callback === "function") {
      [token, securityContext] = yield call(callback, result, idp, {
        store,
        router,
        settings
      });
    } else if (callback === "token") {
      token = result;
    } else if (callback === "securityContext") {
      securityContext = result;
    }

    yield call(this.successLogin, {
      token,
      securityContext,
      name: payload.name,
      onError: err => {
        throw err;
      }
    });

    if (payload.onSuccess) {
      yield call(payload.onSuccess, result);
    }
  } catch (e) {
    if (payload.onError) {
      yield call(payload.onError, e);
    } else {
      throw e;
    }
  }
}

function* successLogin(payload, { router, settings }) {
  try {
    const token = payload.token;
    const idp = getIdp(settings, payload.name);

    if (token) {
      yield call(this.authService.saveToken, { token, idp });
    } else {
      yield call(this.authService.setIdp, idp);
    }

    if (payload.securityContext) {
      yield call(this.authService.setSecurityContext, payload.securityContext);
    } else {
      yield call(this.authService.fetchSecurityContext, {
        onError:
          payload.onError ||
          (e => {
            throw e;
          })
      });
    }

    yield call(this.onSuccess);

    const history = router.history;
    const from =
      sessionStorage.getItem("onekijs.from") ||
      get(settings, "routes.home", "/");
    sessionStorage.removeItem("onekijs.from");
    yield call([history, history.push], from);
  } catch (e) {
    if (payload.onError) {
      yield call(payload.onError, e);
    } else {
      throw e;
    }
  }
}

function* logout(payload, context) {
  try {
    // forward to reducer to set loading flag
    const { router, settings, store } = context;
    yield this.setLoading(true);
    const idp = getIdp(settings, payload.name);
    if (isExternal(idp)) {
      if (typeof idp.logoutUrl === "function") {
        const url = yield call(idp.loginUrl, idp, { store, router, settings });
        window.location.href = `${absoluteUrl(
          url,
          get(settings, "server.baseUrl")
        )}`;
      } else if (idp.logoutUrl) {
        // do a redirect
        const redirectUri = absoluteUrl(`${router.location.pathname}/callback`);
        let search = "";
        if (isOauth(idp)) {
          const redirectKey =
            idp.postLogoutRedirectKey || "post_logout_redirect_uri";
          search = `?${redirectKey}=${redirectUri}&client_id=${idp.clientId}`;
        } else if (idp.postLogoutRedirectKey) {
          search = `?${idp.postLogoutRedirectKey}=${redirectUri}`;
        }

        window.location.href = `${absoluteUrl(
          idp.logoutUrl,
          get(settings, "server.baseUrl")
        )}${search}`;
      } else {
        yield call(this.successLogout, payload);
      }
    } else {
      if (typeof idp.logoutFetch === "function") {
        yield call(idp.logoutFetch, idp, { store, router, settings });
      } else if (idp.logoutFetch) {
        // call the server
        const method = idp.logoutMethod || "GET";
        yield call(
          asyncHttp,
          absoluteUrl(idp.logoutFetch, get(settings, "server.baseUrl")),
          method,
          null,
          { auth: store.getState().auth }
        );
      }

      yield call(this.successLogout, payload);
    }
  } catch (e) {
    if (payload.onError) {
      yield call(payload.onError, e);
    } else {
      throw e;
    }
  }
}

function* successLogout(payload) {
  try {
    yield call(this.authService.clear);
    yield call(this.onSuccess);
    if (payload.onSuccess) {
      yield call(payload.onSuccess);
    }
  } catch (e) {
    if (payload.onError) {
      yield call(payload.onError, e);
    } else {
      throw e;
    }
  }
}

export const loginService = {
  name: "login",
  reducers: {
    setLoading: function(state, loading) {
      state.loading = loading;
    },
    setRender: function(state, render) {
      state.doNotRender = !render;
    },
    onSuccess: function(state) {
      state.loading = false;
      state.errorMessage = null;
    },
    onError: function(state, error) {
      state.errorMessage = error.message;
      state.loading = false;
    }
  },
  sagas: {
    formLogin: latest(formLogin),
    userLogout: latest(logout),
    externalLogin: latest(externalLogin),
    externalLoginCallback: latest(externalLoginCallback),
    successLogin: latest(successLogin),
    login: latest(login)
  },
  inject: {
    notificationService,
    authService
  }
};

export const logoutService = {
  name: "logout",
  reducers: {
    setLoading: function(state, loading) {
      state.loading = loading;
    },
    onSuccess: function(state) {
      state.loading = false;
      state.errorMessage = null;
    },
    onError: function(state, error) {
      state.errorMessage = error.message;
      state.loading = false;
    }
  },
  sagas: {
    logout: latest(logout),
    successLogout: latest(successLogout)
  },
  inject: {
    authService
  }
};

export const useLoginService = (name, options = {}) => {
  const [state, service] = useLocalService(loginService, {
    doNotRender: true,
    loading: false
  });
  const notificationService = useNotificationService();
  const location = useLocation();
  const submit = useCallback(
    action => {
      return service.formLogin(Object.assign({ name }, action));
    },
    [service, name]
  );

  let onError = useCallback(
    e => {
      notificationService.send({
        topic: "error",
        id: "login-error",
        payload: e
      });
    },
    [notificationService]
  );

  onError = options.onError || onError;

  useEffect(() => {
    // it can be either
    //   - a redirect after trying to access a secure route
    //   - a callback after a successful external login

    // check if it's a callback
    if (location.pathname.endsWith("callback")) {
      service.externalLoginCallback({ name, onError });
    } else {
      service.login({ name, onError });
    }
  }, [service, location, name, onError]);

  return [state, submit];
};

export const useLogoutService = (name, options = {}) => {
  const [state, service] = useLocalService(logoutService, { loading: true });
  const location = useLocation();
  const notificationService = useNotificationService();

  let onError = useCallback(
    e => {
      notificationService.send({
        topic: "error",
        id: "logout-error",
        payload: e
      });
    },
    [notificationService]
  );

  onError = options.onError || onError;

  useEffect(() => {
    // check if it's a callback
    if (location.pathname.endsWith("callback")) {
      service.successLogout({ name, onError });
    } else {
      service.logout({ name, onError });
    }
  }, [service, location, name, onError]);

  return state;
};
