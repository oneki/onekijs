import { FetchOptions } from './typings';
import usePostPutPatch from './usePostPutPatch';

const usePut = <T = any>(
  url: string,
  options: FetchOptions<T> = {},
): [(body: T, extraOptions?: FetchOptions<T>) => void, boolean] => {
  return usePostPutPatch(url, 'PUT', options);
};

export default usePut;
