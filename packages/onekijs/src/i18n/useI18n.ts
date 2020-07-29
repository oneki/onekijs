import { useContext } from 'react';
import { I18n } from './typings';
import { DefaultAppContext } from '../app/AppContext';

const useI18n = (): I18n => {
  return useContext(DefaultAppContext).i18n;
};

export default useI18n;
