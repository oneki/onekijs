import { AppFetchOptions } from './typings';
import usePostPutPatch from './usePostPutPatch';

const usePatch = <T = any>(
  url: string,
  options: AppFetchOptions<T> = {},
): [(body: T, extraOptions?: AppFetchOptions<T>) => void, boolean] => {
  return usePostPutPatch(url, 'PATCH', options);
};

export default usePatch;
