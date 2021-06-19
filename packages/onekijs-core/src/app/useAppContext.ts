import { useContext } from 'react';
import { AppContext } from '../typings/app';
import { DefaultAppContext } from './AppContext';

const useAppContext = (): AppContext => {
  return useContext(DefaultAppContext);
};

export default useAppContext;
