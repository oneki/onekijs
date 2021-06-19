import { useAppContext } from '@oneki/app';
import { get } from '@oneki/utils';

const useLocale = (): string => {
  return get<string>(useAppContext(), 'i18n.locale') || 'en';
};

export default useLocale;
