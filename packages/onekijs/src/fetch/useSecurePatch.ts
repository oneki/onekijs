import { FetchOptions } from './typings';
import useSecurePostPutPatch from './useSecurePostPutPatch';

const useSecurePatch = <T = any>(
  url: string,
  options: FetchOptions<T> = {},
): [(body: T, extraOptions?: FetchOptions<T>) => void, boolean] => {
  return useSecurePostPutPatch(url, 'PATCH', options);
};

export default useSecurePatch;
