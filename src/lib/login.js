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
import { absoluteUrl, toUrl } from "./utils/url";
import { asyncHttp, asyncPost } from "./xhr";

const isOauth = idp => idp.oauth2 === true || idp.oidc === true;
const isExternal = idp => idp.external === true;

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
      // const locationState = router.location.state || null;
      // const state = router.state;
      let from = get(settings, "routes.home", "/");
      const previous = router.previousLocation;
      if (previous) {
        from = previous.relativeurl;
      }
      sessionStorage.setItem("onekijs.from", from);
    }

    const idp = getIdp(settings, payload.name);

    if (isOauth(idp)) {
      yield call(this.authService.loadToken);
      let token = get(store.getState(), "auth.token");
      if (token && parseInt(token.expires_at) >= Date.now()) {
        // do a success login
        return yield call(this.successLogin, {
          name: payload.name,
          token
        });
      }
    }


    // try to fetch the security context to see if we are already logged in
    try {
      const securityContext = yield call(this.authService.fetchSecurityContext);
      return yield call(this.successLogin, {
        name: payload.name,
        securityContext
      });
    } catch(e) {
      if (e.statusCode >= 500) {
        throw e;
      }
    }


    if (isExternal(idp)) {
      yield call(this.externalLogin, { name: payload.name });
    } else {
      // let print the form
      yield call(this.setRender, true);
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
    const redirectUri = absoluteUrl(get(settings, 'routes.loginCallback', `${router.pathname}/callback`));

    if (!isExternal(idp)) {
      throw Error(
        `IDP type ${idp.type} is not valid for an external authentication`
      );
    }

    if (isOauth(idp)) {
      if (typeof idp.authorizeEndpoint === "function") {
        const url = yield call(idp.authorizeEndpoint, idp, {
          store,
          router,
          settings
        });
        window.location.href = `${absoluteUrl(
          url,
          get(settings, "server.baseUrl")
        )}`;
      } else {
        const responseType = idp.responseType;
        const redirectKey = idp.postLoginRedirectKey;
        const scope = idp.scope;
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
          search += `&code_challenge=${challenge}&code_challenge_method=${idp.codeChallengeMethod}`;
        } else {
          sessionStorage.removeItem("onekijs.verifier");
        }
        window.location.href = `${absoluteUrl(
          idp.authorizeEndpoint,
          get(settings, "server.baseUrl")
        )}${search}`;
      }
    } else if (typeof idp.loginEndpoint === "function") {
      const url = yield call(idp.loginEndpoint, idp, { store, router, settings });
      window.location.href = `${absoluteUrl(
        url,
        get(settings, "server.baseUrl")
      )}`;
    } else {
      const search = idp.postLoginRedirectKey
        ? `?${idp.postLoginRedirectKey}=${redirectUri}`
        : "";
      window.location.href = `${absoluteUrl(
        idp.loginEndpoint,
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
        if (typeof idp.tokenEndpoint === "function") {
          token = yield call(idp.tokenEndpoint, "authorization_code", idp, {
            store,
            router,
            settings
          });
        } else {
          // const params = qs.parse(router.query);
          const params = router.query;
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
            redirect_uri: absoluteUrl(`${router.pathname}`),
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

          token = yield call(asyncPost, idp.tokenEndpoint, body, { headers });
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

    if (isOauth(idp) && idp.nonce && get(token,'id_token')) {
      // check nonce in id token
      const id_token = parseJwt(token.id_token);
      const nonce = sessionStorage.getItem("onekijs.nonce");
      const hash = yield call(sha256, nonce);
      if (hash !== id_token.nonce) {
        sessionStorage.removeItem("onekijs.nonce");
        throw Error("Invalid oauth2 nonce");
      }
    }
    sessionStorage.removeItem("onekijs.nonce");
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
      console.log("ICI");
      yield call(this.authService.fetchSecurityContext, {
        onError:
          payload.onError ||
          (e => {
            throw e;
          })
      });
    }

    yield call(this.onSuccess);
    const from =
      sessionStorage.getItem("onekijs.from") ||
      get(settings, "routes.home", "/");
      sessionStorage.removeItem("onekijs.from");
    yield call([router, router.push], from);
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
      if (typeof idp.logoutEndpoint === "function") {
        const url = yield call(idp.loginEndpoint, idp, { store, router, settings });
        window.location.href = `${absoluteUrl(
          url,
          get(settings, "server.baseUrl")
        )}`;
      } else if (idp.logoutEndpoint) {
        // do a redirect
        const redirectUri = absoluteUrl(get(settings, 'routes.logoutCallback', `${router.pathname}/callback`));
        let search = "";
        if (isOauth(idp)) {
          const redirectKey =
            idp.postLogoutRedirectKey || "post_logout_redirect_uri";
          search = `?${redirectKey}=${redirectUri}&client_id=${idp.clientId}`;
        } else if (idp.postLogoutRedirectKey) {
          search = `?${idp.postLogoutRedirectKey}=${redirectUri}`;
        }

        window.location.href = `${absoluteUrl(
          idp.logoutEndpoint,
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

function* successLogout(payload, {router, settings}) {
  try {
    yield call(this.authService.clear);
    yield call(this.onSuccess);
    if (payload.onSuccess) {
      yield call(payload.onSuccess);
    } else {
      yield call([router, router.push], get(settings, "routes.home", "/"));
    }
  } catch (e) {
    console.log("successLogout ERROR!!!", e);
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

  const submit = useCallback(
    action => {
      return service.formLogin(Object.assign({ name }, action));
    },
    [service, name]
  );


  const onError = options.onError || notificationService.error;

  useEffect(() => {
    // it can be either
    //   - a redirect after trying to access a secure route
    //   - a callback after a successful external login

    // check if it's a callback

    service.login({ name, onError });
    
  }, [service, name, onError]);

  return [state, submit];
};

export const useLoginCallbackService = (name, options = {}) => {
  const [state, service] = useLocalService(loginService, {
    doNotRender: true,
    loading: false
  });
  const notificationService = useNotificationService();
  const onError = options.onError || notificationService.error;

  useEffect(() => {
      service.externalLoginCallback({ name, onError });
  }, [service, name, onError]);

  return state;
};

export const useLogoutService = (name, options = {}) => {
  const [state, service] = useLocalService(logoutService, { loading: true });
  const notificationService = useNotificationService();

  const onError = options.onError || notificationService.error;

  useEffect(() => {
    service.logout({ name, onError });
  }, [service, name, onError]);

  return state;
};

export const useLogoutCallbackService = (name, options = {}) => {
  const [state, service] = useLocalService(logoutService, { loading: true });
  const notificationService = useNotificationService();

  const onError = options.onError || notificationService.error;
  const onSuccess = options.onSuccess;

  useEffect(() => {
    service.successLogout({ name, onError, onSuccess });
  }, [service, name, onError, onSuccess]);

  return state;
};
