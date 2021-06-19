import { useLazyRef } from '@oneki/core';
import { AppService, Class, State } from '@oneki/types';
import 'reflect-metadata';
import useAppContext from './useAppContext';
import useContainer from './useContainer';

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
