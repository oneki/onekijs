import BasicError from '../core/BasicError';
import { LogoutOptions } from './typings';
import useLogout from './useLogout';

const useLogoutCallback = (options: LogoutOptions = {}): [BasicError | undefined, boolean] => {
  options.callback = true;
  return useLogout(options);
};

export const useLogoutCallbackService = useLogoutCallback;
export default useLogoutCallback;
