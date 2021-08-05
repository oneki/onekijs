import 'reflect-metadata';
import useLazyRef from '../core/useLazyRef';
import { Class } from '../types/object';
import { State } from '../types/state';
import AppService from './AppService';
import useAppContext from './useAppContext';
import useContainer from './useContainer';

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
