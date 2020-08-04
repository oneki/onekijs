import { AppFetchOptions } from './typings';
import useSecurePostPutPatch from './useSecurePostPutPatch';

const useSecurePost = <T = any>(
  url: string,
  options: AppFetchOptions<T> = {},
): [(body: T, extraOptions?: AppFetchOptions<T>) => void, boolean] => {
  return useSecurePostPutPatch(url, 'POST', options);
};

export default useSecurePost;
