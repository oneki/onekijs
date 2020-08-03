import { useCallback } from 'react';
import useLazyRef from '../core/useLazyRef';
import useNotificationService from '../notification/useNotificationService';
import FetchService from './FetchService';
import { FetchOptions, FetchState } from './typings';
import useService from '../core/useService';

const usePostPutPatch = <T = any>(
  url: string,
  method: string,
  options: FetchOptions<T> = {},
): [(body: Partial<T>, extraOptions?: FetchOptions<T>) => void, boolean] => {
  const notificationService = useNotificationService();
  const optionsRef = useLazyRef<FetchOptions<T>>(() => {
    if (!options.onError) {
      options.onError = (e) => {
        notificationService.error(e);
      };
    }
    return options;
  });

  const [state, service] = useService(FetchService, {
    loading: false,
  } as FetchState);
  const executor = useCallback(
    (body: Partial<T>, extraOptions: FetchOptions<T> = {}) => {
      extraOptions = Object.assign({}, optionsRef.current, extraOptions);
      service.fetch(extraOptions.url || url, method, body, extraOptions);
    },
    [service, url, method, optionsRef],
  );

  return [executor, state.loading || false];
};

export default usePostPutPatch;
