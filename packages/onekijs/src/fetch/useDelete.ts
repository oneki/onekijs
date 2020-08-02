import { useCallback } from 'react';
import useLazyRef from '../core/useLazyRef';
import useNotificationService from '../notification/useNotificationService';
import FetchService from './FetchService';
import { FetchOptions, FetchState } from './typings';
import useService from '../core/useService';

const useDelete = (url: string, options: FetchOptions = {}): [(extraOptions?: FetchOptions) => void, boolean] => {
  const notificationService = useNotificationService();
  const optionsRef = useLazyRef<FetchOptions>(() => {
    if (!options.onError) {
      options.onError = (e => {
        notificationService.error(e);
      })
    }
    return options;
  });

  const [state, service] = useService(FetchService, {
    loading: false,
  } as FetchState);

  const executor = useCallback(
    (extraOptions = {}) => {
      extraOptions = Object.assign({}, optionsRef.current, extraOptions);
      service.delete(extraOptions.url || url, extraOptions);
    },
    [service, url],
  );

  return [executor, state.loading || false];
};

export default useDelete;
