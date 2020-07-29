import { useContext } from 'react';
import { DefaultAppContext } from './AppContext';
import { AppSettings } from './typings';

const useSettings = (): AppSettings => {
  return useContext(DefaultAppContext).settings;
};

export default useSettings;
