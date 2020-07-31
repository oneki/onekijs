import { rest, MockedRequest } from 'msw';
import { ResponseComposition } from 'msw/lib/types/response';

const successResponse = {
  result: 'success',
};

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

  // OIDC
  rest.post('/oauth2/token', (_req, res, ctx) => {
    return res(
      ctx.delay(1),
      ctx.json({
        access_token: 'mock_token',
        refresh_token: 'mock_refresh_token',
        id_token: 'mock_id_token',
      }),
    );
  }),
  rest.get('/oauth/userinfo', (_req, res, ctx) => {
    return res(
      ctx.delay(1),
      ctx.json({
        access_token: 'mock_token',
        refresh_token: 'mock_refresh_token',
        id_token: 'mock_id_token',
      }),
    );
  }),

  /*            tokenEndpoint: 'http://localhost/oauth2/token',
            userinfoEndpoint: 'http://localhost/oauth/userinfo',
            logoutEndpoint: 'http://localhost/oauth/logout',*/
];
