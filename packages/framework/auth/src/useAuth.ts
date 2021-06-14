import { useGlobalProp } from '@oneki/app';
import { Auth } from '@oneki/types';

const useAuth = (): Auth | undefined => {
  return useGlobalProp<Auth>('auth');
};

export default useAuth;
