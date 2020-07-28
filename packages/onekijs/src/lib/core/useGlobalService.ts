import Service from './Service';
import { Class, State, ServiceTypeEnum } from './typings';
import useService from './useService';

const useGlobalService = <T extends Service<State>>(ctor: Class<T>): T => {
  const service = useService(ServiceTypeEnum.Global, ctor);
  return service;
};

export const useReduxService = useGlobalService; // alias
export default useGlobalService;
