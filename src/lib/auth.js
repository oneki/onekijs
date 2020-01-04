import { notificationService } from "./notification";
import { asyncGet, asyncPost } from "./xhr";
import { latest, every } from "./saga";
import { set, get, isNull } from "./utils/object";
import { call, spawn, delay } from "redux-saga/effects";
import { useReduxService } from "./redux";
import { absoluteUrl } from "./utils/url";
import { parseJwt, getIdp, validateToken } from "./utils/auth";
import { useStoreProp } from "./store";
import { encrypt, decrypt } from "./utils/crypt";

const getCookieExpireTime = (ttl) => {
  const date = new Date();
  var time = date.getTime();
  var expireTime = time + 1000 * parseInt(ttl);
  date.setTime(expireTime);
  return date.toGMTString();
}

const addCookie = (key, value, ttl=null, path='/') => {
  let cookie = `onekijs.${key}=${value};path=${path};SameSite=Strict;Secure;`
  if (ttl) {
    cookie += `expires=${getCookieExpireTime(ttl)}`
  }
  document.cookie = cookie;
}

const removeCookie = (key, path='/') => {
  document.cookie = `onekijs.${key}= ;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
}

// https://stackoverflow.com/questions/10730362/get-cookie-by-name
const getCookie = (name) => {
  name = `onekijs.${name}`;
  function escape(s) { return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1'); };
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  return match ? match[1] : null;
}

const getItem = (storage, key) => {
  if (storage === 'localStorage') {
    return localStorage.getItem(`onekijs.${key}`);
  } 
  return sessionStorage.getItem(`onekijs.${key}`);
}


const oauth2 = ['access_token', 'id_token', 'refresh_token', 'expires_in', 'expires_at', 'token_type'];


export const authService = {
  name: "auth",
  reducers: {
    setSecurityContext: function (state, securityContext) {
      set(state, 'auth.securityContext', securityContext);
    },

    setToken: function (state, token, { settings }) {
      const idpName = get(state, 'auth.idp') || getItem('sessionStorage', 'idp') || getItem('localStorage', 'idp');
      const idp = getIdp(settings, idpName);
      const persist = get(idp, 'persist', 'localStorage');
      const storage = (persist === 'localStorage') ? localStorage : sessionStorage;

      
      set(state, 'auth.token', token);
      
      if (isNull(token)) {
        oauth2.forEach(k => {
          storage.removeItem(`onekijs.${k}`);
        });
        storage.removeItem('onekijs.token');
        if (persist === 'cookie') {
          removeCookie('token');
          removeCookie('refresh_token');
        }
      } else if (typeof token === 'string') {
        storage.setItem('onekijs.token', token);     
      } else {
        oauth2.forEach(k => {
          if (token[k]) {
            storage.setItem(`onekijs.${k}`, `${token[k]}`);
          }
        });
        if (token.expires_in && !token.expires_at) {
          token.expires_at = Date.now() + parseInt(token.expires_in) * 1000;
          storage.setItem(`onekijs.expires_at`, `${token.expires_at}`);
        }           
      }
    },

    setIdp: function (state, idp, {settings}) {
      const nextIdp = idp;
      if (isNull(idp)) {
        const idpName = get(state, 'auth.idp') || getItem('sessionStorage', 'idp') || getItem('localStorage', 'idp');
        if (isNull(idpName)) return;
        idp = getIdp(settings, idpName);
      }
      const persist = get(idp, 'persist', 'localStorage');
      const storage = (persist === 'sessionStorage') ? sessionStorage: localStorage;      
      
      if (isNull(nextIdp)) {
        set(state, 'auth.idp', null);
        storage.removeItem('onekijs.idp');
      } else {
        set(state, 'auth.idp', nextIdp.name);
        storage.setItem('onekijs.idp', nextIdp.name);
      }
    }
  },
  sagas: {
    clear: latest(function* () {
      yield call(this.setSecurityContext, null);
      yield call(this.setToken, null);
      yield call(this.setIdp, null);
    }),

    fetchSecurityContext: latest(function* (payload, { store, router, settings }) {
      try {
        const idpName = get(store.getState(), 'auth.idp') || sessionStorage.getItem('onekijs.idp') || localStorage.getItem('onekijs.idp');
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

        if (payload.onSuccess) {
          yield call(payload.onSuccess, securityContext);
        }
      } catch (err) {
        if (payload.onError) {
          yield call(payload.onError, err);
        } else {
          throw err;
        }
      }

    }),

    loadToken: latest(function* (payload, { store, settings }) {
      if (!get(store.getState(), 'auth.token')) {
        const idpName = get(store.getState(), 'auth.idp') || sessionStorage.getItem('onekijs.idp') || localStorage.getItem('onekijs.idp');
        if (!idpName || idpName === 'null') {
          throw Error("A idp is required for loading a token");
        }
        const idp = getIdp(settings, idpName);
        const storage = get(idp, 'persist', 'localStorage');

        if (storage === 'cookie') {

        }
        
        let token = getItem(storage, 'token');
        let refresh_token = getItem(storage, 'refresh_token');
        let access_token = getItem(storage, 'access_token');
        const expires_at = parseInt(getItem(storage, 'expires_at'));
        const clockSkew = idp.clockSkew || 60;

        try{
          if (storage === 'cookie' && !token && !refresh_token && !access_token) {
            refresh_token = yield call(decrypt, getCookie('refresh_token'));
            access_token = yield call(decrypt, getCookie('access_token'));
            token = yield call(decrypt, getCookie('token'));
          }
        } catch(e) {
          console.log(e);
        }


        if (access_token && expires_at >= (Date.now() + parseInt(clockSkew) * 1000)) {
          const token = {};
          oauth2.forEach(k => {
            token[k] = getItem(storage, k);
          });

          yield call(this.saveToken, {
            token,
            idp
          })

        } else if (refresh_token) {
          yield call(this.refreshToken, {
            token: {
              refresh_token
            },
            idp,
            force: true
          })
        } else if (token) {
          yield call(this.saveToken, {
            token,
            idp
          })
        }
      }
    }),

    refreshToken: every(function* (payload, { store , router, settings }) {
      if (!payload.force && !payload.token.expires_at) return;

      // delay the refresh until the expiration of the token with a tolerance of idp.clockSkew
      if (!payload.force) {
        const clockSkew = payload.idp.clockSkew || 60;
        const expires_at = parseInt(payload.token.expires_at);
        const to_delay = expires_at - (clockSkew * 1000) - Date.now();
        if (to_delay > 0) {
          yield delay(to_delay);
        }
        // check that the token has not been revoked or changed
        const actualToken = get(store.getState(), 'auth.token'); 
        if (payload.token !== actualToken) return; 
      }

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
    }),

    saveToken: latest(function* (payload, context) {
      if (payload.idp.validate !== false) {
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

      yield call(this.setIdp, payload.idp)
      yield call(this.setToken, payload.token)

      if (payload.idp.persist === 'cookie') {
        let value = null, key = null;
        if (payload.token.refresh_token) {
          key = 'refresh_token';
          value = yield call(encrypt, payload.token.refresh_token);
        } else if (payload.token.access_token) {
          key = 'access_token';
          value = yield call(encrypt,payload.token.access_token);
        } else if (typeof token === 'string') {
          key = 'token';
          value = yield call(encrypt, payload.token);
        }

        if (key) {
          yield call(addCookie, key, btoa(value), payload.idp.cookieTTL);
        }
        
      }         
            
      if (payload.token.refresh_token) {
        yield spawn(this.refreshToken, payload)
      }
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
