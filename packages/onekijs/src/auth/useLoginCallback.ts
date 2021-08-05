import BasicError from '../core/BasicError';
import { LoginOptions } from './typings';
import useLogin from './useLogin';

// manage the result of a external login
const useLoginCallback = (idpName = 'default', options: LoginOptions = {}): [BasicError | undefined, boolean] => {
  options.callback = true;
  const [error, loading] = useLogin(idpName, options);
  return [error, loading];
};

export const useLoginCallbackService = useLoginCallback;
export default useLoginCallback;
