import { Router } from '@oneki/types';
import useTryAppContext from './useTryAppContext';

// never change the state => no refresh
const useTryRouter = (): Router | undefined => {
  return useTryAppContext()?.router;
};

export default useTryRouter;
