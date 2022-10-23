import { useCallback, useEffect, useRef } from 'react';
import { Task } from 'redux-saga';
import FetchService from '../core/FetchService';
import useService from '../core/useService';
import { FetchOptions, FetchState } from '../types/fetch';
import { UseGetOptions } from './typings';
import { useFetchOptions } from './useFetchOptions';

const useGet = <T = any>(url?: string | null, options: UseGetOptions<T> = {}): [T, boolean, () => void] => {
  const pollingTaskRef = useRef<Task | null>(null);
  const optionsRef = useRef(options);
  const fetchOptions = useFetchOptions(options);

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
        service.poll(url, optionsRef.current.pollingMs, fetchOptions).then((task: Task) => {
          pollingTaskRef.current = task;
        });
      } else {
        service.get(url, fetchOptions as FetchOptions);
      }
    }
  }, [url, service, fetchOptions]);

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
