import { AppSettings } from '../typings/app';
import useAppContext from './useAppContext';

const useSettings = (): AppSettings => {
  return useAppContext().settings;
};

export default useSettings;
