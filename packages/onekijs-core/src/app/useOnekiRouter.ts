import AppRouter from './AppRouter';
import useAppContext from './useAppContext';

// never change the state => no refresh
const useOnekiRouter = (): AppRouter => {
  return useAppContext().router;
};

export default useOnekiRouter;
