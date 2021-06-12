import { useLazyRef, useLocalReducer } from '@oneki/core';
import { Class, LocalService, State } from '@oneki/types';
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
