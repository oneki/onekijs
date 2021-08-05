import { AppStore } from '../types/app';
import useTryAppContext from './useTryAppContext';

const useTryStore = (): AppStore | undefined => {
  return useTryAppContext()?.store;
};

export default useTryStore;
