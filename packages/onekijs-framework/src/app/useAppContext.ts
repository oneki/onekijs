import { useContext } from 'react';
import { DefaultAppContext } from '../core/context';
import AppContext from './AppContext';

const useAppContext = (): AppContext => {
  return useContext(DefaultAppContext);
};

export default useAppContext;
