import { AppFetchOptions } from './typings';
import usePostPutPatch from './usePostPutPatch';

const usePut = <T = any>(
  url: string,
  options: AppFetchOptions<T> = {},
): [(body: T, extraOptions?: AppFetchOptions<T>) => void, boolean] => {
  return usePostPutPatch(url, 'PUT', options);
};

export default usePut;
