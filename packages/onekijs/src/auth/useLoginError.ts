import { Notification } from '../notification/typings';
import useNotifications from '../notification/useNotifications';

const useLoginError = (): Notification | undefined => {
  const errors = useNotifications('login-error');
  return errors[0];
};

export default useLoginError;
