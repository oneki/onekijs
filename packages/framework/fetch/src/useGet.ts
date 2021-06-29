import { asResultCallback, useAppContext, useRouter } from '@oneki/app';
import { FetchService, useLazyRef, useService } from '@oneki/core';
import { useNotificationService } from '@oneki/notification';
import { FetchOptions, FetchState } from '@oneki/types';
import { useCallback, useEffect, useRef } from 'react';
import { Task } from 'redux-saga';
import { UseGetOptions } from './typings';

const useGet = <T = any>(url?: string | null, options: UseGetOptions<T> = {}): [T, boolean, () => void] => {
  const notificationService = useNotificationService();
  const appContext = useAppContext();
  const router = useRouter();
  const pollingTaskRef = useRef<Task | null>(null);
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

  const [state, service] = useService<FetchState, FetchService>(FetchService, {
    loading: false,
    result: optionsRef.current.defaultValue,
  } as FetchState);

  const refresh = useCallback(() => {
    if (url) {
      if (pollingTaskRef !== null) {
        pollingTaskRef.current?.cancel();
        pollingTaskRef.current = null;
      }
      if (optionsRef.current.pollingMs) {
        service.poll(url, optionsRef.current.pollingMs, optionsRef.current as FetchOptions).then((task: Task) => {
          pollingTaskRef.current = task;
        });
      } else {
        service.get(url, optionsRef.current as FetchOptions);
      }
    }
  }, [url, service, optionsRef]);

  useEffect(() => {
    refresh();
    return () => {
      if (pollingTaskRef !== null) {
        pollingTaskRef.current?.cancel();
        pollingTaskRef.current = null;
      }
    };
  }, [refresh]);
  return [state.result, state.loading || false, refresh];
};

export default useGet;
