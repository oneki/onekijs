import { useCallback, useRef } from 'react';
import useAppContext from '../app/useAppContext';
import useRouter from '../app/useRouter';
import FetchService from '../core/FetchService';
import useService from '../core/useService';
import useNotificationService from '../notification/useNotificationService';
import { FetchMethod, FetchState } from '../types/fetch';
import { AppExtraFetchOptions, AppFetchOptions } from './typings';
import { asFetchOptions } from './utils';

const usePostPutPatch = <T = any>(
  url: string,
  method: FetchMethod,
  options: AppFetchOptions<T> = {},
): [(body: Partial<T>, extraOptions?: AppExtraFetchOptions<T>) => Promise<void>, boolean] => {
  const notificationService = useNotificationService();
  const appContext = useAppContext();
  const optionsRef = useRef(options);
  const router = useRouter();

  const [state, service] = useService(FetchService, {
    loading: false,
  } as FetchState);
  const executor = useCallback(
    async (body: Partial<T>, extraOptions: AppExtraFetchOptions<T> = {}) => {
      extraOptions = Object.assign({}, optionsRef.current, extraOptions);
      await service.fetch(
        extraOptions.url || url,
        method,
        body,
        asFetchOptions(extraOptions, notificationService, appContext, router),
      );
    },
    [service, url, method, optionsRef, appContext, notificationService, router],
  );

  return [executor, state.loading || false];
};

export default usePostPutPatch;