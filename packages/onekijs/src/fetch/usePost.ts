import usePostPutPatch from './usePostPutPatch';
import { FetchOptions } from './typings';

export const usePost = <T = any>(
  url: string,
  options: FetchOptions<T> = {},
): [(body: T, extraOptions?: FetchOptions<T>) => void, boolean] => {
  return usePostPutPatch(url, 'POST', options);
};
