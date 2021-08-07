import useGlobalService from '../app/useGlobalService';
import I18nService from './I18nService';

const useI18nService = (): I18nService => {
  const result = useGlobalService(I18nService);
  return result;
};

export default useI18nService;
