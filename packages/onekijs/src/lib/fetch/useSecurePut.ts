import { FetchOptions } from './typings';
import useSecurePostPutPatch from './useSecurePostPutPatch';

const useSecurePut = <T = any>(
  url: string,
  options: FetchOptions<T> = {},
): [(body: T, extraOptions?: FetchOptions<T>) => void, boolean] => {
  return useSecurePostPutPatch(url, 'PUT', options);
};

export default useSecurePut;
