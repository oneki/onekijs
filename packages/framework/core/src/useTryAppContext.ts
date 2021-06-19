import { AppContext } from '@oneki/types';
import { useContext } from 'react';
import { DefaultAppContext } from './context';

const useTryAppContext = (): AppContext | null => {
  return useContext(DefaultAppContext);
};

export default useTryAppContext;
