import { MockedRequest } from 'msw/lib/types';

export function extractToken(req: MockedRequest): string | null {
  if (req.headers.has('authorization') && req.headers.get('authorization')?.split(' ')[0] === 'Bearer') {
    return req.headers.get('authorization')?.split(' ')[1] as string;
  }
  return null;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const anyMethod = (rest: any, path: string, handler: any) => {
  return ['get', 'post', 'put', 'patch'].map((method) => {
    return rest[method](path, handler);
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mutationMethod = (rest: any, path: string, handler: any) => {
  return ['post', 'put', 'patch'].map((method) => {
    return rest[method](path, handler);
  });
};
