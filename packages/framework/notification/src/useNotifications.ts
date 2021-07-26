import { useGlobalProp } from '@oneki/app';
import { AnonymousObject } from '../../types/dist';
import { Notification } from './typings';

const extractNotifications = (
  notifications: Notification[] | AnonymousObject,
  accumulator: Notification[],
): Notification[] => {
  if (Array.isArray(notifications)) return accumulator.concat(notifications);
  return Object.keys(notifications).reduce((accumulator, key) => {
    return extractNotifications(notifications[key], accumulator);
  }, accumulator);
};

const useNotifications = (topic: string): Notification[] => {
  const notifications = useGlobalProp<Notification[] | AnonymousObject>(`notifications.${topic}`) || [];
  return extractNotifications(notifications, []);
};

export default useNotifications;
