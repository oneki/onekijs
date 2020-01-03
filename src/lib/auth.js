import { notificationService } from "./notification";
import { asyncGet, asyncPost } from "./xhr";
import { latest } from "./saga";
import { set, get, isNull } from "./utils/object";
import { call, spawn, delay } from "redux-saga/effects";
import { useReduxService } from "./redux";
import { absoluteUrl } from "./utils/url";
import { parseJwt, getIdp, validateToken } from "./utils/auth";
import { useStoreProp } from "./store";


export const authService = {
  name: "auth",
  reducers: {
    setSecurityContext: function (state, securityContext) {
      set(state, 'auth.securityContext', securityContext);
    },

    setToken: function (state, token) {
      set(state, 'auth.token', token);
      ['access_token', 'id_token', 'refresh_token', 'expires_in', 'expires_at', 'token_type'].forEach(k => {
        if (isNull(token)) {
          localStorage.removeItem(`onekijs.${k}`);
        } else if (token[k]) {
          localStorage.setItem(`onekijs.${k}`, `${token[k]}`);
        }
      })
      if (typeof token === 'string') {
        localStorage.setItem('onekijs.token', token);
      } else if (isNull(token)) {
        localStorage.removeItem('onekijs.token');
      } else if (token.expires_in && !token.expires_at) {
        token.expires_at = Date.now() + parseInt(token.expires_in) * 1000;
        localStorage.setItem(`onekijs.expires_at`, `${token.expires_at}`);
      }
    },

    setIdp: function (state, idp) {
      if (isNull(idp)) {
        set(state, 'auth.idp', null);
        localStorage.removeItem('onekijs.idp');
      } else {
        set(state, 'auth.idp', idp.name);
        localStorage.setItem('onekijs.idp', idp.name);
      }
    }
  },
  sagas: {
    clear: latest(function* () {
      yield call(this.setSecurityContext, null);
      yield call(this.setToken, null);
      yield call(this.setIdp, null);
    }),

    fetchSecurityContext: latest(function* (action, { store, router, settings }) {
      try {
        const idpName = get(store.getState(), 'auth.idp') || localStorage.getItem('onekijs.idp');
        if (!idpName || idpName === 'null') {
          throw Error("Cannot fetch the security context for a non-logged user");
        }
        const idp = get(settings, `idp.${idpName}`);
        if (!idp) {
          throw Error(`Could not find the configuration for IDP ${idpName}`);
        }
        let securityContextFetch = idp.securityContextFetch;
        if (!securityContextFetch) {
          switch(idp.type) {
            case 'oidc':
              securityContextFetch = 'token://id_token';
              break;
            case 'oauth2':
              securityContextFetch = 'token://access_token';
              break;
            default:
              throw Error(`Could not find a valid fetcher for the security context`);              
          }
        }

        let securityContext = null;
        if (typeof securityContextFetch === 'function') {
          securityContext = yield call(securityContextFetch, idp, { store, router, settings });
        } else if (securityContextFetch.startsWith('token://')) {
          let token = get(store.getState(), 'auth.token');
          if (!token) {
            // try to load it from the localStorage
            yield call(this.loadToken);
            token = get(store.getState(), 'auth.token');
            if (!token) {
              throw Error(`Could not find a valid token for extracting the security context`);
            }
          }
          const token_prop = securityContextFetch.split('/')[2];
          securityContext = (token_prop) ? parseJwt(token[token_prop]) : parseJwt(token);
        } else {
          securityContext = yield call(asyncGet, absoluteUrl(securityContextFetch, get(settings, 'server.baseUrl')));
        }
        
        yield call(this.setSecurityContext, securityContext);

        if (action.onSuccess) {
          yield call(action.onSuccess, securityContext);
        }
      } catch (err) {
        if (action.onError) {
          yield call(action.onError, err);
        } else {
          this.notificationService.error(err);
        }
      }

    }),

    loadToken: latest(function* (action, { store, settings }) {
      if (!get(store.getState(), 'auth.token')) {
        
        const idpName = get(store.getState(), 'auth.idp') || localStorage.getItem('onekijs.idp');
        if (!idpName || idpName === 'null') {
          throw Error("A idp is required for loading a token");
        }
        const idp = getIdp(settings, idpName);

        if (localStorage.getItem('onekijs.access_token')) { // there is an oauth2 token in localStorage
          const token = {};
          ['access_token', 'id_token', 'refresh_token', 'expires_in', 'expires_at', 'token_type'].forEach(k => {
            token[k] = localStorage.getItem(`onekijs.${k}`);
          });

          const expires_at = parseInt(token.expires_at || 0);
          if (expires_at >= Date.now()) {
            yield call(this.saveToken, {
              token,
              idp
            })
          }
        } else if (localStorage.getItem('onekijs.token')) {
          yield call(this.saveToken, {
            token: localStorage.getItem('onekijs.token'),
            idp
          })
        }
      }
    }),

    refreshToken: latest(function* (payload, { store , router, settings }) {
      if (!payload.token.expires_at) return;

      // delay the refresh until the expiration of the token with a tolerance of idp.clockSkew
      const clockSkew = payload.idp.clockSkew || 60;
      const expires_at = parseInt(payload.token.expires_at);
      const to_delay = expires_at - (clockSkew * 1000) - Date.now();
      if (to_delay > 0) {
        yield delay(to_delay);
      }

      // check that the token has not been revoked or changed
      const actualToken = get(store.getState(), 'auth.token');
      if (payload.token === actualToken) {
        let token;
        if (typeof payload.idp.tokenFetch === 'function') {
          token = yield call(payload.idp.tokenFetch, 'refreshToken', payload.idp, { store, router, settings });
        } else {
          const body = {
            grant_type: 'refresh_token',
            client_id: payload.idp.clientId,
            refresh_token: payload.token.refresh_token
          }
          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          }

          if (payload.idp.clientSecret) {
            if (payload.idp.clientAuth === 'body') {
              body.client_secret = payload.idp.clientSecret
            } else {
              headers.auth = {
                basic: {
                  user: payload.idp.clientId,
                  password: payload.idp.clientSecret
                }
              }
            }
          }          
          token = yield call(asyncPost, payload.idp.tokenFetch, body, { headers })
        }
        token.refresh_token = payload.token.refresh_token;
        if (token.expires_in && !token.expires_at) {
          token.expires_at = Date.now() + parseInt(token.expires_in) * 1000;
        }
        yield call(this.saveToken, {token, idp: payload.idp});
      }
    }),

    saveToken: latest(function* (payload, context) {
      if (payload.idp.validate) {
        if (!payload.idp.pubKeyFetch) {
          throw Error('A pubKeyFetch is required to validate tokens');
        }
        if (payload.token.access_token) {
          const isValidAccessToken = yield call(validateToken, payload.token.access_token, payload.idp.pubKeyFetch, payload.idp, context);
          if (!isValidAccessToken) {
            throw Error('Invalid access token');
          }
        }
        if (payload.token.id_token) {
          const isValidIdToken = yield call(validateToken, payload.token.id_token, payload.idp.pubKeyFetch, payload.idp, context);
          if (!isValidIdToken) {
            throw Error('Invalid id token');
          }          
        }
      }
      if (payload.token.refresh_token) {
        yield spawn(this.refreshToken, payload)
      }
      yield call(this.setToken, payload.token)
      yield call(this.setIdp, payload.idp)
    })
  },
  inject: {
    notificationService
  }
}

export const useAuthService = () => {
  return useReduxService(authService);
}

export const useSecurityContext = (prop, defaultValue) => {
  const key = (prop) ? `auth.securityContext.${prop}` : 'auth.securityContext';
  return useStoreProp(key, defaultValue);
}
