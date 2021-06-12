import { AppFetchOptions, AppExtraFetchOptions } from './typings';
import useSecurePostPutPatch from './useSecurePostPutPatch';

const useSecurePut = <T = any>(
  url: string,
  options: AppFetchOptions<T> = {},
): [(body: T, extraOptions?: AppExtraFetchOptions<T>) => Promise<void>, boolean] => {
  return useSecurePostPutPatch(url, 'PUT', options);
};

export default useSecurePut;
