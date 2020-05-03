import { useEffect, useState } from "react";
import { call, delay, spawn } from "redux-saga/effects";
import HTTPError from "./error";
import { every, latest } from "./saga";
import { useReduxService } from "./service";
import { useReduxSelector } from "./store";
import { getIdp, getIdpName, parseJwt, validateToken, oauth2Keys } from "./utils/auth";
import { get, isNull, set, del } from "./utils/object";
import { onStorageChange, removeItem, setItem, getItem } from "./utils/storage";
import { absoluteUrl } from "./utils/url";
import { asyncGet, asyncPost } from "./xhr";

export const authService = {
  name: "auth",
  reducers: {
    /**
     * Save the security context in the redux store
     * 
     * @param {object} state : state of the redux store
     * @param {object} securityContext : the security context to save
     */
    setSecurityContext: function(state, securityContext) {
      set(state, "auth.securityContext", securityContext);
    },

    /**
     * Save the token in the redux store
     * 
     * @param {object} state : state of the redux store
     * @param {string|object} token : the token to save
     * @param {object} context :
     *    - settings: the full settings object passed to the application
     */
    setToken: function(state, token, { settings }) {
      const idpName = getIdpName(state);
      const idp = getIdp(settings, idpName);
      const persist = get(idp, "persist", null);

      let toCookie = null;
      // we only persist in the cookie the refresh token and if not specified, the access token
      if (persist === "cookie") {
        for (let type of ["refresh_token", "access_token", "token"]) {
          if (token && token[type]) {
            toCookie = type;
            break;
          }
        }
      }

      // any other key will not be saved in the cookie but in the sessionStorage
      const storage = k => {
        if (!token || persist === null) return persist;
        if (k === toCookie) return "cookie";
        
        return persist === "localStorage" ? "localStorage" : "sessionStorage";
      };
      
      if (isNull(token) || persist === null) {
        // if the token is null or the config specifies to persist nothing, 
        // we remove to token from the persistent storage
        oauth2Keys.forEach(k => {
          removeItem(`onekijs.${k}`, storage(k));
        });
        removeItem('onekijs.token', storage("token"));
        // remove the token from the redux state.
        del(state, 'auth.token');
      } 
      
      else if (typeof token === "string") {
        // it's not a oauth2 token but a simple "string" token. Persist as it is
        setItem("onekijs.token", token, storage("token"));
        // persist the token in the redux state. It can be added as a bearer to any ajax request.
        set(state, 'auth.token', token);
      } 
      
      else {
        // it's an oauth2 token, persist all keys
        oauth2Keys.forEach(k => {
          if (token[k]) {
            setItem(`onekijs.${k}`, `${token[k]}`, storage(k));
          }
        });
        // create a expirtes_at key for convenience
        if (token.expires_in && !token.expires_at) {
          token.expires_at = Date.now() + parseInt(token.expires_in) * 1000;
          setItem('onekijs.expires_at', `${token.expires_at}`, storage('expires_at'));
        }
        // persist the token in the redux state. It can be added as a bearer to any ajax request.
        set(state, 'auth.token', token);
      }
  
    },

    /**
     * Save the idp name in the redux store
     * 
     * @param {object} state : state of the redux store
     * @param {object} idp : the IDP to save (full object). Can be null for removal
     * @param {object} context :
     *    - router: the OnekiJS router of the application
     *    - settings: the full settings object passed to the application
     */
    setIdp: function(state, idp, { router, settings }) {
      const nextIdp = idp;
      
      if (isNull(idp)) {
        // if it's a removal, we need to check in which storage the idp name was saved
        // get the current idpName from the redux store
        const idpName = getIdpName(state);
        // if not found, the idp was already removed
        if (isNull(idpName)) return;
        // build the full IDP object from the settings
        idp = getIdp(settings, idpName);
      }

      // get the persistence storage specified by the IDP (null means that 
      // nothing related to authentication is persisted on the client side)
      const persist = get(idp, 'persist', null);

      // the idpName is always persisted (in the localStorage except if persist is sessionStorage)
      // This allows a user to refresh the tab (always) and open a new tab (if persist is not sessionStorage) 
      const storage =
        persist === 'sessionStorage' ? 'sessionStorage' : 'localStorage';

      if (isNull(nextIdp)) {
        // it's a removal, just remove from the redux store
        set(state, 'auth.idpName', null);
        // and the persistence storage
        removeItem('onekijs.idpName', storage);
      } else {
        // save the idp name in the redux store
        set(state, 'auth.idpName', nextIdp.name);
        // and in the persistence storage
        setItem('onekijs.idpName', nextIdp.name, storage);
        if (storage === "localStorage") {
          // listen to change on the idpName key and logout every other tab
          onStorageChange("onekijs.idpName", value => {
            if (value !== nextIdp.name) {
              router.push(get(settings, 'routes.logout') || '/logout');
            }
          });
        }
      }
    }
  },
  sagas: {
    /**
     * Clear all authentication data from the redux store 
     * and the persistence storage
     * 
     * @param {object} action :
     *    - onError: callback for any error
     *    - onSuccess: callback for any success
     */
    clear: latest(function*({onError, onSuccess}) {
      try {
        yield call(this.setSecurityContext, null);
        yield call(this.setToken, null);
        yield call(this.setIdp, null);
        if (onSuccess) {
          yield call(onSuccess);
        }        
      } catch (e) {
        if (onError) {
          yield call(onError, e);
        } else {
          throw e;
        }
      }
    }),

    /**
     * Get the security context from the server and save it
     * 
     * @param {object} action :
     *    - onError: callback for any error
     *    - onSuccess: callback for any success
     * @param {object} context : 
     *    - store: the redux store
     *    - router: the OnekiJS router of the application
     *    - settings: the full settings object passed to the application
     */
    fetchSecurityContext: latest(function*(
      { onSuccess, onError },
      { store, router, settings }
    ) {
      try {
        const idpName = getIdpName(store.getState());
        if (!idpName || idpName === "null") {
          // not idp name in the stage or the persistence storage => not yet authenticated
          throw new HTTPError(401);
        }

        const idp = getIdp(settings, idpName);
        if (!idp) {
          throw new HTTPError(500, `Could not find the configuration for IDP ${idpName} in the settings`);
        }

        let userinfoEndpoint = idp.userinfoEndpoint;
        if (!userinfoEndpoint) {
          throw new HTTPError(500, `Could not find a valid userinfo endpoint for idp ${idpName}`);
        }

        let securityContext = null;
        // we fetch the token from the redux store 
        let token = get(store.getState(), "auth.token");

        // or from the persistence storage
        if (!token) {
          // try to load it from the localStorage
          yield call(this.loadToken);
          token = get(store.getState(), "auth.token");
        }        
        if (typeof userinfoEndpoint === "function") {
          // delegate the security context fetching to the user-passed function
          securityContext = yield call(userinfoEndpoint, idp, {
            store,
            router,
            settings
          });
        } else if (userinfoEndpoint.startsWith("token://")) {
          // from the userinfo endpoint, we check which property of the token 
          // contains the security context (usually the id_token)
          // if no property was specified, the full token is the security context
          const token_prop = userinfoEndpoint.split("/")[2];
          if (!token) {
            // if the token was not found, we are not yet authenticated
            throw new HTTPError(401);
          }          
          securityContext = token_prop
            ? parseJwt(token[token_prop])
            : parseJwt(token);
        } else {
          // the userinfo endpoint is an URL, do a ajax call to 
          // get the security context
          securityContext = yield call(
            asyncGet,
            absoluteUrl(userinfoEndpoint, get(settings, "server.baseUrl")), 
            {
              // we add a bearer auth if a token was saved in the redux store
              auth: get(store.getState(), "auth")
            }
          );
        }
        
        // save the security context in the store
        yield call(this.setSecurityContext, securityContext);

        if (onSuccess) {
          // call the success callback
          yield call(onSuccess, securityContext);
        }
        return securityContext;
        
      } catch (e) {
        if (onError) {
          yield call(onError, e);
        } else {
          throw e;
        }
      }
    }),


    /**
     * Load the token from the persistence storage to the redux store
     * 
     * @param {object} action :
     *    - onError: callback for any error
     *    - onSuccess: callback for any success
     * @param {object} context : 
     *    - store: the redux store
     *    - settings: the full settings object passed to the application
     */
    loadToken: latest(function*({onError, onSuccess}, { store, settings }) {
      try {
        let result = get(store.getState(), "auth.token", null);
        if (isNull(result)) {
          
          const idpName = getIdpName(store.getState());
          if (!idpName || idpName === "null") {
            // not authenticated
            return null;
          }
          const idp = getIdp(settings, idpName);
          const persist = get(idp, "persist");
          if (!persist) {
            // the token is not persisted in the store
            return null;
          }
          
          // TODO: manage cookie storage
          const storage =
            persist === "localStorage" ? "localStorage" : "sessionStorage";

          const expires_at = parseInt(
            yield call(getItem, "onekijs.expires_at", storage)
          );
          const clockSkew = idp.clockSkew || 60;

          const access_token = yield call(getItem, "onekijs.access_token", persist);
          const refresh_token = yield call(getItem, "onekijs.refresh_token", persist);
          if (
            access_token &&
            expires_at >= Date.now() + parseInt(clockSkew) * 1000
          ) {
            // the token is still valid
            const token = {
              access_token,
              refresh_token
            };
            // build the token
            for (let k of oauth2Keys) {
              if (!token[k]) {
                token[k] = yield call(getItem, `onekijs.${k}`, storage);
              }
            }
            // save it 
            result = yield call(this.saveToken, {
              token,
              idp
            });
          }

          else if (refresh_token) {
            // the access token is not still valid but we have a refresh token
            // use the refresh token to get a new valid token
            result = yield call(this.refreshToken, {
              token: {
                refresh_token
              },
              idp,
              force: true
            });
          }

          else {
            const token = yield call(getItem, 'onekijs.token', persist);
            if (token) {
              result = yield call(this.saveToken, {
                token,
                idp
              });
            }
          }
        }

        if (onSuccess) {
          // call the success callback
          yield call(onSuccess, result);
        }

        return result;
      } catch (e) {
        if (onError) {
          yield call(onError, e);
        } else {
          throw e;
        }
      }
    }),

    /**
     * Refresh the token against an IDP
     * 
     * @param {object} action :
     *    - token: the current oauth token
     *    - idp: the IDP used to refresh the token
     *    - force: refresh the token even the current one is not expired
     *    - onError: callback for any error
     * @param {object} context : 
     *    - store: the redux store
     *    - settings: the full settings object passed to the application
     */
    refreshToken: every(function*({token, idp, force, onError }, { store, router, settings }) {
      try {
        if (!force && !token.expires_at) {
          // the token has no expiration time, so it's still valid
          return token;
        }

        if (!force) {
          // clockSkew is the delay before the end of token validity triggering 
          // the refreshing of the token
          const clockSkew = idp.clockSkew || 60;
          const expires_at = parseInt(token.expires_at);
          const to_delay = expires_at - clockSkew * 1000 - Date.now();
          
          if (to_delay > 0) {
            // we don't need to refresh yet the token => sleep the saga until then
            yield delay(to_delay);
          }

          // check that the token has not been revoked or changed
          const actualToken = get(store.getState(), "auth.token");
          if (token !== actualToken) {
            // another method has refresh / change the token (during the nap of this saga)
            // just return the actual one
            return actualToken;
          }
        }

        // refresh the token
        let nextToken;
        if (typeof idp.tokenEndpoint === "function") {
          // delegate to the function the task of refreshing the token
          nextToken = yield call(
            idp.tokenEndpoint,
            "refreshToken",
            idp,
            { store, router, settings }
          );
        } else {
          // build the request for refreshing the token
          const body = {
            grant_type: "refresh_token",
            client_id: idp.clientId,
            refresh_token: token.refresh_token
          };
          const headers = {
            "Content-Type": "application/x-www-form-urlencoded"
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
          nextToken = yield call(asyncPost, idp.tokenEndpoint, body, {
            headers
          });
        }
        // add to the result the refresh token (when refreshing a token, 
        // the result don't have the refresh token)
        nextToken.refresh_token = token.refresh_token;

        // add a expires_at property to the token for convenience
        if (nextToken.expires_in && !nextToken.expires_at) {
          nextToken.expires_at = Date.now() + parseInt(token.expires_in) * 1000;
        }
        return yield call(this.saveToken, { token: nextToken, idp });
      } catch (e) {
        if (onError) {
          yield call(onError, e);
        } else {
          throw e;
        }
      }
    }),

    /**
     * Validate the token and save it in the store and persistence storage and  
     * trigger the refreshing of the token if applicable
     * 
     * @param {object} action :
     *    - token: the current oauth token
     *    - idp: the IDP used to refresh the token
     *    - onError: callback for any error
     * @param {object} context : 
     *    - store: the redux store
     *    - settings: the full settings object passed to the application
     */
    saveToken: latest(function*({token, idp, onError}, {store, router, settings}) {
      try {
        if (idp.validate) {
          if (!idp.jwksEndpoint) {
            throw new HTTPError(500, "A jwksEndpoint is required to validate tokens");
          }
          if (token.id_token) {
            const isValidIdToken = yield call(
              validateToken,
              token.id_token,
              idp.jwksEndpoint,
              idp,
              {store, router, settings}
            );
            if (!isValidIdToken) {
              throw new HTTPError(400, "Invalid id token");
            }
          } else if (token.access_token) {
            const isValidAccessToken = yield call(
              validateToken,
              token.access_token,
              idp.jwksEndpoint,
              idp,
              {store, router, settings}
            );
            if (!isValidAccessToken) {
              throw new HTTPError(400, "Invalid access token");
            }
          }

        }

        yield call(this.setIdp, idp);
        yield call(this.setToken, token);

        if (token.refresh_token) {
          yield spawn(this.refreshToken, { token, idp, onError });
        }
        return token;
      } catch (e) {
        if (onError) {
          yield call(onError, e);
        } else {
          throw e;
        }
      }
    })
  }
};

export const useAuthService = () => {
  return useReduxService(authService);
};

export const useSecurityContext = (selector, defaultValue) => {
  const [loading, setLoading] = useState(false);
  const securityContext = useReduxSelector('auth.securityContext');
  const authService = useAuthService();

  useEffect(() => {
    if (securityContext !== undefined) {
      setLoading(false);
    } else {
      setLoading(true);
      authService.fetchSecurityContext({
        onError: (e) => authService.setSecurityContext(null)
      });
    }
    
  }, [authService, securityContext])
  
  return [get(securityContext, selector, defaultValue), loading];
};