import { useGlobalService } from '@oneki/app';
import NotificationService from './NotificationService';

export const useNotificationService = (): NotificationService => {
  return useGlobalService(NotificationService);
};

export default useNotificationService;
