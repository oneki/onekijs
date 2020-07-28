import { FetchOptions } from './typings';
import usePostPutPatch from './usePostPutPatch';

const usePatch = <T = any>(
  url: string,
  options: FetchOptions<T> = {},
): [(body: T, extraOptions?: FetchOptions<T>) => void, boolean] => {
  return usePostPutPatch(url, 'PATCH', options);
};

export default usePatch;
