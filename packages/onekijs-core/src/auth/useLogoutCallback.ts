import DefaultBasicError from '../core/BasicError';
import { LogoutOptions } from './typings';
import useLogout from './useLogout';

const useLogoutCallback = (options: LogoutOptions = {}): [DefaultBasicError | undefined, boolean] => {
  options.callback = true;
  return useLogout(options);
};

export const useLogoutCallbackService = useLogoutCallback;
export default useLogoutCallback;
