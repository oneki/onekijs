import { Class } from '../types/object';
import { State } from '../types/state';
import GlobalService from './GlobalService';
import useAppContext from './useAppContext';
import useAppService from './useAppService';

const useGlobalService = <T extends GlobalService<State>>(ctor: Class<T>): T => {
  const context = useAppContext();
  const service = useAppService(ctor, context.store.getState());
  return service;
};

export const useReduxService = useGlobalService; // alias
export default useGlobalService;
