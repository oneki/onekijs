import { MockedRequest, MockedResponse } from 'msw/lib/types';
import { ResponseComposition } from 'msw/lib/types/response';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const errorHandler = (_req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  return res(
    ctx.status(500),
    ctx.json({
      message: 'this is the error message',
    }),
  );
};
