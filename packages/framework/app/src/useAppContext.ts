import { AppContext } from '@oneki/types';
import { useContext } from 'react';
import { DefaultAppContext } from './AppContext';

const useAppContext = (): AppContext => {
  return useContext(DefaultAppContext);
};

export default useAppContext;
