import { AppFetchOptions, AppExtraFetchOptions } from './typings';
import usePostPutPatch from './usePostPutPatch';

const usePatch = <T = any>(
  url: string,
  options: AppFetchOptions<T> = {},
): [(body: T, extraOptions?: AppExtraFetchOptions<T>) => Promise<void>, boolean] => {
  return usePostPutPatch(url, 'PATCH', options);
};

export default usePatch;
