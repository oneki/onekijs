import { useContext } from 'react';
import { DefaultAppContext } from './AppContext';
import AppRouter from './AppRouter';

// never change the state => no refresh
const useOnekiRouter = (): AppRouter => {
  return useContext(DefaultAppContext).router;
};

export default useOnekiRouter;
