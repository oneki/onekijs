import { AppSettings } from '../types/app';
import { AnonymousObject } from '../types/object';
import { Location } from '../types/router';
import { localeNoPathSymbol } from '../types/symbol';
import { isBrowser } from './browser';
import { get } from './object';
import { indexedLocales, isLocaleDomain, isLocalePath } from './settings';

export function detectLocale(
  location: Location,
  reduxLocale: string,
  settings?: AppSettings,
  initialLocale?: string,
): string | undefined {
  // 1. return the initialLocale if present
  if (initialLocale) return initialLocale;
  let locale: string | undefined;
  // 2. Detect locale via the URL
  if (!locale && location && settings) {
    const locales = indexedLocales(settings);
    const defaultLocale = settings.i18n.defaultLocale;
    if (isLocalePath(settings)) {
      if (location.pathlocale && locales[location.pathlocale]) {
        return locales[location.pathlocale];
      }
      if (!location.pathlocale) {
        return locales[localeNoPathSymbol];
      }
      return defaultLocale;
    } else if (location.hostname && isLocaleDomain(settings)) {
      return locales[location.hostname] || defaultLocale;
    }
  }

  // 3. Detect locale via the redux store
  if (!locale) {
    locale = reduxLocale;
  }

  // 4. Detect locale via the browser preferences
  if (!locale && isBrowser()) {
    locale = localStorage.getItem('onekijs.locale') || undefined;
    if (!locale) {
      const languages = navigator.languages;
      if (languages && languages.length > 0 && settings) {
        locale = languages.find((language) => indexedLocales(settings)[language.slice(0, 2)]);
        if (locale) return locale.slice(0, 2);
      } else if (navigator.language) locale = navigator.language.slice(0, 2);
      else if ((navigator as any).userLanguage) locale = (navigator as any).userLanguage.slice(0, 2);
    }
  }
  if (locale && settings && indexedLocales(settings)[locale]) {
    return locale;
  }

  // 5. If no locale found, return the default locale
  return get(settings, 'i18n.defaultLocale');
}

export const flattenTranslations = (
  translations: AnonymousObject<AnonymousObject<string>>,
): AnonymousObject<string> => {
  /* Example:
  Input:
  {
    "product": {
      "key": "value"
    },
    "common": {
      "key1": "value1"
    }
  }

  Output:
  {
    "product:key": "value",
    "common:key1": "value1"
  }
  */
  const result: AnonymousObject = {};
  Object.keys(translations).forEach((ns) => {
    Object.keys(translations[ns]).reduce((accumulator, key) => {
      accumulator[`${ns}:${key}`] = translations[ns][key];
      return accumulator;
    }, result);
  });
  return result;
};
