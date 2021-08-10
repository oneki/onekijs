import { defaultIdpSettings } from '../app/settings';
import DefaultBasicError from '../core/BasicError';
import { asyncGet } from '../core/xhr';
import { AppContext, AppSettings } from '../types/app';
import { AnonymousObject } from '../types/object';
import { AnyState } from '../types/state';
import { sha256, verify } from '../utils/crypt';
import { get } from '../utils/object';
import { generateRandomString, hex2b64 } from '../utils/string';
import { Idp, IdpSettings, IdpType } from './typings';

export const oauth2Keys = ['access_token', 'id_token', 'refresh_token', 'expires_in', 'expires_at', 'token_type'];

export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  return hex2b64(await sha256(codeVerifier))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export function generateCodeVerifier(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
  return generateRandomString(length, characters);
}

export function generateNonce(): string {
  const length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
  return generateRandomString(length);
}

export function generateState(): string {
  const length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
  return generateRandomString(length);
}

export function getIdp(settings: AppSettings, name?: string): Idp {
  const idps = settings.idp;
  name = name || 'default';
  const idp = idps[name];
  if (!idp) {
    throw new DefaultBasicError(`Cannot find a valid IDP named ${name}`);
  }
  return Object.assign({ name }, defaultIdpSettings[idp.type], idp);
}

export function idpForm(idpConfig: IdpSettings): Idp {
  return Object.assign({ type: IdpType.Form }, defaultIdpSettings.form, idpConfig);
}

export function external(idpConfig: IdpSettings): Idp {
  return Object.assign({ type: IdpType.External }, defaultIdpSettings.external, idpConfig);
}

export function oidcServer(idpConfig: IdpSettings): Idp {
  return Object.assign({ type: IdpType.OidcServer }, defaultIdpSettings.oidc_server, idpConfig);
}

export function oidcBrowser(idpConfig: IdpSettings): Idp {
  return Object.assign({ type: IdpType.OidcBrowser }, defaultIdpSettings.oidc_browser, idpConfig);
}

export function getIdpName(state: AnyState): string | undefined {
  return (
    get(state, 'auth.idpName') ||
    sessionStorage.getItem('onekijs.idpName') ||
    localStorage.getItem('onekijs.idpName') ||
    undefined
  );
}

export function parseJwt(token: string, section = 'payload'): any {
  const index = section === 'header' ? 0 : 1;

  const base64Url = token.split('.')[index];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

export async function validateToken(
  token: string,
  jwksEndpoint: string | ((token: string, idp: Idp, context: AppContext) => string),
  idp: Idp,
  context: AppContext,
): Promise<boolean> {
  let pubKey = null;
  const header = parseJwt(token, 'header');
  if (typeof jwksEndpoint === 'function') {
    pubKey = await jwksEndpoint(token, idp, context);
  } else {
    const jwks = await asyncGet(jwksEndpoint);
    pubKey = jwks.keys.find((key: { kid: string }) => key.kid === header.kid);
  }
  if (!pubKey) {
    throw Error('Could not find a valid public key for token validation');
  }
  const result = await verify(token, pubKey, header.alg || idp.pubKeyAlgorithm);
  return result;
}

export const isOauth = (idp: Idp): boolean => idp.oauth2 === true || idp.oidc === true;
export const isExternal = (idp: Idp): boolean => idp.external === true;

/**
 * Parse the token from the location hash
 *
 * @param {object} hash : the location hash (anything after the # in the URL)
 */
export const parseHashToken = (hash: AnonymousObject): AnonymousObject => {
  const token: AnonymousObject = {};
  ['access_token', 'id_token', 'refresh_token', 'expires_in', 'expires_at', 'token_type'].forEach((k) => {
    if (hash[k]) {
      token[k] = hash[k];
    }
  });
  return token;
};

export const getIdpStorage = (idp: Idp): Storage => {
  if (idp.persist && idp.persist === 'sessionStorage') {
    return sessionStorage;
  }
  return localStorage;
};
