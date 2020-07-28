import useNotifications from '../notification/useNotifications';
import { Notification } from '../notification/typings';

const useLogoutError = (): Notification | undefined => {
  const errors = useNotifications('logout-error');
  return errors[0];
};

export default useLogoutError;
