import useGlobalSelector from '../app/useGlobalSelector';
import { AppFetchOptions } from './typings';
import usePostPutPatch from './usePostPutPatch';

const useSecurePostPutPatch = <T = any>(
  url: string,
  method: string,
  options: AppFetchOptions<T> = {},
): [(body: T, extraOptions?: AppFetchOptions<T>) => void, boolean] => {
  const authKey = useGlobalSelector('settings.auth.key') || 'auth';
  const auth = useGlobalSelector(authKey);
  options.auth = auth;
  return usePostPutPatch(url, method, options);
};

export default useSecurePostPutPatch;
