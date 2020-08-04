import { AppFetchOptions } from './typings';
import usePostPutPatch from './usePostPutPatch';

export const usePost = <T = any>(
  url: string,
  options: AppFetchOptions<T> = {},
): [(body: T, extraOptions?: AppFetchOptions<T>) => void, boolean] => {
  return usePostPutPatch(url, 'POST', options);
};
