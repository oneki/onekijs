import { useCallback } from 'react';
import FetchService from '../core/FetchService';
import useService from '../core/useService';
import { FetchMethod, FetchState } from '../types/fetch';
import { AppExtraFetchOptions, AppFetchOptions } from './typings';
import { useFetchOptions } from './useFetchOptions';

const usePostPutPatch = <T = any>(
  url: string,
  method: FetchMethod,
  options: AppFetchOptions<T> = {},
): [(body: Partial<T>, extraOptions?: AppExtraFetchOptions<T>) => Promise<void>, boolean] => {
  const fetchOptions = useFetchOptions(options);

  const [state, service] = useService(FetchService, {
    loading: false,
  } as FetchState);
  const executor = useCallback(
    async (body: Partial<T>, extraOptions: AppExtraFetchOptions<T> = {}) => {
      extraOptions = Object.assign({}, fetchOptions, extraOptions);
      await service.fetch(extraOptions.url || url, method, body, extraOptions);
    },
    [service, url, method, fetchOptions],
  );

  return [executor, state.loading || false];
};

export default usePostPutPatch;
