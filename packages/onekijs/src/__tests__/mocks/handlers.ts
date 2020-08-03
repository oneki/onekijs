import { MockedRequest, rest } from 'msw';
import { ResponseComposition } from 'msw/lib/types/response';
import qs from 'query-string';
import { AnonymousObject } from '../../core/typings';
import {
  authorizationCode,
  clientId,
  idTokenClaims,
  jkws,
  redirectUri,
  token,
  verifier,
  verifyToken,
} from '../utils/auth';
import { i18nEn, i18nFr } from '../utils/i18n';

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

  // I18N
  rest.get('/locales/en/common.json', (_req, res, ctx) => {
    return res(ctx.json(i18nEn.common));
  }),
  rest.get('/locales/en/users.json', (_req, res, ctx) => {
    return res(ctx.json(i18nEn.users));
  }),
  rest.get('/locales/fr/common.json', (_req, res, ctx) => {
    return res(ctx.json(i18nFr.common));
  }),
  rest.get('/locales/fr/users.json', (_req, res, ctx) => {
    return res(ctx.json(i18nFr.users));
  }),

  // FORM BASED AUTH
  rest.post('/auth/login-token', (req, res, ctx) => {
    const body = (req.body as Record<string, any>) || {};
    expect(body.username).toBe('john.doe');
    expect(body.password).toBe('secret');
    return generateAndReturnTokens(res, ctx);
  }),
  rest.post('/auth/login', (req, res, ctx) => {
    const body = (req.body as Record<string, any>) || {};
    expect(body.username).toBe('john.doe');
    expect(body.password).toBe('secret');
    return res(ctx.delay(1), ctx.json(idTokenClaims));
  }),
  rest.post('/auth/login-custom-key', (req, res, ctx) => {
    const body = (req.body as Record<string, any>) || {};
    expect(body.surname).toBe('john.doe');
    expect(body.pwd).toBe('secret');
    return res(ctx.delay(1), ctx.json(idTokenClaims));
  }),
  rest.get('/auth/logout-token', (req, res, ctx) => {
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
  }),

  // OIDC AUTH
  rest.post('/oauth2/token', (req, res, ctx) => {
    //`access_token=${response.data.access_token}; path=/; HttpOnly; SameSite=Stric; Secure`
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
];

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
