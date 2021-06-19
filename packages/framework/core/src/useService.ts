import { Class, create, Service, State } from '@oneki/types';
import 'reflect-metadata';
import { handler } from './Service';
import useLazyRef from './useLazyRef';
import useLocalReducer from './useLocalReducer';

const useService = <S extends State, T extends Service<S>>(ctor: Class<T>, initialState: S | (() => S)): [S, T] => {
  const initialStateRef = useLazyRef(initialState);
  const serviceRef = useLazyRef<T>(() => {
    const service = new ctor();
    service[create](initialStateRef.current);
    return new Proxy(service, handler) as T;
  });

  return useLocalReducer(serviceRef.current, initialStateRef.current);
};

export default useService;
