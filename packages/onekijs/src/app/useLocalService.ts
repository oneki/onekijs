import useLazyRef from '../core/useLazyRef';
import useLocalReducer from '../core/useLocalReducer';
import { Class } from '../types/object';
import { State } from '../types/state';
import LocalService from './LocalService';
import useAppService from './useAppService';

const useLocalService = <S extends State, T extends LocalService<S>>(
  ctor: Class<T>,
  initialState: S | (() => S),
): [S, T] => {
  const initialStateRef = useLazyRef(initialState);
  const appService = useAppService(ctor, initialStateRef.current);
  return useLocalReducer(appService, initialStateRef.current);
};

export default useLocalService;
