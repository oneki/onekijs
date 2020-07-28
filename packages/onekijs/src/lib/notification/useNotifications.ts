import useGlobalSelector from '../app/useGlobalSelector';
import { Notification } from './typings';

const useNotifications = (topic: string): Notification[] => {
  return useGlobalSelector<Notification[]>(`notifications.${topic}`) || [];
};

export default useNotifications;
