import { useGlobalProp } from '@oneki/app';
import { Notification } from './typings';

const useNotifications = (topic: string): Notification[] => {
  return useGlobalProp<Notification[]>(`notifications.${topic}`) || [];
};

export default useNotifications;
