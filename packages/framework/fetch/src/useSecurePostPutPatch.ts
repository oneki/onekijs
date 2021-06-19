import { useGlobalProp } from '@oneki/app';
import { FetchMethod } from '@oneki/types';
import { AppExtraFetchOptions, AppFetchOptions } from './typings';
import usePostPutPatch from './usePostPutPatch';

const useSecurePostPutPatch = <T = any>(
  url: string,
  method: FetchMethod,
  options: AppFetchOptions<T> = {},
): [(body: T, extraOptions?: AppExtraFetchOptions<T>) => Promise<void>, boolean] => {
  const authKey = useGlobalProp('settings.auth.key') || 'auth';
  const auth = useGlobalProp(authKey);
  options.auth = auth;
  return usePostPutPatch(url, method, options);
};

export default useSecurePostPutPatch;
