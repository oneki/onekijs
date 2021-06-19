import { useAppContext } from '@oneki/app';
import { I18n } from '@oneki/types';

const useI18n = (): I18n => {
  return useAppContext().i18n;
};

export default useI18n;
