import { Notification, useNotifications } from '@oneki/notification';

const useLogoutError = (): Notification | undefined => {
  const errors = useNotifications('logout-error');
  return errors[0];
};

export default useLogoutError;
