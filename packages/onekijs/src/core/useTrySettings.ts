import { AppSettings } from '../types/app';
import useTryAppContext from './useTryAppContext';

const useTrySettings = (): AppSettings | undefined => {
  return useTryAppContext()?.settings;
};

export default useTrySettings;
