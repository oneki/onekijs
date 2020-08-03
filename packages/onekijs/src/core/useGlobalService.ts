import GlobalService from './GlobalService';
import { Class, State } from './typings';
import useAppService from './useAppService';
import { DefaultAppContext } from '../app/AppContext';
import { useContext } from 'react';

const useGlobalService = <T extends GlobalService<State>>(ctor: Class<T>): T => {
  const context = useContext(DefaultAppContext);
  const service = useAppService(ctor, context.store.getState());
  return service;
};

export const useReduxService = useGlobalService; // alias
export default useGlobalService;
