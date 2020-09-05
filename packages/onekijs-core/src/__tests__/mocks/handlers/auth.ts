import { MockedRequest, MockedResponse } from 'msw/lib/types';
import { ResponseComposition } from 'msw/lib/types/response';
import qs from 'query-string';
import { AnonymousObject } from '../../../core/typings';
import {
  authorizationCode,
  clientId,
  idTokenClaims,
  jkws,
  redirectUri,
  token,
  verifier,
  verifyToken,
} from '../../utils/auth';
import { extractToken } from '../../utils/handler';

const generateAndReturnTokens = (res: ResponseComposition, ctx: any) => {
  const access_token = token({ mock_token_type: 'access' });
  const refresh_token = token({ mock_token_type: 'refresh' });
  const id_token = token(idTokenClaims);
  return res(
    ctx.delay(1),
    ctx.cookie('access_token', access_token),
    ctx.json({
      access_token,
      refresh_token,
      id_token,
    }),
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const formAuthLoginTokenHandler = (req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  const body = (req.body as Record<string, any>) || {};
  expect(body.username).toBe('john.doe');
  expect(body.password).toBe('secret');
  return generateAndReturnTokens(res, ctx);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const formAuthLoginHandler = (req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  const body = (req.body as Record<string, any>) || {};
  expect(body.username).toBe('john.doe');
  expect(body.password).toBe('secret');
  return res(ctx.delay(1), ctx.json(idTokenClaims));
};

export const formAuthLoginCustomKeyHandler = (
  req: MockedRequest,
  res: ResponseComposition,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ctx: any,
): MockedResponse => {
  const body = (req.body as Record<string, any>) || {};
  expect(body.surname).toBe('john.doe');
  expect(body.pwd).toBe('secret');
  return res(ctx.delay(1), ctx.json(idTokenClaims));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const formAuthLogoutTokenHandler = (req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  const token = extractToken(req);
  if (token) {
    try {
      verifyToken(token);
      return res(ctx.delay(100), ctx.json({ message: 'success' })); // ctx.delay(100) is normal
    } catch (e) {
      return res(ctx.status(403), ctx.json({ message: 'userinfo: invalid access token' }));
    }
  } else {
    return res(ctx.status(401), ctx.json({ message: 'userinfo: missing access token' }));
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const oidcTokenHandler = (req: MockedRequest, res: ResponseComposition, ctx: any, options: AnonymousObject) => {
  let params = '';
  if (req.body && typeof req.body === 'string') {
    params = req.body;
  }
  const query = qs.parse(params);
  if (clientId !== query.client_id) {
    return res(ctx.status(400), ctx.json({ message: 'token: invalid client_id' }));
  }
  if (authorizationCode !== query.code) {
    return res(ctx.status(400), ctx.json({ message: 'token: invalid code' }));
  }
  if ('authorization_code' !== query.grant_type) {
    return res(ctx.status(400), ctx.json({ message: 'token: invalid grant type (must be authorization_code)' }));
  }
  if (redirectUri !== query.redirect_uri) {
    return res(ctx.status(400), ctx.json({ message: 'token: invalid redirect_uri' }));
  }
  if (options.pkce) {
    if (verifier !== query.code_verifier) {
      return res(ctx.status(400), ctx.json({ message: 'token: invalid code_verifier' }));
    }
  }
  return generateAndReturnTokens(res, ctx);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const oidcNonPkceTokenHandler = (req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  return oidcTokenHandler(req, res, ctx, { pkce: false });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const oidcPkceTokenHandler = (req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  return oidcTokenHandler(req, res, ctx, { pkce: true });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const oidcUserInfoHandler = (req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  const token = extractToken(req);
  if (token) {
    try {
      verifyToken(token);
      return res(ctx.delay(1), ctx.json({ name: 'Doe', firstname: 'John', email: 'john.doe@mock.com' }));
    } catch (e) {
      return res(ctx.status(403), ctx.json({ message: 'userinfo: invalid access token' }));
    }
  } else {
    return res(ctx.status(401), ctx.json({ message: 'userinfo: missing access token' }));
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const oidcJwksHandler = (_req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  return res(ctx.json(jkws));
};
