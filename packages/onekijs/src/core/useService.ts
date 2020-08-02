import produce from 'immer';
import 'reflect-metadata';
import Service, { run, handler } from './Service';
import { Class, State } from './typings';
import useLazyRef from './useLazyRef';
import useLocalReducer from './useLocalReducer';

const useService = <S extends State, T extends Service<S>>(
  ctor: Class<T>,
  initialState?: S,
): [S, T] => {
  const initialStateRef = useLazyRef(initialState);
  const serviceRef = useLazyRef<T>(() => {
    const service = new ctor();
    service.state = produce(initialState || {}, (draftState: S) => draftState) as any;
    service[run]();
    service.init();
    return new Proxy(service, handler) as T;
  });
  return useLocalReducer(serviceRef.current, initialStateRef);
};

export default useService;
