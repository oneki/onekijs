import LocalService from './LocalService';
import { Class, State } from './typings';
import useAppService from './useAppService';
import useLazyRef from './useLazyRef';
import useLocalReducer from './useLocalReducer';

const useLocalService = <S extends State, T extends LocalService<S>>(
  ctor: Class<T>,
  initialState?: S | (() => S),
): [S, T] => {
  const initialStateRef = useLazyRef(initialState);
  const service = useAppService(ctor, initialStateRef.current);
  return useLocalReducer(service, initialStateRef);
};

export default useLocalService;
