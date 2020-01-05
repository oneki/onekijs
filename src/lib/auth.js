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

async function addCookie(name, value, secure=true, ttl=null, path='/') {
  if (secure) {
    value = await encrypt(value);
  }
  let cookie = `onekijs.${name}=${value};path=${path};SameSite=Strict;Secure;`
  if (ttl) {
    cookie += `expires=${getCookieExpireTime(ttl)}`
  }
  document.cookie = cookie;
}

const removeCookie = (name, path='/') => {
  document.cookie = `onekijs.${name}= ;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
}

// https://stackoverflow.com/questions/10730362/get-cookie-by-name
async function getCookie(name, secure=true) {
  name = `onekijs.${name}`;
  function escape(s) { return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1'); };
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  const result = match ? match[1] : null;
  return secure ? await decrypt(result) : result;
}

async function getItem(storage, key, secure=true) {
  const fullKey = `onekijs.${key}`;
  if (storage === 'localStorage') {
    return localStorage.getItem(fullKey);
  } else if (storage === 'sessionStorage') {
    return sessionStorage.getItem(fullKey);
  } else if (storage === 'cookie') {
    if (!isNull(sessionStorage.getItem(fullKey))) {
      return sessionStorage.getItem(fullKey);
    } else {
      return await getCookie(key, secure);
    }
  }
}

async function setItem(storage, key, value, secure=true, ttl=null, path='/') {
  const fullKey = `onekijs.${key}`;
  if (storage === 'localStorage') {
    localStorage.setItem(fullKey, value);
  } else if (storage === 'sessionStorage') {
    sessionStorage.setItem(fullKey, value);
  } else if (storage === 'cookie') {
    await addCookie(key, value, secure, ttl, path);
  }
}

function removeItem(storage, key) {
  const fullKey = `onekijs.${key}`;
  if (storage === 'localStorage') {
    localStorage.removeItem(fullKey);
  } else if (storage === 'sessionStorage') {
    sessionStorage.removeItem(fullKey);
  } else if (storage === 'cookie') {
    sessionStorage.removeItem(fullKey);
    removeCookie(key);
  }
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

      let toCookie = null;
      if (persist === 'cookie') {
        for (let type of ['refresh_token', 'access_token', 'token']) {
          if (token && token[type]) {
            toCookie = type;
            break;
          }
        }
      }
      const storage = (k) => {
        if (!token) return persist;
        if (k === toCookie) return 'cookie';
        return persist === 'localStorage' ? 'localStorage' : 'sessionStorage'
      }

      if (isNull(token)) {
        oauth2.forEach(k => {
          removeItem(storage(k), k)
        });
        removeItem(storage('token'), 'token');
      } else if (typeof token === 'string') {
        setItem(storage('token'), 'token', token); 
      } else {
        oauth2.forEach(k => {
          if (token[k]) {
            setItem(storage(k), k, `${token[k]}`);
          }
        });
        if (token.expires_in && !token.expires_at) {
          token.expires_at = Date.now() + parseInt(token.expires_in) * 1000;
          setItem(storage('expires_at'), 'expires_at', `${token.expires_at}`);
        }           
      }
      set(state, 'auth.token', token);
    },

    setIdp: function (state, idp, {settings}) {
      const nextIdp = idp;
      if (isNull(idp)) {
        const idpName = get(state, 'auth.idp') || getItem('sessionStorage', 'idp') || getItem('localStorage', 'idp');
        if (isNull(idpName)) return;
        idp = getIdp(settings, idpName);
      }
      const persist = get(idp, 'persist', 'localStorage');
      const storage = (persist === 'sessionStorage') ? 'sessionStorage': 'localStorage';      
      
      if (isNull(nextIdp)) {
        set(state, 'auth.idp', null);
        removeItem(storage, 'idp');
      } else {
        set(state, 'auth.idp', nextIdp.name);
        setItem(storage, 'idp', nextIdp.name)
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
      try {
        if (!get(store.getState(), 'auth.token')) {
          const idpName = get(store.getState(), 'auth.idp') || sessionStorage.getItem('onekijs.idp') || localStorage.getItem('onekijs.idp');
          if (!idpName || idpName === 'null') {
            throw Error("A idp is required for loading a token");
          }
          const idp = getIdp(settings, idpName);
          const persist = get(idp, 'persist', 'localStorage');
          const storage = persist === 'localStorage' ? 'localStorage' : 'sessionStorage';
          
          const expires_at = parseInt(yield call(getItem, storage, 'expires_at'));
          const clockSkew = idp.clockSkew || 60;

          const access_token = yield call(getItem, persist, 'access_token');
          if (access_token && expires_at >= (Date.now() + parseInt(clockSkew) * 1000)) {
            const token = {
              access_token
            };
            for (let k of oauth2) {
              if (k !== 'access_token') {
                token[k] = yield call(getItem, storage, k);
              }
            };

            return yield call(this.saveToken, {
              token,
              idp
            })

          }
          
          const refresh_token = yield call(getItem, persist, 'refresh_token');
          if (refresh_token) {
            return yield call(this.refreshToken, {
              token: {
                refresh_token
              },
              idp,
              force: true
            })
          } 
          
          const token = yield call(getItem, persist, 'token');
          if (token) {
            return yield call(this.saveToken, {
              token,
              idp
            })
          }
        }
      } catch (e) {
        if (payload.onError) {
          payload.onError(e);
        } else {
          throw e
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
