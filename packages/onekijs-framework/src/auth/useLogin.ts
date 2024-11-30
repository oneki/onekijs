import { useCallback, useEffect } from 'react';
import useLocalService from '../app/useLocalService';
import { useErrorCallback, useSuccessCallback } from '../app/utils';
import BasicError from '../core/BasicError';
import useNotificationService from '../notification/useNotificationService';
import { AnyFunction } from '../types/core';
import { AnonymousObject } from '../types/object';
import LoginService from './LoginService';
import { Mfa, LoginOptions, LoginState } from './typings';

/**
 * The **useLogin** hooks instanciates a login service
 *
 * ```ts
 * const [error, loading, submit] = useLogin(idpName, options);
 * ```
 *
 * @param idpName **idpName** is used to retrieve the configuration identified by the key ***idp/:idpName*** in `src/settings.ts`.
 * @param options
 * @returns
 *
 * @group Hooks
 * @category Auth
 */
const useLogin = (
  idpName = 'default',
  options: LoginOptions = {},
): [
  /**
   * Set if an error occurs during the login phase.
   * The error object contains three properties:
   * - **code**
   * - **message**: the error message
   * - **payload**: any additionnal data specific to the error
   */
  BasicError | undefined,
  /**
   * A flag to indicate that an AJAX request is in progress
   */
  boolean,
  /**
   * A function to submit the credentials or the MFA (depending on the step) to the server.
   * Mainly used for Form based authentication
   */
  AnyFunction,
  /**
   * A MFA object indicating if an additional step is required to ask a TOTP to the user
   */
  Mfa | undefined,
] => {
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

  // build the submit method to verify the MFA code
  const verifyTotp = useCallback(
    (data?: AnonymousObject) => {
      return service.verifyTotp(Object.assign({}, data), idpName, onError, onSuccess);
    },
    [service, idpName, onError, onSuccess],
  );

  const isMfaStep = state.mfa?.required ? true : false;

  useEffect(() => {
    if (callback) {
      // call the external login callback saga
      service.externalLoginCallback(idpName, onError, onSuccess);
    } else {
      // call the login saga
      service.login(idpName, onError, onSuccess);
    }
  }, [service, idpName, onError, onSuccess, callback]);

  return [state.error, state.loading || false, isMfaStep ? submit : verifyTotp, state.mfa];
};

// alias
export const useLoginService = useLogin;
export default useLogin;
