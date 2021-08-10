import { useCallback, useEffect } from 'react';
import useLocalService from '../app/useLocalService';
import { useErrorCallback, useSuccessCallback } from '../app/utils';
import BasicError from '../core/BasicError';
import useNotificationService from '../notification/useNotificationService';
import LogoutService from './LogoutService';
import { LogoutOptions, LogoutState } from './typings';

const useLogout = (options: LogoutOptions = {}): [BasicError | undefined, boolean] => {
  const [state, service] = useLocalService(LogoutService, {
    loading: true,
  } as LogoutState);
  const notificationService = useNotificationService();

  // we send errors to the notification service
  const defaultOnError = useCallback(
    (error) => {
      notificationService.send({
        topic: 'logout-error',
        payload: error,
      });
    },
    [notificationService],
  );
  const onError = useErrorCallback(options.onError) || defaultOnError;
  const onSuccess = useSuccessCallback(options.onSuccess);
  const callback = options.callback;

  useEffect(() => {
    if (callback) {
      service.successLogout(onError, onSuccess);
    } else {
      service.logout(onError, onSuccess);
    }
  }, [service, onError, onSuccess, callback]);

  return [state.error, state.loading || false];
};

// alias
export const useLogoutService = useLogout;
export default useLogout;
