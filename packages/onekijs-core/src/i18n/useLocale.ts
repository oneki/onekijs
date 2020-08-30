import useAppContext from '../app/useAppContext';
import { get } from '../core/utils/object';

const useLocale = (): string => {
  return get<string>(useAppContext(), 'i18n.locale') || 'en';
};

export default useLocale;
