import { Router } from '@oneki/types';
import useAppContext from './useAppContext';

// never change the state => no refresh
const useRouter = (): Router => {
  return useAppContext().router;
};

export default useRouter;