import { useCallback, useEffect } from 'react';
import useLocalService from '../app/useLocalService';
import { useErrorCallback, useSuccessCallback } from '../app/utils';
import BasicError from '../core/BasicError';
import useNotificationService from '../notification/useNotificationService';
import { AnyFunction } from '../types/core';
import { AnonymousObject } from '../types/object';
import LoginService from './LoginService';
import { LoginOptions, LoginState } from './typings';

// manage the login
const useLogin = (idpName = 'default', options: LoginOptions = {}): [BasicError | undefined, boolean, AnyFunction] => {
  // create the local login service
  const [state, service] = useLocalService(LoginService, {
    loading: false,
  } as LoginState);

  // inject the global notificationService
  const notificationService = useNotificationService();

  // we send errors to the notification service
  const defaultOnError = useCallback(
    (error: BasicError) => {
      notificationService.send({
        topic: 'login-error',
        payload: error,
      });
    },
    [notificationService],
  );
  const onError = useErrorCallback(options.onError) || defaultOnError;
  const onSuccess = useSuccessCallback(options.onSuccess);
  const callback = options.callback;

  // build the submit method in case of a form login
  const submit = useCallback(
    (data?: AnonymousObject) => {
      return service.formLogin(Object.assign({}, data), idpName, onError, onSuccess);
    },
    [service, idpName, onError, onSuccess],
  );

  useEffect(() => {
    if (callback) {
      // call the external login callback saga
      service.externalLoginCallback(idpName, onError, onSuccess);
    } else {
      // call the login saga
      service.login(idpName, onError, onSuccess);
    }
  }, [service, idpName, onError, onSuccess, callback]);

  return [state.error, state.loading || false, submit];
};

// alias
export const useLoginService = useLogin;
export default useLogin;
