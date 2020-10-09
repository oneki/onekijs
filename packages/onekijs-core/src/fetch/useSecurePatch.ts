import { AppFetchOptions, AppExtraFetchOptions } from './typings';
import useSecurePostPutPatch from './useSecurePostPutPatch';

const useSecurePatch = <T = any>(
  url: string,
  options: AppFetchOptions<T> = {},
): [(body: T, extraOptions?: AppExtraFetchOptions<T>) => Promise<void>, boolean] => {
  return useSecurePostPutPatch(url, 'PATCH', options);
};

export default useSecurePatch;
