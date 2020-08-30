import useNotifications from '../notification/useNotifications';
import { Notification } from '../notification/typings';

const useLoginError = (): Notification | undefined => {
  const errors = useNotifications('login-error');
  return errors[0];
};

export default useLoginError;
