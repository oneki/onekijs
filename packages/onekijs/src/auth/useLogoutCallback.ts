import { LogoutOptions, LogoutState } from './typings';
import useLogout from './useLogout';

const useLogoutCallback = (options: LogoutOptions = {}): LogoutState => {
  options.callback = true;
  return useLogout(options);
};

export const useLogoutCallbackService = useLogoutCallback;
export default useLogoutCallback;
