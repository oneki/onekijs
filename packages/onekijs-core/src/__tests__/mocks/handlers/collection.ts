import { MockedRequest, MockedResponse } from 'msw/lib/types';
import { ResponseComposition } from 'msw/lib/types/response';
import { Query } from '../../../collection/typings';
import { parseQuery } from '../../../collection/utils';
import { LocalCollectionService } from '../../..';
import { basicUsers } from '../../../collection/__tests__/data/userList';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const collectionUrlHandler = (req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  //${location.protocol}://${location.host}
  let url = `${req.url.protocol}//${req.url.host}${req.url.pathname}`;
  const params: string[] = [];
  req.url.searchParams.forEach((v, k) => {
    params.push(`${k}=${v}`);
  });
  if (params.length > 0) {
    url = `${url}?${params.join('&')}`;
  }
  return res(ctx.json({ result: [url] }));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const collectionQueryHandler = (req: MockedRequest, res: ResponseComposition, ctx: any): MockedResponse => {
  const query: Query = parseQuery(req.url.searchParams);
  const service = new LocalCollectionService();
  service.state = query;
  service.setData(basicUsers);
  return res(ctx.json({ result: service.data }));
};
