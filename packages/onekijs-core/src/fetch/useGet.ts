import { useCallback, useEffect } from 'react';
import useAppContext from '../app/useAppContext';
import useLazyRef from '../core/useLazyRef';
import useService from '../core/useService';
import useNotificationService from '../notification/useNotificationService';
import FetchService from './FetchService';
import { FetchOptions, FetchState, UseGetOptions } from './typings';
import useOnekiRouter from '../app/useOnekiRouter';
import { asResultCallback } from '../app/utils';

const useGet = <T = any>(url?: string | null, options: UseGetOptions<T> = {}): [T, boolean, () => void] => {
  const notificationService = useNotificationService();
  const appContext = useAppContext();
  const router = useOnekiRouter();
  const optionsRef = useLazyRef<UseGetOptions<T>>(() => {
    if (!options.onError) {
      options.onError = (e) => {
        notificationService.error(e);
      };
    } else {
      const originalCallback = options.onError;
      options.onError = asResultCallback(originalCallback, router, appContext);
    }
    return options;
  });

  const [state, service] = useService(FetchService, {
    loading: false,
    result: optionsRef.current.defaultValue,
  } as FetchState);

  const refresh = useCallback(() => {
    if (url) {
      service.get(url, optionsRef.current as FetchOptions);
    }
  }, [url, service, optionsRef]);

  useEffect(() => {
    refresh();
  }, [refresh]);
  return [state.result, state.loading || false, refresh];
};

export default useGet;
