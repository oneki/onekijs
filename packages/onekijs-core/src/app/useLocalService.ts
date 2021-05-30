import useAppService from './useAppService';
import useLazyRef from '../core/useLazyRef';
import useLocalReducer from '../core/useLocalReducer';
import { State } from '../typings/state';
import { LocalService } from '../typings/service';
import { Class } from '../typings/object';

const useLocalService = <S extends State, T extends LocalService<S>>(
  ctor: Class<T>,
  initialState: S | (() => S),
): [S, T] => {
  const initialStateRef = useLazyRef(initialState);
  const appService = useAppService(ctor, initialStateRef.current);
  return useLocalReducer(appService, initialStateRef.current);
};

export default useLocalService;
