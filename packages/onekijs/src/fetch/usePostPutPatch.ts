import { useCallback, useRef } from 'react';
import useAppContext from '../app/useAppContext';
import useService from '../core/useService';
import useNotificationService from '../notification/useNotificationService';
import FetchService from './FetchService';
import { AppFetchOptions, FetchState } from './typings';
import { asFetchOptions } from './utils';

const usePostPutPatch = <T = any>(
  url: string,
  method: string,
  options: AppFetchOptions<T> = {},
): [(body: Partial<T>, extraOptions?: AppFetchOptions<T>) => void, boolean] => {
  const notificationService = useNotificationService();
  const appContext = useAppContext();
  const optionsRef = useRef(options);

  const [state, service] = useService(FetchService, {
    loading: false,
  } as FetchState);
  const executor = useCallback(
    (body: Partial<T>, extraOptions: AppFetchOptions<T> = {}) => {
      extraOptions = Object.assign({}, optionsRef.current, extraOptions);
      service.fetch(
        extraOptions.url || url,
        method,
        body,
        asFetchOptions(extraOptions, notificationService, appContext),
      );
    },
    [service, url, method, optionsRef, appContext, notificationService],
  );

  return [executor, state.loading || false];
};

export default usePostPutPatch;
