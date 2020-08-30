import { AppSettings } from './typings';
import useAppContext from './useAppContext';

const useSettings = (): AppSettings => {
  return useAppContext().settings;
};

export default useSettings;
