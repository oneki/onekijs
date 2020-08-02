import GlobalService from './GlobalService';
import { Class, State } from './typings';
import useAppService from './useAppService';

const useGlobalService = <T extends GlobalService<State>>(ctor: Class<T>): T => {
  const service = useAppService(ctor);
  return service;
};

export const useReduxService = useGlobalService; // alias
export default useGlobalService;
