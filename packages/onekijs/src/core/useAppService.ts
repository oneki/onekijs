import 'reflect-metadata';
import useAppContext from '../app/useAppContext';
import AppService from './AppService';
import { Class, State } from './typings';
import useContainer from './useContainer';
import useLazyRef from './useLazyRef';

const useAppService = <S extends State, T extends AppService<S>>(ctor: Class<T>, initialState: S): T => {
  const appContext = useAppContext();
  const container = useContainer();
  const serviceRef = useLazyRef<T>(() => {
    const service = container.createService(ctor, appContext, initialState);
    return service;
  });

  return serviceRef.current;
};

export default useAppService;
