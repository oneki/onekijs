import { Notification } from '../notification/typings';
import useNotifications from '../notification/useNotifications';

const useLogoutError = (): Notification | undefined => {
  const errors = useNotifications('logout-error');
  return errors[0];
};

export default useLogoutError;
