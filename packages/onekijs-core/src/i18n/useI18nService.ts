import I18nService from './I18nService';
import useGlobalService from '../app/useGlobalService';

const useI18nService = (): I18nService => {
  return useGlobalService(I18nService);
};

export default useI18nService;
