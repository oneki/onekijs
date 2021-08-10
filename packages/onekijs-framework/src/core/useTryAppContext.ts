import { useContext } from 'react';
import { AppContext } from '../types/app';
import { DefaultAppContext } from './context';

const useTryAppContext = (): AppContext | null => {
  return useContext(DefaultAppContext);
};

export default useTryAppContext;
