import 'reflect-metadata';
import Service, { handler, run } from './Service';
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
    service[run]();
    service.init((initialStateRef.current || {}) as any);  
    return new Proxy(service, handler) as T;
  });
  const [state, service] = useLocalReducer(serviceRef.current, initialStateRef);

  return [state, service];
};

export default useService;
