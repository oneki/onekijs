import { MockedRequest } from 'msw';
import { ResponseComposition, MockedResponse } from 'msw/lib/types/response';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const echoHandler = (req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  return res(ctx.json({ result: req.url.href }));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mutationEchoHandler = (req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  const body = (req.body as Record<string, any>) || {};
  return res(ctx.json(body));
};
