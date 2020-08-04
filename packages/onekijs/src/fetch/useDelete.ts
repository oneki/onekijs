import { useCallback, useRef } from 'react';
import useAppContext from '../app/useAppContext';
import useService from '../core/useService';
import useNotificationService from '../notification/useNotificationService';
import FetchService from './FetchService';
import { AppFetchOptions, FetchState } from './typings';
import { asFetchOptions } from './utils';

const useDelete = (url: string, options: AppFetchOptions = {}): [(extraOptions?: AppFetchOptions) => void, boolean] => {
  const notificationService = useNotificationService();
  const appContext = useAppContext();
  const optionsRef = useRef(options);

  const [state, service] = useService(FetchService, {
    loading: false,
  } as FetchState);

  const executor = useCallback(
    (extraOptions: AppFetchOptions = {}) => {
      extraOptions = Object.assign({}, optionsRef.current, extraOptions);
      service.delete(extraOptions.url || url, asFetchOptions(extraOptions, notificationService, appContext));
    },
    [service, url, optionsRef, appContext, notificationService],
  );

  return [executor, state.loading || false];
};

export default useDelete;
