import BasicError from '../core/BasicError';
import { AnyFunction } from '../types/core';
import { LoginOptions, Mfa } from './typings';
import useLogin from './useLogin';

// manage the result of a external login
const useLoginCallback = (idpName = 'default', options: LoginOptions = {}): [BasicError | undefined, boolean, AnyFunction, Mfa | undefined] => {
  options.callback = true;
  const [error, loading, submit, mfa] = useLogin(idpName, options);
  return [error, loading, submit, mfa];
};

export const useLoginCallbackService = useLoginCallback;
export default useLoginCallback;
