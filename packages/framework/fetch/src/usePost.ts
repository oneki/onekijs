import { AppFetchOptions, AppExtraFetchOptions } from './typings';
import usePostPutPatch from './usePostPutPatch';

export const usePost = <T = any>(
  url: string,
  options: AppFetchOptions<T> = {},
): [(body: T, extraOptions?: AppExtraFetchOptions<T>) => Promise<void>, boolean] => {
  return usePostPutPatch(url, 'POST', options);
};
