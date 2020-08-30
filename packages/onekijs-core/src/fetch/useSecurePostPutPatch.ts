import useGlobalSelector from '../app/useGlobalSelector';
import { AppFetchOptions, AppExtraFetchOptions, FetchMethod } from './typings';
import usePostPutPatch from './usePostPutPatch';

const useSecurePostPutPatch = <T = any>(
  url: string,
  method: FetchMethod,
  options: AppFetchOptions<T> = {},
): [(body: T, extraOptions?: AppExtraFetchOptions<T>) => void, boolean] => {
  const authKey = useGlobalSelector('settings.auth.key') || 'auth';
  const auth = useGlobalSelector(authKey);
  options.auth = auth;
  return usePostPutPatch(url, method, options);
};

export default useSecurePostPutPatch;
