import { AppStore } from '@oneki/types';
import useTryAppContext from './useTryAppContext';

const useTryStore = (): AppStore | undefined => {
  return useTryAppContext()?.store;
};

export default useTryStore;
