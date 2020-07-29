import { useContext } from 'react';
import Service from './Service';
import ServiceType from './ServiceType';
import { Class, State, ServiceTypeEnum } from './typings';
import useLazyRef from './useLazyRef';
import useContainer from './useContainer';
import 'reflect-metadata';
import { DefaultAppContext } from '../app/AppContext';

const useService = <S extends State, T extends Service<S>>(
  type: ServiceTypeEnum,
  ctor: Class<T>,
  initialState?: S,
): T => {
  const appContext = useContext(DefaultAppContext);
  const container = useContainer();
  const serviceRef = useLazyRef<T>(() => {
    const service = container.createService(new ServiceType(type), ctor, appContext, initialState);
    return service;
  });
  serviceRef.current.context = appContext;

  return serviceRef.current;
};

export default useService;
