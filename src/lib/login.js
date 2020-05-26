import { useCallback, useEffect } from "react";
import { call } from "redux-saga/effects";
import { authService } from "./auth";
import { notificationService, useNotificationService, useNotifications } from "./notification";
import { latest } from "./saga";
import { useLocalService } from "./service";
import { generateCodeChallenge, generateCodeVerifier, generateNonce, generateState, getIdp, getIdpName, parseJwt } from "./utils/auth";
import { sha256 } from "./utils/crypt";
import { get } from "./utils/object";
import { absoluteUrl } from "./utils/url";
import { asyncHttp, asyncPost } from "./xhr";
import { SimpleError } from "./error";

const isOauth = (idp) => idp.oauth2 === true || idp.oidc === true;
const isExternal = (idp) => idp.external === true;

/**
 * Parse the token from the location hash
 * 
 * @param {object} hash : the location hash (anything after the # in the URL)
 */
const parseHashToken = (hash) => {
  const token = {};
  [
    "access_token",
    "id_token",
    "refresh_token",
    "expires_in",
    "expires_at",
    "token_type",
  ].forEach((k) => {
    if (hash[k]) {
      token[k] = hash[k];
    }
  });
  return token;
};

/**
 * Check if a login is necessary.
 *
 * @param action:
 *    - idpName: name of the IDP (as found in the settings)
 *    - onError: callback for catching possible errors
 * @param context:
 *    - router: an OnekiJS router
 *    - settings: the full settings object passed to the application
 */
function* login({ idpName, onError, onSuccess }, context) {
  const { router, settings } = context;
  try {
    if (!sessionStorage.getItem("onekijs.from")) {
      // get the previous location from the router and put the URL in the
      // sessionStorage
      // the URL will be used during the callback to redirect the user to the 
      // original location leading to the login page
      let from = get(settings, "routes.home", "/");
      let fromRoute = get(settings, "routes.home_route", from);
      const previous = router.previousLocation;
      if (previous) {
        from = previous.relativeurl;
        fromRoute = previous.route || from;
      }
      sessionStorage.setItem("onekijs.from", from);
      sessionStorage.setItem("onekijs.from_route", fromRoute);
    }

    // build the IDP configuration from the settings and some default values
    const idp = getIdp(settings, idpName);

    if (isOauth(idp)) {
      // ask the authService to load the token in the store from the 
      // localStorage (if not yet loaded)
      const token = yield call(this.authService.loadToken);
      if (token && parseInt(token.expires_at) >= Date.now()) {
        // do a success login because the token was found and is still valid
        return yield call(this.successLogin, {
          idpName,
          token,
          onError,
          onSuccess,
        });
      }
    }

    // try to fetch the security context to see if we are already logged in
    try {
      const securityContext = yield call(this.authService.fetchSecurityContext);
      // We didn't receive an 401 while loading the context, meaning that we are 
      // already logged => do a success login
      return yield call(this.successLogin, {
        idpName,
        securityContext,
        onError,
        onSuccess,
      });
    } catch (e) {
      // for any technical error (50X), we stop here and forward the error 
      // to the caller
      // for any business error (40X), we bypass the error (it's likely an 
      // unauthenticate error, so we continue the login process)
      if (e.code >= 500) {
        throw e;
      }
    }

    if (isExternal(idp)) {
      // do not render anything and redirect to an external login page
      yield call(this.externalLogin, { idpName, onError, onSuccess });
    }
  } catch (e) {
    yield call(this.onError, e);
    if (onError) {
      // the caller is not an async or generator function and manages error 
      // via a callback
      yield call(onError, e, context);
    } else {
      // the caller is an async or generator function and manages error 
      // via a try/catch
      throw e;
    }
  }
}

/**
 * Redirect the user to an external login page
 *
 * @param action:
 *    - idpName: name of the IDP (as found in the settings)
 *    - onError: callback for catching possible errors
 * @param context:
 *    - store: the Redux store
 *    - router: an OnekiJS router
 *    - settings: the full settings object passed to the application
 */
function* externalLogin({ idpName, onError }, context) {
  const { router, settings } = context;
  try {
    // build the IDP configuration from the settings and some default values
    const idp = getIdp(settings, idpName);

    const idpContext = Object.assign({}, context, { idp });
    // get the loginCallback route the settings
    const redirectUri = absoluteUrl(
      idp.loginCallbackRoute || `${router.pathname}/callback`
    );

    if (!isExternal(idp)) {
      throw Error(
        `IDP type ${idp.type} is not valid for an external authentication`
      );
    }

    
    if (isOauth(idp)) {

      const params = {
        client_id: idp.clientId,
        response_type: idp.responseType,
        [idp.postLoginRedirectKey]: redirectUri,
      }
      if (idp.scope) {
        params.scope = idp.scope;
      }
      if (idp.nonce || idp.responseType.includes("id_token")) {
        const nonce = generateNonce();
        sessionStorage.setItem("onekijs.nonce", nonce);
        const hash = yield call(sha256, nonce);
        params.nonce = hash;
      } else {
        sessionStorage.removeItem("onekijs.nonce");
      }
      if (idp.state) {
        const state = generateState();
        sessionStorage.setItem("onekijs.state", state);
        const hash = yield call(sha256, state);
        params.state = hash;
      } else {
        sessionStorage.removeItem("onekijs.state");
      }
      if (idp.responseType === "code" && idp.pkce) {
        const verifier = generateCodeVerifier();
        sessionStorage.setItem("onekijs.verifier", verifier);
        const challenge = yield call(generateCodeChallenge, verifier);
        params.code_challenge = challenge;
        params.code_challenge_method = idp.codeChallengeMethod;
      } else {
        sessionStorage.removeItem("onekijs.verifier");
      }      


      if (typeof idp.authorizeEndpoint === "function") {
        // if the user specifies a function as authorizeEndpoint, we delegate to 
        // this function the task of building the URL of the external login page
        const url = yield call(idp.authorizeEndpoint, params, idpContext);
        window.location.href = `${absoluteUrl(
          url,
          get(settings, "server.baseUrl")
        )}`;
      } else {
        // build the URL based on the spec
        // https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
        // const responseType = idp.responseType;
        // const redirectKey = idp.postLoginRedirectKey;
        // const scope = idp.scope;
        const search = Object.keys(params).reduce((accumulator, key) => {
          accumulator += accumulator.length > 1 ? '&' : '';
          return `${accumulator}${key}=${params[key]}`;
        }, "?");
        // let search = `?${redirectKey}=${redirectUri}&client_id=${idp.clientId}&response_type=${responseType}`;
        // if (scope) {
        //   search += `&scope=${idp.scope}`;
        // }
        // if (idp.nonce || responseType.includes("id_token")) {
        //   const nonce = generateNonce();
        //   sessionStorage.setItem("onekijs.nonce", nonce);
        //   const hash = yield call(sha256, nonce);
        //   search += `&nonce=${hash}`;
        // } else {
        //   sessionStorage.removeItem("onekijs.nonce");
        // }
        // if (idp.state) {
        //   const state = generateState();
        //   sessionStorage.setItem("onekijs.state", state);
        //   const hash = yield call(sha256, state);
        //   search += `&state=${hash}`;
        // } else {
        //   sessionStorage.removeItem("onekijs.state");
        // }
        // if (responseType === "code" && idp.pkce) {
        //   const verifier = generateCodeVerifier();
        //   sessionStorage.setItem("onekijs.verifier", verifier);
        //   const challenge = yield call(generateCodeChallenge, verifier);
        //   search += `&code_challenge=${challenge}&code_challenge_method=${idp.codeChallengeMethod}`;
        // } else {
        //   sessionStorage.removeItem("onekijs.verifier");
        // }
        window.location.href = `${absoluteUrl(
          idp.authorizeEndpoint,
          get(settings, "server.baseUrl")
        )}${search}`;
      }
    } else if (typeof idp.externalLoginEndpoint === "function") {
      // if the user specifies a function as externalLoginEndpoint, we delegate to 
      // this function the task of building the URL of the external login page
      const url = yield call(idp.externalLoginEndpoint, idpContext);
      window.location.href = `${absoluteUrl(
        url,
        get(settings, "server.baseUrl")
      )}`;
    } else {
      // we don't actually have a spec to follow. Just use the externalLoginEndpoint
      // and add the callback URL       
      const search = idp.postLoginRedirectKey
        ? `?${idp.postLoginRedirectKey}=${redirectUri}`
        : "";
      window.location.href = `${absoluteUrl(
        idp.externalLoginEndpoint,
        get(settings, "server.baseUrl")
      )}${search}`;
    }
  } catch (e) {
    yield call(this.onError, e);
    if (onError) {
      // the caller is not an async or generator function and manages error 
      // via a callback
      yield call(onError, e, context);
    } else {
      // the caller is an async or generator function and manages error 
      // via a try/catch
      throw e;
    }
  }
}

/**
 * Parse the token and the security context from the response of the 
 * external login
 *
 * @param action:
 *    - idpName: name of the IDP (as found in the settings)
 *    - onError: callback for catching possible errors
 * @param context:
 *    - store: the Redux store
 *    - router: an OnekiJS router
 *    - settings: the full settings object passed to the application
 */
function* externalLoginCallback({idpName, onError, onSuccess}, context) {
  const { router, settings } = context;
  try {
    // build the IDP configuration from the settings and some default values
    const idp = getIdp(settings, idpName);
    const idpContext = Object.assign({}, context, { idp })

    // by default, the response is the current location containing all 
    // parameters found in the URL
    let response = router.location;   
    
    // the callback found in the IDP configuration is a custom function
    // for parsing the reponse of the exernal login
    let callback = idp.callback;    
    
    // Will contain the token from the response (if found)
    let token = null;
    
    // Will contain the security context found in the response (if found)
    let securityContext = null;
    

    if (isOauth(idp)) {
      const responseType = idp.responseType || "code";
      if (responseType === "code") {
        if (typeof idp.tokenEndpoint === "function") {
          // if the user specifies a function as tokenEndpoint, we delegate to 
          // this function the task of validating the authorizeEndpoint response
          // and getting the token from the tokenEndpoint
          token = yield call(idp.tokenEndpoint, "authorization_code", idpContext);
        } else {
          // validating the authorizeEndpoint response based on spec
          // https://openid.net/specs/openid-connect-core-1_0.html#AuthResponseValidation
          const params = router.query;
          const state = sessionStorage.getItem("onekijs.state");
          sessionStorage.removeItem("onekijs.state");

          if (params.error) {
            throw new SimpleError(params.error_description, params.error);
          }

          if (!params.code) {
            throw new SimpleError("No authorization code received from Identity Provider", "missing_authorization_code");
          }

          const hash = yield call(sha256, state);
          if (idp.state && hash !== params.state) {
            throw new SimpleError("Invalid oauth2 state", "invalid_state");
          }
          
          // build the token request based on spec
          // https://openid.net/specs/openid-connect-core-1_0.html#TokenRequest
          const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
          };
          const body = {
            grant_type: "authorization_code",
            client_id: idp.clientId,
            redirect_uri: absoluteUrl(`${router.pathname}`),
            code: params.code,
          };
          if (idp.clientSecret) {
            if (idp.clientAuth === "body") {
              body.client_secret = idp.clientSecret;
            } else {
              headers.auth = {
                basic: {
                  user: idp.clientId,
                  password: idp.clientSecret,
                },
              };
            }
          }
          if (idp.pkce) {
            body.code_verifier = sessionStorage.getItem("onekijs.verifier");
            sessionStorage.removeItem("onekijs.verifier");
          }
          
          // get the token from the tokenEndpoint
          token = yield call(asyncPost, idp.tokenEndpoint, body, { headers });
        }
        
        // use the token instead of the location as the response
        response = token;
      } else if (!callback || callback === "token") {
        // create a default callback assuming that the response is a location
        // and parsing the token from the URL hash
        callback = (location) => {
          return [parseHashToken(location.hash), null];
        };
      }
    }

    if (typeof callback === "function") {
      // delegate to the callback the task of parsing the token and the 
      // security context from the response
      [token, securityContext] = yield call(callback, response, idpContext);
    }

    if (isOauth(idp) && idp.nonce && get(token, "id_token")) {
      // validates the nonce found in the id_token
      // https://openid.net/specs/openid-connect-core-1_0.html#TokenResponseValidation
      const id_token = parseJwt(token.id_token);
      const nonce = sessionStorage.getItem("onekijs.nonce");
      const hash = yield call(sha256, nonce);
      sessionStorage.removeItem("onekijs.nonce");
      if (hash !== id_token.nonce) {
        throw Error("Invalid oauth2 nonce");
      }
    }

    this.successLogin({
      token,
      securityContext,
      idpName,
      onError,
      onSuccess,
    });
  } catch (e) {
    yield call(this.onError, e);
    if (onError) {
      // the caller is not an async or generator function and manages error 
      // via a callback
      yield call(onError, e, context);
    } else {
      // the caller is an async or generator function and manages error 
      // via a try/catch
      throw e;
    }
  }
}

/**
 * Submit the login form
 *
 * @param action:
 *    - username: the value from the username field
 *    - password: the value from the password field
 *    - rememberMe: the value from the rememberMe checkbox
 *    - idpName: name of the IDP (as found in the settings)
 *    - onError: callback for catching possible errors
 * @param context:
 *    - router: an OnekiJS router
 *    - settings: the full settings object passed to the application
 */
function* formLogin({idpName, onError, onSuccess, username, password, rememberMe}, context) {
  const { settings } = context
  try {
    // forward to reducer to set the loading flag to true
    yield call(this.setLoading, true);
    
    // build the IDP configuration from the settings and some default values
    const idp = getIdp(settings, idpName);
    const idpContext = Object.assign({}, context, { idp })
    
    // will contain the result of the submit
    let response;

    if (typeof idp.loginEndpoint === "function") {
      // if the user specifies a function as loginEndpoint, we delegate to 
      // this function the task of submitting the form     
      response = yield call(idp.loginEndpoint, {username, password, rememberMe}, idpContext);
    } else {
      // create the submit request 
      const method = idp.loginMethod || "POST";
      const usernameKey = idp.usernameKey || "username";
      const passwordKey = idp.passwordKey || "password";
      const rememberMeKey = idp.rememberMeKey || "rememberMe";
      const contentType = idp.loginContentType || "application/json";
      let url = idp.loginEndpoint;
      let body = null;
      
      if (method === "GET") {
        url += `?${usernameKey}=${username}&${passwordKey}=${password}&${rememberMeKey}=${rememberMe}`;
      } else {
        body = {
          [usernameKey]: username,
          [passwordKey]: password,
          [rememberMeKey]: rememberMe,
        };
      }

      response = yield call(
        asyncHttp,
        absoluteUrl(url, get(settings, "server.baseUrl")),
        method,
        body,
        {
          headers: {
            "Content-Type": contentType,
          },
        }
      );
    }

    // try to parse the token and the security context from the response
    let token = null,
      securityContext = null;
    if (typeof idp.callback === "function") {
      // when the user specifies a function as the callback, we delegate to this
      // function the task of parsing the token and the security context from 
      // the response
      [token, securityContext] = yield call(idp.callback, response, idpContext);
    } else if (idp.callback === "token") {
      // when the callback is set to "token", the response is the token
      token = response;
    } else if (idp.callback === "securityContext") {
      // when the callback is set to "securityContext", the response is the 
      // security context
      securityContext = response;
    }

    yield call(this.successLogin, {
      token,
      securityContext,
      idpName,
      onError,
      onSuccess
    });

  } catch (e) {
    yield call(this.onError, e);
    if (onError) {
      // the caller is not an async or generator function and manages error 
      // via a callback
      yield call(onError, e, context);
    } else {
      // the caller is an async or generator function and manages error 
      // via a try/catch
      throw e;
    }
  }
}

/**
 * Save the token and the security context
 *
 * @param action:
 *    - idpName: name of the IDP (as found in the settings)
 *    - onError: callback for catching possible errors
 * @param context:
 *    - router: an OnekiJS router
 *    - settings: the full settings object passed to the application
 */
function* successLogin({token, securityContext, idpName, onError, onSuccess}, context) {
  const { settings, router } = context;
  try {
    // build the IDP configuration from the settings and some default values
    const idp = getIdp(settings, idpName);

    if (token) {
      // save the IDP and the token
      yield call(this.authService.saveToken, { token, idp });
    } else {
      // save only the IDP
      yield call(this.authService.setIdp, idp);
    }

    if (securityContext) {
      // save the securityContext
      yield call(this.authService.setSecurityContext, securityContext);
    } else {
      // get the securityContext from the userInfo endpoint and save it
      yield call(this.authService.fetchSecurityContext);
    }

    // call the reducer to update the local state
    yield call(this.onSuccess);
    yield call(this.notificationService.clearTopic, 'login-error');
    
    // get the original route
    const from =
      sessionStorage.getItem("onekijs.from") ||
      get(settings, "routes.home", "/");
    const from_route =
      sessionStorage.getItem("onekijs.from_route") ||
      get(settings, "routes.home_route", from);      
    sessionStorage.removeItem("onekijs.from");
    sessionStorage.removeItem("onekijs.from_route");
    
    if (onSuccess) {
      // the caller manages the success login
      yield call(onSuccess, [token, securityContext], Object.assign({}, context, { from }));
    } else {
      // redirect the user to the original route
      yield call([router, router.push], from, from_route);
    }

  } catch (e) {
    yield call(this.onError, e);
    if (onError) {
      // the caller is not an async or generator function and manages error 
      // via a callback
      yield call(onError, e, context);
    } else {
      // the caller is an async or generator function and manages error 
      // via a try/catch
      throw e;
    }
  }
}

/**
 * Logout the user or redirect to an external logout page
 *
 * @param action:
 *    - idpName: name of the IDP (as found in the settings)
 *    - onError: callback for catching possible errors
 * @param context:
 *    - router: an OnekiJS router
 *    - settings: the full settings object passed to the application
 */
function* logout({onError, onSuccess}, context) {
  const { router, settings, store } = context;
  try {
    const idpName = getIdpName(store.getState());
    if (!idpName) {
      return yield call(this.successLogout, {onError, onSuccess});
    }

    // forward to reducer to set loading flag
    yield this.setLoading(true);

    // build the IDP configuration from the settings and some default values
    const idp = getIdp(settings, idpName);
    const idpContext = Object.assign({}, context, { idp })
    
    if (isExternal(idp)) {
      if (typeof idp.externalLogoutEndpoint === "function") {
        // if the user specifies a function as externalLogoutEndpoint, we delegate to 
        // this function the task of building the URL of the external logout
        // page
        const url = yield call(idp.externalLogoutEndpoint, idpContext);
        window.location.href = `${absoluteUrl(
          url,
          get(settings, "server.baseUrl")
        )}`;
      } else if (idp.externalLogoutEndpoint) {
         // Build the logout URL
        const redirectUri = absoluteUrl(
          idp.logoutCallbackRoute ||  `${router.pathname}/callback`
        );
        let search = "";
        if (isOauth(idp)) {
        // Build the logout URL based on specs
        // https://openid.net/specs/openid-connect-frontchannel-1_0.html
          const redirectKey =
            idp.postLogoutRedirectKey || "post_logout_redirect_uri";
          search = `?${redirectKey}=${redirectUri}&client_id=${idp.clientId}`;
        } else if (idp.postLogoutRedirectKey) {
          search = `?${idp.postLogoutRedirectKey}=${redirectUri}`;
        }

        window.location.href = `${absoluteUrl(
          idp.externalLogoutEndpoint,
          get(settings, "server.baseUrl")
        )}${search}`;
      } else {
        // nothing to do, just call successLogout
        yield call(this.successLogout, {idpName, onError, onSuccess});
      }
    } else {
      if (typeof idp.logoutEndpoint === "function") {
        // if the user specifies a function as logoutEndpoint, we delegate to 
        // this function the task of doing the logout request
        yield call(idp.logoutEndpoint, idpContext);
      } else if (idp.logoutEndpoint) {
        // call the server
        const method = idp.logoutMethod || "GET";
        yield call(
          asyncHttp,
          absoluteUrl(idp.logoutEndpoint, get(settings, "server.baseUrl")),
          method,
          null,
          { auth: store.getState().auth }
        );
      }

      // the logout is done => call successLogout
      yield call(this.successLogout, {onError, onSuccess});
    }
  } catch (e) {
    yield call(this.onError, e);
    if (onError) {
      // the caller is not an async or generator function and manages error 
      // via a callback
      yield call(onError, e, context);
    } else {
      // the caller is an async or generator function and manages error 
      // via a try/catch
      throw e;
    }
  }
}

function* successLogout({onError, onSuccess}, context) {
  const { router, settings } = context;
  try {
    // clear the token and the security context
    yield call(this.authService.clear);
    
    // call the reducer to update the local state
    yield call(this.onSuccess);
    yield call(this.notificationService.clearTopic, 'logout-error');

    if (onSuccess) {
      // the caller manages the success logout
      yield call(onSuccess);
    } else {
      // redirect to the home page
      yield call([router, router.push], get(settings, "routes.home", "/"));
    }
  } catch (e) {
    yield call(this.onError, e);
    if (onError) {
      // the caller is not an async or generator function and manages error 
      // via a callback
      yield call(onError, e, context);
    } else {
      // the caller is an async or generator function and manages error 
      // via a try/catch
      throw e;
    }
  }
}

export const loginService = {
  name: "login",
  reducers: {
    /**
     * Inform the user if there is a loading task
     * 
     * @param {object} state: the redux state 
     * @param {boolean} loading
     */
    setLoading: function (state, loading) {
      state.loading = loading;
    },

    /**
     * Inform the user if there is an error
     * 
     * @param {object} state: the redux state 
     * @param {object} error 
     */
    onError: function (state, error) {
      state.error = error;
      state.loading = false;
    },    

    /**
     * Reset the loading and error message after a successful operation
     * 
     * @param {object} state: the redux state 
     */
    onSuccess: function (state) {
      state.loading = false;
      state.error = null;
    },
  },

  sagas: {
    formLogin: latest(formLogin),
    userLogout: latest(logout),
    externalLogin: latest(externalLogin),
    externalLoginCallback: latest(externalLoginCallback),
    successLogin: latest(successLogin),
    login: latest(login),
  },

  inject: {
    notificationService,
    authService,
  },
};

export const logoutService = {
  name: "logout",
  reducers: {
    /**
     * Inform the user if there is a loading task
     * 
     * @param {object} state: the redux state 
     * @param {boolean} loading
     */
    setLoading: function (state, loading) {
      state.loading = loading;
    },

    /**
     * Inform the user if there is an error
     * 
     * @param {object} state: the redux state 
     * @param {object} error 
     */
    onError: function (state, error) {
      state.error = error;
      state.loading = false;
    },    

    /**
     * Reset the loading and error message after a successful operation
     * 
     * @param {object} state: the redux state 
     */
    onSuccess: function (state) {
      state.loading = false;
      state.error = null;
    },
  },
  sagas: {
    logout: latest(logout),
    successLogout: latest(successLogout),
  },
  inject: {
    authService,
    notificationService,
  },
};

// manage the login
export const useLoginService = (idpName, options = {}) => {
  // create the local login service
  const [state, service] = useLocalService(loginService, {
    loading: false,
    error: null
  });

  // inject the global notificationService
  const notificationService = useNotificationService();

  // build the submit method in case of a form login
  const submit = useCallback(
    (action) => {
      return service.formLogin(Object.assign({idpName}, action));
    },
    [service, idpName]
  );

  // we send errors to the notification service
  const defaultOnError = useCallback((error) => {
    notificationService.send({
      topic: 'login-error',
      payload: error
    })
  },[notificationService])
  const onError = options.onError || defaultOnError;
  const onSuccess = options.onSuccess;
  const callback = options.callback;

  useEffect(() => {
    console.log("useEffect loginSErvice");
    if (callback) {
      // call the external login callback saga
      service.externalLoginCallback({ idpName, onError, onSuccess });
    } else {
      // call the login saga
      service.login({ idpName, onError, onSuccess });
    }
  }, [service, idpName, onError, onSuccess, callback]);

  return [state.error, state.loading, submit];
};

// manage the result of a external login
export const useLoginCallbackService = (name, options = {}) => {
  options.callback = true;
  const [error, loading,] = useLoginService(name, options)
  return [error, loading];
};

export const useLoginError = () => {
  const errors = useNotifications('login-error');
  return errors[0];
}

export const useLogoutService = (options = {}) => {
  const [state, service] = useLocalService(logoutService, { loading: true });
  const notificationService = useNotificationService();

  // we send errors to the notification service
  const defaultOnError = useCallback((error) => {
    notificationService.send({
      topic: 'logout-error',
      payload: error
    })
  },[notificationService])
  const onError = options.onError || defaultOnError
  const onSuccess = options.onSuccess;
  const callback = options.callback;  

  useEffect(() => {
    if (callback) {
      service.successLogout({  onError, onSuccess });
    } else {
      service.logout({ onError, onSuccess });
    }
    
  }, [service, onError, onSuccess, callback]);

  return state;
};

export const useLogoutCallbackService = (options = {}) => {
  options.callback = true;
  return useLogoutService(options);
};

export const useLogoutError = () => {
  const errors = useNotifications('logout-error');
  return errors[0];
}
