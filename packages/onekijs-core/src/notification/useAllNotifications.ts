import useGlobalSelector from '../app/useGlobalSelector';
import { Notification } from './typings';
import { AnonymousObject } from '../core/typings';

const useAllNotifications = (): AnonymousObject<Notification[]> => {
  return useGlobalSelector<AnonymousObject<Notification[]>>('notifications') || {};
};

export default useAllNotifications;
