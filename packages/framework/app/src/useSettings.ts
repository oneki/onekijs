import { AppSettings } from '@oneki/types';
import useAppContext from './useAppContext';

const useSettings = (): AppSettings => {
  return useAppContext().settings;
};

export default useSettings;
