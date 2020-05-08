import { useLocation } from './context';
import { get, set } from './utils/object';


const settings = {
  i18n: {
    locales: ['en', 'fr', 'nl'],
    defaultLocale: 'en'
  },
  contextPath: '/'
}

export const url2locale = ( pathname, contextPath, candidates ) => {
  const length = contextPath.endsWith('/') ? contextPath.length : contextPath.length + 1;
  const locale = pathname.substring(length).split('/')[0];
  if (candidates.includes(locale)) return locale;
  return null;
}

/* 
language detection:
1. URL
2. Redux
3. Local storage
4. Browser detection
5. Default
*/

export const useTranslation = () => {
  const location = useLocation();
}


export const i18nService = {
  name: 'i18n',
  reducers: {
    getLocale: (state, payload, { router, settings }) => {
      const pathname = router.location.pathname;
      const { locales, defaultLocale } = settings.i18n;
      let locale = url2locale(pathname, settings.contextPath, locales);
      if (!locale) {
        locale = get(state, 'i18n.locale')
      }
      if (!locale) {
        locale = localStorage.getItem('onekijs.locale') || defaultLocale;
        set(state, 'i18n.locale', locale);
      }
      return locale;
    }
  }
}