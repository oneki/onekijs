import { useContext } from 'react';
import 'reflect-metadata';
import { DefaultAppContext } from '../app/AppContext';
import { Class, State } from './typings';
import useContainer from './useContainer';
import useLazyRef from './useLazyRef';
import AppService from './AppService';

const useAppService = <S extends State, T extends AppService<S>>(ctor: Class<T>, initialState: S): T => {
  const appContext = useContext(DefaultAppContext);
  const container = useContainer();
  const serviceRef = useLazyRef<T>(() => {
    const service = container.createService(ctor, appContext, initialState);
    return service;
  });

  return serviceRef.current;
};

export default useAppService;
