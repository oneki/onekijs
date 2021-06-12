import { useGlobalService } from '@oneki/app';
import I18nService from './I18nService';

const useI18nService = (): I18nService => {
  return useGlobalService(I18nService);
};

export default useI18nService;
