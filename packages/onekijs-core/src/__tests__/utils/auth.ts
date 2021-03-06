import { JWK, JWKS, JWT } from 'jose';
import { AnonymousObject } from '../../core/typings';

export const key = JWK.generateSync('RSA', 2048, { use: 'sig' });
export const jkws = new JWKS.KeyStore([key]).toJWKS();
export const token = (payload: AnonymousObject): string => {
  return JWT.sign(payload, key, {
    audience: ['urn:test'],
    issuer: 'https://mockissuer.com',
    expiresIn: '2 hours',
    header: {
      typ: 'JWT',
    },
    kid: true,
    subject: 'john.doe',
    jti: '12345',
    algorithm: 'RS256',
  });
};
export const verifyToken = (token: string): AnonymousObject => {
  return JWT.verify(token, key);
};
export const authorizationCode = 'mockcode';
export const verifier =
  'v84WMRlVj2GrIL-hXWhQ7ex5qbD3tay~~aKwW8pIf967rseOAvxkmo~iqdrNOLe8TDwuxyhAvUz0qo8Tytb2y_3aL4NojS8_ItfnhmHl1IQlI5AF-d';
export const codeChallenge = '7wPlckuvoJlcHXJQ1hxUEV1V4avvPX5dFiKdV1Ul9D8';
export const nonce = 'mock_nonce';
export const nonceSha = '040cf074626aae20f354e328977ad24ff74aad09715d99804aaf34bb8cb48b16';
export const state = 'mock_state';
export const stateSha = '20a34d84fd572a5f2b6d4c51c9e79209aed9f265d0e142ec6c72ffa85074c296';
export const clientId = 'mock_client_id';
export const redirectUri = 'http://localhost/login/callback';
export const authorizeEndpoint = 'https://mockidp.com/oauth2/auth';
export const tokenEndpoint = 'http://localhost/oauth2/token';
export const tokenWithPkceEndpoint = 'http://localhost/oauth2/token-with-pkce';
export const userinfoEndpoint = 'http://localhost/oauth/userinfo';
export const loginEndpoint = 'http://localhost/auth/login';
export const loginTokenEndpoint = 'http://localhost/auth/login-token';
export const loginCustomKeyEndpoint = 'http://localhost/auth/login-custom-key';
export const externalLoginEndpoint = 'http://localhost/external/login';
export const logoutEndpoint = 'http://localhost/auth/logout';
export const logoutTokenEndpoint = 'http://localhost/auth/logout-token';
export const oauthLogoutEndpoint = 'http://localhost/oauth/logout';
export const jwksEndpoint = 'http://localhost/.well-known/jwks.json';
export const idTokenClaims = {
  mock_token_type: 'id',
  name: 'Doe',
  firstname: 'John',
  email: 'john.doe@mock.com',
  nonce: nonceSha,
};
