import { Notification, useNotifications } from '@oneki/notification';

const useLoginError = (): Notification | undefined => {
  const errors = useNotifications('login-error');
  return errors[0];
};

export default useLoginError;
