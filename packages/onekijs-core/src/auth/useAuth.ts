import useGlobalProp from '../app/useGlobalProp';
import { Auth } from './typings';

const useAuth = (): Auth | undefined => {
  return useGlobalProp<Auth>('auth');
};

export default useAuth;
