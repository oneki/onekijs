import useAppContext from '../app/useAppContext';
import useRouter from '../app/useRouter';
import { asResultCallback } from '../app/utils';
import useLazyRef from '../core/useLazyRef';
import { FetchOptions } from '../types/fetch';
import { clone } from '../utils/object';
import { AppFetchOptions } from './typings';

export function useFetchOptions<T = any>(options: AppFetchOptions<T>): FetchOptions<T> {
  const appContext = useAppContext();
  const router = useRouter();

  const fetchOptionsRef = useLazyRef<FetchOptions<T>>(() => {
    const fetchOptions: FetchOptions<T> = clone(options);
    if (options.onError) {
      fetchOptions.onFetchError = (e) => {
        const callbackError = asResultCallback(options.onError, router, appContext);
        if (callbackError) {
          callbackError(e);
        }
      };
    }

    if (options.onSuccess) {
      fetchOptions.onFetchSuccess = (result: T) => {
        const callbackSuccess = asResultCallback(options.onSuccess, router, appContext);
        if (callbackSuccess) {
          callbackSuccess(result);
        }
      };
    }
    return fetchOptions;
  });

  return fetchOptionsRef.current;
}
