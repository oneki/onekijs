import useGlobalService from '../app/useGlobalService';
import NotificationService from './NotificationService';

export const useNotificationService = (): NotificationService => {
  return useGlobalService(NotificationService);
};

export default useNotificationService;
