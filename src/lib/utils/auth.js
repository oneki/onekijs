import { hextob64, KEYUTIL, jws, crypto } from 'jsrsasign'
import { asyncGet } from '../xhr';
import { isNull } from './object';


export function generateRandomString(length, characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_') {
  const result = [];
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('');
}

export function generateNonce() {
  const length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
  return generateRandomString(length);
}

export function generateState() {
  const length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
  return generateRandomString(length);
}

export function generateCodeVerifier() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
  return generateRandomString(length, characters);
}


export function generateCodeChallenge(codeVerifier) {
  return hextob64(sha256(codeVerifier)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export function getIdp(settings, name) {
  const idp = settings.idp;
  name = name || 'default';
  return Object.assign({name}, idp[name]);
}

export function parseJwt (token, section='payload') {
  const index = (section === 'header') ? 0 : 1;

  const base64Url = token.split('.')[index];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export function sha256(str) {
  if (isNull(str)) return null;
  return crypto.Util.sha256(str);
}

export async function validateToken(token, pubKeyFetch, idp, context) {
  let pubKey = null;
  const header = parseJwt(token, 'header');
  if (typeof pubKeyFetch === 'function') {
    pubKey = await pubKeyFetch(token, idp, context);
  } else {
    const jwks = await asyncGet(pubKeyFetch);
    pubKey = jwks.keys.find(key => key.kid === header.kid);
  }
  if (!pubKey) {
    throw Error("Could not find a valid public key for token validation");
  }
  return jws.JWS.verify(token, KEYUTIL.getKey(pubKey), [header.alg]);
}



