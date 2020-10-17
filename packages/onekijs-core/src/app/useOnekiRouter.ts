import Router from './Router';
import useAppContext from './useAppContext';

// never change the state => no refresh
const useOnekiRouter = (): Router => {
  return useAppContext().router;
};

export default useOnekiRouter;
