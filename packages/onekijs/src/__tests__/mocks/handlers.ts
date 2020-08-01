import { MockedRequest, rest } from 'msw';
import { ResponseComposition } from 'msw/lib/types/response';
import qs from 'query-string';
import { AnonymousObject } from '../../core/typings';
import { authorizationCode, clientId, redirectUri, token, verifier, verifyToken, nonceSha, jkws } from '../utils/auth';

const successResponse = {
  result: 'success',
};

function extractToken(req: MockedRequest) {
  if (req.headers.has('authorization') && req.headers.get('authorization')?.split(' ')[0] === 'Bearer') {
    return req.headers.get('authorization')?.split(' ')[1];
  }
  return null;
}

const anyMethod = (rest: any, path: string, handler: any) => {
  return ['get', 'post', 'put', 'patch'].map((method) => {
    return rest[method](path, handler);
  });
};

const mutationMethod = (rest: any, path: string, handler: any) => {
  return ['post', 'put', 'patch'].map((method) => {
    return rest[method](path, handler);
  });
};

export const handlers = [
  // ECHO
  rest.get('/echo**', (req, res, ctx) => {
    return res(ctx.json({ result: req.url.href }));
  }),
  ...mutationMethod(rest, '/echo', (req: MockedRequest, res: ResponseComposition, ctx: any) => {
    const body = (req.body as Record<string, any>) || {};
    return res(ctx.json(body));
  }),

  // SUCCESS
  ...anyMethod(rest, '/success', (_req: MockedRequest, res: ResponseComposition, ctx: any) => {
    return res(ctx.json(successResponse));
  }),
  ...anyMethod(rest, '/success-with-delay', (req: MockedRequest, res: ResponseComposition, ctx: any) => {
    let delayInMs = 0;
    if (req.url.searchParams.get('delay')) {
      delayInMs = parseInt(req.url.searchParams.get('delay') as string);
    }
    return res(ctx.delay(delayInMs), ctx.json(successResponse));
  }),

  // ERROR
  ...anyMethod(rest, '/error', (_req: MockedRequest, res: ResponseComposition, ctx: any) => {
    return res(
      ctx.status(500),
      ctx.json({
        message: 'this is the error message',
      }),
    );
  }),

  // FORM BASED AUTH
  rest.post('/auth/login', (req, res, ctx) => {
    const body = (req.body as Record<string, any>) || {};
    expect(body.username).toBe('john.doe');
    expect(body.password).toBe('secret');
    return generateAndReturnTokens(res, ctx);
  }),

  // OIDC
  rest.post('/oauth2/token', (req, res, ctx) => {
    return oidcTokenHandler(req, res, ctx, { pkce: false });
  }),
  rest.post('/oauth2/token-with-pkce', (req, res, ctx) => {
    return oidcTokenHandler(req, res, ctx, { pkce: true });
  }),

  rest.get('/oauth/userinfo', (req, res, ctx) => {
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
  }),
  rest.get('/.well-known/jwks.json', (_req, res, ctx) => {
    return res(ctx.json(jkws));
  }),

  /*            tokenEndpoint: 'http://localhost/oauth2/token',
            userinfoEndpoint: 'http://localhost/oauth/userinfo',
            logoutEndpoint: 'http://localhost/oauth/logout',*/
];

const oidcTokenHandler = (req: MockedRequest, res: ResponseComposition, ctx: any, options: AnonymousObject) => {
  let params = '';
  if (req.body && typeof req.body === 'string') {
    params = req.body;
  }
  const query = qs.parse(params);
  expect(query.client_id).toBe(clientId);
  expect(query.code).toBe(authorizationCode);
  expect(query.grant_type).toBe('authorization_code');
  expect(query.redirect_uri).toBe(redirectUri);
  if (options.pkce) {
    expect(query.code_verifier).toBe(verifier);
  }
  return generateAndReturnTokens(res, ctx);
};

const generateAndReturnTokens = (res: ResponseComposition, ctx: any) => {
  const access_token = token({ mock_token_type: 'access' });
  const refresh_token = token({ mock_token_type: 'refresh' });
  const id_token = token({
    mock_token_type: 'id',
    name: 'Doe',
    firstname: 'John',
    email: 'john.doe@mock.com',
    nonce: nonceSha,
  });
  return res(
    ctx.delay(1),
    ctx.json({
      access_token,
      refresh_token,
      id_token,
    }),
  );
};
