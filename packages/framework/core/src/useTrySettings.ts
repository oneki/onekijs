import { AppSettings } from '@oneki/types';
import useTryAppContext from './useTryAppContext';

const useTrySettings = (): AppSettings | undefined => {
  return useTryAppContext()?.settings;
};

export default useTrySettings;
