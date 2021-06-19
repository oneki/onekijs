import AuthService from './AuthService';
import useGlobalService from '../app/useGlobalService';

const useAuthService = (): AuthService => {
  return useGlobalService(AuthService);
};

export default useAuthService;
