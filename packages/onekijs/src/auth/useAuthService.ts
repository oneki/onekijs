import useGlobalService from '../app/useGlobalService';
import AuthService from './AuthService';

const useAuthService = (): AuthService => {
  return useGlobalService(AuthService);
};

export default useAuthService;
