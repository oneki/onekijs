import { asResultCallback, useAppContext, useRouter } from '@oneki/app';
import { FetchService, useLazyRef, useService } from '@oneki/core';
import { useNotificationService } from '@oneki/notification';
import { FetchOptions, FetchState } from '@oneki/types';
import { useCallback, useEffect } from 'react';
import { UseGetOptions } from './typings';

const useGet = <T = any>(url?: string | null, options: UseGetOptions<T> = {}): [T, boolean, () => void] => {
  const notificationService = useNotificationService();
  const appContext = useAppContext();
  const router = useRouter();
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
