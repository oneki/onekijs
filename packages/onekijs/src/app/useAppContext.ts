import { useContext } from 'react';
import AppContext, { DefaultAppContext } from './AppContext';

const useAppContext = (): AppContext => {
  return useContext(DefaultAppContext);
};

export default useAppContext;
