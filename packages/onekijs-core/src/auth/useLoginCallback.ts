import { LoginOptions } from './typings';
import useLogin from './useLogin';
import DefaultBasicError from '../core/BasicError';

// manage the result of a external login
const useLoginCallback = (idpName = 'default', options: LoginOptions = {}): [DefaultBasicError | undefined, boolean] => {
  options.callback = true;
  const [error, loading] = useLogin(idpName, options);
  return [error, loading];
};

export const useLoginCallbackService = useLoginCallback;
export default useLoginCallback;
