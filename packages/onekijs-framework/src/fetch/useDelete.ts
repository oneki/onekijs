import { useCallback } from 'react';
import FetchService from '../core/FetchService';
import useService from '../core/useService';
import { FetchState } from '../types/fetch';
import { AppExtraFetchOptions, AppFetchOptions } from './typings';
import { useFetchOptions } from './useFetchOptions';

const useDelete = (
  url: string,
  options: AppFetchOptions = {},
): [(extraOptions?: AppExtraFetchOptions) => void, boolean] => {
  const fetchOptions = useFetchOptions(options);

  const [state, service] = useService(FetchService, {
    loading: false,
  } as FetchState);

  const executor = useCallback(
    (extraOptions: AppExtraFetchOptions = {}) => {
      extraOptions = Object.assign({}, fetchOptions, extraOptions);
      service.delete(extraOptions.url || url, extraOptions);
    },
    [service, url, fetchOptions],
  );

  return [executor, state.loading || false];
};

export default useDelete;
