import { Router } from '../types/router';
import useTryAppContext from './useTryAppContext';

// never change the state => no refresh
const useTryRouter = (): Router | undefined => {
  return useTryAppContext()?.router;
};

export default useTryRouter;
