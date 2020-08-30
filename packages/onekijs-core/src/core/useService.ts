import 'reflect-metadata';
import Service, { handler, create } from './Service';
import { Class, State } from './typings';
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
