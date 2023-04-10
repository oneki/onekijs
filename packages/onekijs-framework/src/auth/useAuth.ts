import useGlobalProp from '../app/useGlobalProp';
import { Auth } from '../types/auth';

const useAuth = (identity = 'default'): Auth | undefined => {
  return useGlobalProp<Auth>(`auth.${identity}`);
};

export default useAuth;
