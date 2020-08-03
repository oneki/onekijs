import 'reflect-metadata';
import Service, { handler, run, inReducer } from './Service';
import { Class, State } from './typings';
import useLazyRef from './useLazyRef';
import useLocalReducer from './useLocalReducer';
import { isFunction } from './utils/type';
import produce from 'immer';

const useService = <S extends State, T extends Service<S>>(ctor: Class<T>, initialState: S | (() => S)): [S, T] => {
  const initialStateRef = useLazyRef(initialState);
  const serviceRef = useLazyRef<T>(() => {
    const service = new ctor();
    service.state = initialStateRef.current;
    service[run]();
    if (isFunction(service.init)) {
      service[inReducer] = true;
      service.init();
      service[inReducer] = false;
    }
    // freeze state
    service.state = produce(service.state, (draftState: S) => draftState) as S;
    return new Proxy(service, handler) as T;
  });

  return useLocalReducer(serviceRef.current, initialStateRef.current);
};

export default useService;
