import { decrypt, encrypt } from './crypt';
import { isNull } from './object';

/**
 * Add a browser cookie (created on the browser side)
 *
 * @param {string} name : name of the cookie
 * @param {string} value : value of the cookie
 * @param {boolean} crypt : encrypt the cookie (not usable by the server)
 * @param {integer} ttl : time to live of the cookie (in seconds)
 * @param {string} path : scope of the cookie
 */
export async function addCookie(name: string, value?: string, crypt = true, ttl?: number, path = '/'): Promise<void> {
  if (crypt) {
    value = await encrypt(value);
  }
  let cookie = `${name}=${value};path=${path};SameSite=Strict;Secure`;
  if (ttl) {
    cookie += `expires=${getCookieExpireTime(ttl)};`;
  }
  document.cookie = cookie;
}

/**
 * Get a cookie by name. Decrypt it if necessary
 * check https://stackoverflow.com/questions/10730362/get-cookie-by-name
 *
 * @param {string} name : name of the cookie
 * @param {boolean} secure : decrypt the cookie
 */
export async function getCookie(name: string, secure = true): Promise<any> {
  function escape(s: string) {
    // eslint-disable-next-line
    return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1');
  }
  const match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  const result = match ? match[1] : null;
  return secure ? await decrypt(result) : result;
}

/**
 * convert a TTL (time to live) to an expire date
 *
 * @param {int} ttl : time to live in seconds
 */
export const getCookieExpireTime = (ttl: number): string => {
  const date = new Date();
  const time = date.getTime();
  const expireTime = time + 1000 * ttl;
  date.setTime(expireTime);
  return date.toUTCString();
};

/**
 * get a value of a key from the specified storage
 * if the storage is set to any, try all storage
 *
 * @param {string} key : name of the key to get the value from
 * @param {string} storage : localStorage, sessionStorage, cookie, any (defaults to any)
 * @param {boolean} secure : decrypt the cookie (defaults to true)
 */
export async function getItem(key: string, storage = 'any', secure = true): Promise<unknown> {
  if (!storage) storage = 'any';

  if (['localStorage', 'any'].includes(storage)) {
    return localStorage.getItem(key);
  }

  if (['sessionStorage', 'any'].includes(storage)) {
    return sessionStorage.getItem(key);
  }

  if (['cookie', 'any'].includes(storage)) {
    if (!isNull(sessionStorage.getItem(key))) {
      return sessionStorage.getItem(key);
    } else {
      return await getCookie(key, secure);
    }
  }
  return;
}

/**
 * Listen to a change in the localstorage
 *
 * @param {string} key : key of the local storage entry
 * @param {function} listener : a function receiving the old value an the new value
 */
export function onStorageChange(key: string, listener: (newValue: any, oldValue: any) => void): void {
  const wrapper = (event: any) => {
    if (!event) {
      event = window.event;
    } // ie
    if (event.key === key) {
      listener(event.newValue, event.oldValue);
    }
  };
  if (window.addEventListener) {
    window.addEventListener('storage', wrapper, false);
  } else {
    (window as any).attachEvent('onstorage', wrapper);
  }
}

/**
 * Remove a browser cookie (created on the browser side)
 *
 * @param {string} name : name of the cookie
 * @param {string} path : scope of the cookie
 */
export const removeCookie = (name: string, path = '/'): void => {
  document.cookie = `onekijs.${name}= ;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};`;
};

/**
 * remove a key from the specified storage
 * if the storage is set to 'any', try all storage
 *
 * @param {string} key : name of the key to get the value from
 * @param {string} storage : localStorage, sessionStorage, cookie, any (defaults to any)
 */
export function removeItem(key: string, storage?: string | null): void {
  if (!storage) storage = 'any';

  if (['localStorage', 'any'].includes(storage)) {
    localStorage.removeItem(key);
  }
  if (['sessionStorage', 'any'].includes(storage)) {
    sessionStorage.removeItem(key);
  }
  if (['cookie', 'any'].includes(storage)) {
    sessionStorage.removeItem(key);
    removeCookie(key);
  }
}

/**
 * Add a key/value in the specified storage
 *
 * @param {*} key : key of the item
 * @param {*} value : value of the item
 * @param {*} storage : localStorage, sessionStorage or cookie
 * @param {*} crypt : encrypt the value (only if cookie). Defaults to true
 * @param {*} ttl : time to live of the cookie (in seconds). If null, the cookie is removed when the browser is closed
 * @param {*} path : scope of the cookie. Defaults to /
 */
export async function setItem(
  key: string,
  value: string,
  storage: string | null | undefined,
  crypt = true,
  ttl?: number,
  path = '/',
): Promise<void> {
  if (storage === 'localStorage') {
    localStorage.setItem(key, value);
  } else if (storage === 'sessionStorage') {
    sessionStorage.setItem(key, value);
  } else if (storage === 'cookie') {
    await addCookie(key, value, crypt, ttl, path);
  }
}
