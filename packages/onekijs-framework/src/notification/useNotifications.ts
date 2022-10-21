import useGlobalProp from '../app/useGlobalProp';
import { AnonymousObject } from '../types/object';
import { pick, toArray } from '../utils/object';
import { Notification } from './typings';

const mergeNotifications = (a: Notification[], b: Notification[]): Notification[] => {
  return a.concat(b).sort((a, b) => a.timestamp - b.timestamp);
};

const extractNotifications = (
  notifications: Notification[] | AnonymousObject,
  accumulator: Notification[],
): Notification[] => {
  if (Array.isArray(notifications)) return mergeNotifications(accumulator, notifications);
  return Object.keys(notifications).reduce((accumulator, key) => {
    return extractNotifications(notifications[key], accumulator);
  }, accumulator);
};

const useNotifications = (topics?: string | string[]): Notification[] => {
  let notifications = useGlobalProp<AnonymousObject>('notifications') || {};
  if (topics) {
    notifications = pick(notifications, toArray(topics) as any[]);
  }
  return extractNotifications(notifications, []);
};

export default useNotifications;
