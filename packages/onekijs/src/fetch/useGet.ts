import { useCallback, useEffect, useRef } from 'react';
import { Task } from 'redux-saga';
import useAppContext from '../app/useAppContext';
import useRouter from '../app/useRouter';
import { asResultCallback } from '../app/utils';
import FetchService from '../core/FetchService';
import useLazyRef from '../core/useLazyRef';
import useService from '../core/useService';
import useNotificationService from '../notification/useNotificationService';
import { FetchOptions, FetchState } from '../types/fetch';
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
