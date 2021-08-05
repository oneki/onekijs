import useGlobalProp from '../app/useGlobalProp';
import { Auth } from '../types/auth';

const useAuth = (): Auth | undefined => {
  return useGlobalProp<Auth>('auth');
};

export default useAuth;
