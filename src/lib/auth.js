import { useContext } from "react";
import { call, delay, spawn } from "redux-saga/effects";
import HTTPError from "./error";
import { every, latest } from "./saga";
import { useReduxService } from "./service";
import { getIdp, parseJwt, validateToken } from "./utils/auth";
import { decrypt, encrypt } from "./utils/crypt";
import { get, isNull, set } from "./utils/object";
import { onStorageChange } from "./utils/storage";
import { absoluteUrl } from "./utils/url";
import { asyncGet, asyncPost } from "./xhr";
import { AppContext } from "./context";
import { useReduxSelector } from "./store";

const getCookieExpireTime = ttl => {
  const date = new Date();
  var time = date.getTime();
  var expireTime = time + 1000 * parseInt(ttl);
  date.setTime(expireTime);
  return date.toGMTString();
};

async function addCookie(name, value, secure = true, ttl = null, path = "/") {
  if (secure) {
    value = await encrypt(value);
  }
  let cookie = `onekijs.${name}=${value};path=${path};SameSite=Strict;Secure;`;
  if (ttl) {
    cookie += `expires=${getCookieExpireTime(ttl)};`;
  }
  document.cookie = cookie;
}

const removeCookie = (name, path = "/") => {
  document.cookie = `onekijs.${name}= ;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};`;
};

// https://stackoverflow.com/questions/10730362/get-cookie-by-name
async function getCookie(name, secure = true) {
  name = `onekijs.${name}`;
  function escape(s) {
    return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, "\\$1");
  }
  var match = document.cookie.match(
    RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)")
  );
  const result = match ? match[1] : null;
  return secure ? await decrypt(result) : result;
}

async function getItem(storage, key, secure = true) {
  const fullKey = `onekijs.${key}`;
  if (storage === "localStorage") {
    return localStorage.getItem(fullKey);
  } else if (storage === "sessionStorage") {
    return sessionStorage.getItem(fullKey);
  } else if (storage === "cookie") {
    if (!isNull(sessionStorage.getItem(fullKey))) {
      return sessionStorage.getItem(fullKey);
    } else {
      return await getCookie(key, secure);
    }
  }
}

async function setItem(
  storage,
  key,
  value,
  secure = true,
  ttl = null,
  path = "/"
) {
  const fullKey = `onekijs.${key}`;
  if (storage === "localStorage") {
    localStorage.setItem(fullKey, value);
  } else if (storage === "sessionStorage") {
    sessionStorage.setItem(fullKey, value);
  } else if (storage === "cookie") {
    await addCookie(key, value, secure, ttl, path);
  }
}

function getIdpName(state) {
  return get(state, "auth.idp") ||
      sessionStorage.getItem("onekijs.idp") ||
      localStorage.getItem("onekijs.idp");
}

function removeItem(storage, key) {
  const fullKey = `onekijs.${key}`;
  if (storage === null || storage === "localStorage") {
    localStorage.removeItem(fullKey);
  } 
  if (storage === null || storage === "sessionStorage") {
    sessionStorage.removeItem(fullKey);
  } 
  if (storage === null || storage === "cookie") {
    sessionStorage.removeItem(fullKey);
    removeCookie(key);
  }
}

const oauth2 = [
  "access_token",
  "id_token",
  "refresh_token",
  "expires_in",
  "expires_at",
  "token_type"
];

export const authService = {
  name: "auth",
  reducers: {
    setSecurityContext: function(state, securityContext) {
      set(state, "auth.securityContext", securityContext);
    },

    setToken: function(state, token, { settings }) {
      const idpName = getIdpName(state);
      console.log("idpName", idpName);
      const idp = getIdp(settings, idpName);
      const persist = get(idp, "persist", null);

      let toCookie = null;
      if (persist === "cookie") {
        for (let type of ["refresh_token", "access_token", "token"]) {
          if (token && token[type]) {
            toCookie = type;
            break;
          }
        }
      }
      const storage = k => {
        if (!token || persist === null) return persist;
        if (k === toCookie) return "cookie";
        
        return persist === "localStorage" ? "localStorage" : "sessionStorage";
      };

      if (isNull(token) || persist === null) {
        oauth2.forEach(k => {
          removeItem(storage(k), k);
        });
        removeItem(storage("token"), "token");
      } else if (typeof token === "string") {
        setItem(storage("token"), "token", token);
      } else {
        oauth2.forEach(k => {
          if (token[k]) {
            setItem(storage(k), k, `${token[k]}`);
          }
        });
        if (token.expires_in && !token.expires_at) {
          token.expires_at = Date.now() + parseInt(token.expires_in) * 1000;
          setItem(storage("expires_at"), "expires_at", `${token.expires_at}`);
        }
      }
      set(state, "auth.token", token);
    },

    setIdp: function(state, idp, { router, settings }) {
      const nextIdp = idp;
      if (isNull(idp)) {
        const idpName = getIdpName(state);
        if (isNull(idpName)) return;
        idp = getIdp(settings, idpName);
      }
      const persist = get(idp, "persist", null);
      const storage =
        persist === "sessionStorage" ? "sessionStorage" : "localStorage";

      if (isNull(nextIdp)) {
        set(state, "auth.idp", null);
        removeItem(storage, "idp");
      } else {
        set(state, "auth.idp", nextIdp.name);
        setItem(storage, "idp", nextIdp.name);
        if (storage === "localStorage") {
          onStorageChange("onekijs.idp", value => {
            if (value !== nextIdp.name) {
              router.push(get(settings, "routes.logout") || "/logout");
            }
          });
        }
      }
    }
  },
  sagas: {
    clear: latest(function*(payload) {
      try {
        yield call(this.setSecurityContext, null);
        yield call(this.setToken, null);
        yield call(this.setIdp, null);
      } catch (e) {
        if (payload && payload.onError) {
          yield call(payload.onError, e);
        } else {
          throw e;
        }
      }
    }),

    fetchSecurityContext: latest(function*(
      payload,
      { store, router, settings }
    ) {
      try {
        const idpName =getIdpName(store.getState());
        if (!idpName || idpName === "null") {
          throw new HTTPError(401);
        }
        const idp = getIdp(settings, idpName);
        if (!idp) {
          throw new HTTPError(401);
        }

        let userinfoEndpoint = idp.userinfoEndpoint;
        if (!userinfoEndpoint) {
          throw new HTTPError(500, `Could not find a valid userinfo endpoint for idp ${idpName}`);
        }

        let securityContext = null;
        if (typeof userinfoEndpoint === "function") {
          securityContext = yield call(userinfoEndpoint, idp, {
            store,
            router,
            settings
          });
        } else if (userinfoEndpoint.startsWith("token://")) {
          let token = get(store.getState(), "auth.token");
          if (!token) {
            // try to load it from the localStorage
            yield call(this.loadToken);
            token = get(store.getState(), "auth.token");
            if (!token) {
              return;
            }
          }
          const token_prop = userinfoEndpoint.split("/")[2];
          securityContext = token_prop
            ? parseJwt(token[token_prop])
            : parseJwt(token);
        } else {
          securityContext = yield call(
            asyncGet,
            absoluteUrl(userinfoEndpoint, get(settings, "server.baseUrl")), 
            {
              auth: get(store.getState(), "auth")
            }
          );
        }

        yield call(this.setSecurityContext, securityContext);

        if (payload.onSuccess) {
          yield call(payload.onSuccess, securityContext);
        }

        return securityContext;
        
      } catch (e) {
        if (payload && payload.onError) {
          yield call(payload.onError, e);
        } else {
          throw e;
        }
      }
    }),

    loadToken: latest(function*(payload, { store, settings }) {
      try {
        if (!get(store.getState(), "auth.token")) {
          const idpName = getIdpName(store.getState());
          if (!idpName || idpName === "null") {
            return;
          }
          const idp = getIdp(settings, idpName);
          const persist = get(idp, "persist");
          if (!persist) return;
          const storage =
            persist === "localStorage" ? "localStorage" : "sessionStorage";

          const expires_at = parseInt(
            yield call(getItem, storage, "expires_at")
          );
          const clockSkew = idp.clockSkew || 60;

          const access_token = yield call(getItem, persist, "access_token");
          const refresh_token = yield call(getItem, persist, "refresh_token");
          if (
            access_token &&
            expires_at >= Date.now() + parseInt(clockSkew) * 1000
          ) {
            const token = {
              access_token,
              refresh_token
            };
            for (let k of oauth2) {
              if (!token[k]) {
                token[k] = yield call(getItem, storage, k);
              }
            }

            return yield call(this.saveToken, {
              token,
              idp
            });
          }

          if (refresh_token) {
            return yield call(this.refreshToken, {
              token: {
                refresh_token
              },
              idp,
              force: true
            });
          }

          const token = yield call(getItem, persist, "token");
          if (token) {
            return yield call(this.saveToken, {
              token,
              idp
            });
          }
        }
      } catch (e) {
        if (payload && payload.onError) {
          yield call(payload.onError, e);
        } else {
          throw e;
        }
      }
    }),

    refreshToken: every(function*(payload, { store, router, settings }) {
      try {
        if (!payload.force && !payload.token.expires_at) return;

        // delay the refresh until the expiration of the token with a tolerance of idp.clockSkew
        if (!payload.force) {
          const clockSkew = payload.idp.clockSkew || 60;
          const expires_at = parseInt(payload.token.expires_at);
          const to_delay = expires_at - clockSkew * 1000 - Date.now();
          if (to_delay > 0) {
            yield delay(to_delay);
          }
          // check that the token has not been revoked or changed
          const actualToken = get(store.getState(), "auth.token");
          if (payload.token !== actualToken) return;
        }

        let token;
        if (typeof payload.idp.tokenEndpoint === "function") {
          token = yield call(
            payload.idp.tokenEndpoint,
            "refreshToken",
            payload.idp,
            { store, router, settings }
          );
        } else {
          const body = {
            grant_type: "refresh_token",
            client_id: payload.idp.clientId,
            refresh_token: payload.token.refresh_token
          };
          const headers = {
            "Content-Type": "application/x-www-form-urlencoded"
          };

          if (payload.idp.clientSecret) {
            if (payload.idp.clientAuth === "body") {
              body.client_secret = payload.idp.clientSecret;
            } else {
              headers.auth = {
                basic: {
                  user: payload.idp.clientId,
                  password: payload.idp.clientSecret
                }
              };
            }
          }
          token = yield call(asyncPost, payload.idp.tokenEndpoint, body, {
            headers
          });
        }
        token.refresh_token = payload.token.refresh_token;
        if (token.expires_in && !token.expires_at) {
          token.expires_at = Date.now() + parseInt(token.expires_in) * 1000;
        }
        return yield call(this.saveToken, { token, idp: payload.idp });
      } catch (e) {
        if (payload && payload.onError) {
          yield call(payload.onError, e);
        } else {
          throw e;
        }
      }
    }),

    saveToken: latest(function*(payload, context) {
      try {
        if (payload.idp.validate) {
          if (!payload.idp.jwksEndpoint) {
            throw Error("A jwksEndpoint is required to validate tokens");
          }
          if (payload.token.id_token) {
            const isValidIdToken = yield call(
              validateToken,
              payload.token.id_token,
              payload.idp.jwksEndpoint,
              payload.idp,
              context
            );
            if (!isValidIdToken) {
              throw Error("Invalid id token");
            }
          } else if (payload.token.access_token) {
            const isValidAccessToken = yield call(
              validateToken,
              payload.token.access_token,
              payload.idp.jwksEndpoint,
              payload.idp,
              context
            );
            if (!isValidAccessToken) {
              throw Error("Invalid access token");
            }
          }

        }

        yield call(this.setIdp, payload.idp);
        yield call(this.setToken, payload.token);

        if (payload.token.refresh_token) {
          yield spawn(this.refreshToken, payload);
        }
        return payload.token;
      } catch (e) {
        if (payload && payload.onError) {
          yield call(payload.onError, e);
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
  let key = 'auth.securityContext';
  if (selector) key += `.${selector}`;
  return useReduxSelector(key, defaultValue);
};

// export const useSecurityContext = (prop, defaultValue, options = {}) => {
//   const authService = useAuthService();
//   const securityContext = useReduxSelector("auth.securityContext");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const notificationService = useNotificationService();
//   const errorListener = options.onError || notificationService.error;
//   const router = useRouter();
//   const loginRoute = useSetting('routes.login', '/login');

//   let onError = useCallback(
//     e => {
//       setError(e);
//       setLoading(false);
//       if(e.statusCode >= 400 && e.statusCode < 500) {
//         router.push(loginRoute);
//       } else if (errorListener) {
//         errorListener(e);
//       }
//     },
//     [setLoading, setError, errorListener, loginRoute, router]
//   );

//   let result = null;
//   if (!loading && !error) {
//     if (!securityContext) {
//       setLoading(true);
//       authService
//         .fetchSecurityContext()
//         .then(() => setLoading(false))
//         .catch((e) => onError(e))
//     } else {
//       result = prop
//         ? get(securityContext, prop, defaultValue)
//         : securityContext;
//     }
//   }
//   const isLoading = loading || (!result && !error);
//   return [result, isLoading, error];
// };
