import { useAppContext, useRouter } from '@oneki/app';
import { FetchService, useService } from '@oneki/core';
import { useNotificationService } from '@oneki/notification';
import { FetchState } from '@oneki/types';
import { useCallback, useRef } from 'react';
import { AppExtraFetchOptions, AppFetchOptions } from './typings';
import { asFetchOptions } from './utils';

const useDelete = (
  url: string,
  options: AppFetchOptions = {},
): [(extraOptions?: AppExtraFetchOptions) => void, boolean] => {
  const notificationService = useNotificationService();
  const appContext = useAppContext();
  const optionsRef = useRef(options);
  const router = useRouter();

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
