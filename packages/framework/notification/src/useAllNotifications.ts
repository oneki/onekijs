import { useGlobalProp } from '@oneki/app';
import { AnonymousObject } from '@oneki/types';
import { Notification } from './typings';

const useAllNotifications = (): AnonymousObject<Notification[]> => {
  return useGlobalProp<AnonymousObject<Notification[]>>('notifications') || {};
};

export default useAllNotifications;
