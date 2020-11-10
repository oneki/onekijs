import useGlobalProp from '../app/useGlobalProp';
import { Notification } from './typings';
import { AnonymousObject } from '../core/typings';

const useAllNotifications = (): AnonymousObject<Notification[]> => {
  return useGlobalProp<AnonymousObject<Notification[]>>('notifications') || {};
};

export default useAllNotifications;
