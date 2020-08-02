import AuthService from './AuthService';
import useGlobalService from '../core/useGlobalService';

const useAuthService = (): AuthService => {
  return useGlobalService(AuthService);
};

export default useAuthService;
