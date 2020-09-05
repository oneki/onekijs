import { MockedRequest, MockedResponse } from 'msw/lib/types';
import { ResponseComposition } from 'msw/lib/types/response';
import { i18nEn, i18nFr } from '../../utils/i18n';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const i18nCommonEnHandler = (_req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  return res(ctx.json(i18nEn.common));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const i18nUsersEnHandler = (_req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  return res(ctx.json(i18nEn.users));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const i18nCommonFrHandler = (_req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  return res(ctx.json(i18nFr.common));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const i18nUsersFrHandler = (_req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  return res(ctx.json(i18nFr.users));
};
