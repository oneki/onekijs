import 'reflect-metadata';
import useAppContext from './useAppContext';
import { Class } from '../typings/object';
import { AppService } from '../typings/service';
import { State } from '../typings/state';
import useContainer from '../core/useContainer';
import useLazyRef from '../core/useLazyRef';

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
