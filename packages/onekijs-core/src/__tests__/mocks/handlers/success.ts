import { MockedRequest, MockedResponse } from 'msw/lib/types';
import { ResponseComposition } from 'msw/lib/types/response';
import { successResponse } from '../responses';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const successHandler = (_req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  return res(ctx.json(successResponse));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const delaySuccessHandler = (req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  let delayInMs = 0;
  if (req.url.searchParams.get('delay')) {
    delayInMs = parseInt(req.url.searchParams.get('delay') as string);
  }
  return res(ctx.delay(delayInMs), ctx.json(successResponse));
};
