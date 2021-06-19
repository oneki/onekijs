import { useGlobalService } from '@oneki/app';
import AuthService from './AuthService';

const useAuthService = (): AuthService => {
  return useGlobalService(AuthService);
};

export default useAuthService;
