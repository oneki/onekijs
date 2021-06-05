import useAppContext from '../app/useAppContext';
import { Router } from '../typings/router';

// never change the state => no refresh
const useRouter = (): Router => {
  return useAppContext().router;
};

export default useRouter;
