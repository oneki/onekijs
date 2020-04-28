import { asyncGet } from "../xhr";
import { sha256, verify } from "./crypt";
import { generateRandomString, hex2b64 } from "./string";


export async function generateCodeChallenge(codeVerifier) {
  return hex2b64(await sha256(codeVerifier))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function generateCodeVerifier() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
  return generateRandomString(length, characters);
}

export function generateNonce() {
  const length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
  return generateRandomString(length);
}

export function generateState() {
  const length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
  return generateRandomString(length);
}

export function getIdp(settings, name) {
  const defaultSettings = {
    oidc_server: {
      oidc: true,
      oauth2: true,
      external: true,
      postLoginRedirectKey: 'redirect_uri',
      postLogoutRedirectKey: 'post_logout_redirect_uri',
      scope: 'openid',
      pkce: true,
      nonce: true,
      state: true,
      responseType: 'code',
      codeChallengeMethod: 'S256'
    }
  };


  const idp = settings.idp;
  name = name || "default";
  return Object.assign({ name }, defaultSettings[idp[name].type], idp[name]);
}

export function parseJwt(token, section = "payload") {
  const index = section === "header" ? 0 : 1;

  const base64Url = token.split(".")[index];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export async function validateToken(token, jwksEndpoint, idp, context) {
  let pubKey = null;
  const header = parseJwt(token, "header");
  if (typeof jwksEndpoint === "function") {
    pubKey = await jwksEndpoint(token, idp, context);
  } else {
    const jwks = await asyncGet(jwksEndpoint);
    pubKey = jwks.keys.find(key => key.kid === header.kid);
  }
  if (!pubKey) {
    throw Error("Could not find a valid public key for token validation");
  }
  const result = await verify(token, pubKey, header.alg || idp.jwksAlgorithm);
  return result;
}


