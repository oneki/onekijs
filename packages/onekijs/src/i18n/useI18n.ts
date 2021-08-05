import useAppContext from '../app/useAppContext';
import { I18n } from '../types/i18n';

const useI18n = (): I18n => {
  return useAppContext().i18n;
};

export default useI18n;
