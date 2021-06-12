import { useGlobalProp } from '@oneki/app';
import { Auth } from './typings';

const useAuth = (): Auth | undefined => {
  return useGlobalProp<Auth>('auth');
};

export default useAuth;
