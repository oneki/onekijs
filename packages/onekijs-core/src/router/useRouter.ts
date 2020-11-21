import Router from './Router';
import useAppContext from '../app/useAppContext';

// never change the state => no refresh
const useRouter = (): Router => {
  return useAppContext().router;
};

export default useRouter;
