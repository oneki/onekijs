import useGlobalSelector from '../app/useGlobalSelector';
import { Notification } from './typings';
import { Collection } from '../core/typings';

const useAllNotifications = (): Collection<Notification[]> => {
  return useGlobalSelector<Collection<Notification[]>>('notifications') || {};
};

export default useAllNotifications;
