import { MockedRequest, rest } from 'msw';
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
  rest.get('/echo', (req, res, ctx) => {
    //${location.protocol}://${location.host}
    let url = `${req.url.protocol}//${req.url.host}${req.url.pathname}`;
    const params: string[] = [];
    req.url.searchParams.forEach((v, k) => {
      params.push(`${k}=${v}`);
    });
    if (params.length > 0) {
      url = `${url}?${params.join('&')}`;
    }
    return res(ctx.json({ result: url }));
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
];
