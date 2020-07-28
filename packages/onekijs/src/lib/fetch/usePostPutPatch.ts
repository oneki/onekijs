import { useCallback, useRef } from 'react';
import useLocalService from '../core/useLocalService';
import CrudService from './CrudService';
import { CrudState, FetchOptions } from './typings';

const usePostPutPatch = <T = any>(
  url: string,
  method: string,
  options: FetchOptions<T> = {},
): [(body: T, extraOptions?: FetchOptions<T>) => void, boolean] => {
  const optionsRef = useRef<FetchOptions<T>>();
  optionsRef.current = options;

  const [state, service] = useLocalService(CrudService, {
    loading: false,
  } as CrudState);
  const executor = useCallback(
    (body: T, extraOptions: FetchOptions<T> = {}) => {
      extraOptions = Object.assign({}, optionsRef.current, extraOptions);
      service.fetch(extraOptions.url || url, method, body, extraOptions);
    },
    [service, url, method],
  );

  return [executor, state.loading || false];
};

export default usePostPutPatch;
