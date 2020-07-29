import { useCallback, useRef } from 'react';
import useLocalService from '../core/useLocalService';
import CrudService from './CrudService';
import { FetchOptions, CrudState } from './typings';

const useDelete = (url: string, options: FetchOptions = {}): [(extraOptions?: FetchOptions) => void, boolean] => {
  const optionsRef = useRef<FetchOptions>();
  optionsRef.current = options;

  const [state, service] = useLocalService(CrudService, {
    loading: false,
  } as CrudState);

  const executor = useCallback(
    (extraOptions = {}) => {
      extraOptions = Object.assign({}, optionsRef.current, extraOptions);
      service.fetch(extraOptions.url || url, 'DELETE', null, extraOptions);
    },
    [service, url],
  );

  return [executor, state.loading || false];
};

export default useDelete;
