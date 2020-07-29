import { useContext } from 'react';
import { get } from '../core/utils/object';
import { DefaultAppContext } from '../app/AppContext';

const useLocale = (): string => {
  return get<string>(useContext(DefaultAppContext), 'i18n.locale') || 'en';
};

export default useLocale;
