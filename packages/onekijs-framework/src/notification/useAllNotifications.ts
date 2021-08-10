import useGlobalProp from '../app/useGlobalProp';
import { AnonymousObject } from '../types/object';
import { Notification } from './typings';

const useAllNotifications = (): AnonymousObject<Notification[]> => {
  return useGlobalProp<AnonymousObject<Notification[]>>('notifications') || {};
};

export default useAllNotifications;
