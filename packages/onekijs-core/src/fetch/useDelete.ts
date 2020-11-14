import { useCallback, useRef } from 'react';
import useAppContext from '../app/useAppContext';
import useService from '../core/useService';
import useNotificationService from '../notification/useNotificationService';
import FetchService from './FetchService';
import { AppFetchOptions, FetchState, AppExtraFetchOptions } from './typings';
import { asFetchOptions } from './utils';
import useOnekiRouter from '../router/useOnekiRouter';

const useDelete = (
  url: string,
  options: AppFetchOptions = {},
): [(extraOptions?: AppExtraFetchOptions) => void, boolean] => {
  const notificationService = useNotificationService();
  const appContext = useAppContext();
  const optionsRef = useRef(options);
  const router = useOnekiRouter();

  const [state, service] = useService(FetchService, {
    loading: false,
  } as FetchState);

  const executor = useCallback(
    (extraOptions: AppExtraFetchOptions = {}) => {
      extraOptions = Object.assign({}, optionsRef.current, extraOptions);
      service.delete(extraOptions.url || url, asFetchOptions(extraOptions, notificationService, appContext, router));
    },
    [service, url, optionsRef, appContext, notificationService, router],
  );

  return [executor, state.loading || false];
};

export default useDelete;
