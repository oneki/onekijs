import Router from './Router';
import useAppContext from '../app/useAppContext';

// never change the state => no refresh
const useOnekiRouter = (): Router => {
  return useAppContext().router;
};

export default useOnekiRouter;
