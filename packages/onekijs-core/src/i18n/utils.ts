import React from 'react';
import { isLocalePath, indexedLocales, localeNoPathSymbol, defaultLocaleSymbol, isLocaleDomain } from '../app/settings';
import { AppSettings } from '../app/typings';
import BasicError from '../core/BasicError';
import { AnonymousObject } from '../core/typings';
import { isBrowser } from '../core/utils/browser';
import { parseJsx } from '../core/utils/jsx';
import { get, isNull } from '../core/utils/object';
import { Location } from '../router/typings';
import { toLocation } from '../router/utils';
import I18nService from './I18nService';
import { I18n, I18nLocaleDomain, I18nLocalePath } from './typings';

// export const addLocaleToLocation = (locale: string, location: Location, settings: AppSettings): Location => {
//   let pathname = location.pathname;
//   const localeSettings = get<(I18nLocalePath | I18nLocaleDomain)[]>(settings, 'i18n.locales', []).find(
//     (l: I18nLocale) => l.locale === locale,
//   );

//   if (!localeSettings) return location;

//   if (isLocaleDomain(localeSettings)) {
//     location.hostname = localeSettings.domain;
//     location.i18nPathname = location.pathname;
//     return location;
//   } else {
//     if (!localeSettings.path) {
//       location.i18nPathname = location.pathname;
//     }
//     let { contextPath } = settings;
//     contextPath = trimEnd(contextPath, '/');
//     pathname = trimEnd(pathname, '/');
//     if (pathname === '') {
//       // the location doesn't contain any context or locale
//       location.pathname = localeSettings.path || '/';
//     } else {
//       const localePos: number = pathname.startsWith(contextPath) ? contextPath.length : 0;
//       const pathnameNoContext = pathname.substring(localePos);
//       const activeLocale = get<(I18nLocalePath | I18nLocaleDomain)[]>(settings, 'i18n.locales', []).find(
//         (l: I18nLocale) => pathnameNoContext === `/${l.locale}` || pathnameNoContext.startsWith(`/${l.locale}/`),
//       );
//       if (activeLocale) {
//         // TODO replace activeLocale by the new locale
//       } else {
//         // TODO add locale
//       }
//     }

//     if (!contextPath.endsWith('/')) {
//       contextPath += '/';
//     }
//     if (location.pathname) const length = contextPath.endsWith('/') ? contextPath.length : contextPath.length + 1;
//   }

//   // const relativeUrl = toRelativeUrl(location);
//   const hasLocale = settings.i18n.locales.find((l: I18nLocale) => pathname.startsWith(`/${l.locale}`));
//   if (!hasLocale) {
//     location.pathname = `/${locale}${pathname}`;
//     if (location.pathname.endsWith('/')) location.pathname = location.pathname.slice(0, -1);
//   }
//   // if (Object.keys(location).includes('route')) {
//   //   const route = location.route || relativeUrl;
//   //   if (route && !route.startsWith(`/${settings.i18n.slug}`)) {
//   //     location.route = `/${settings.i18n.slug}${route}`;
//   //     if (location.route.endsWith('/')) location.route = location.route.slice(0, -1);
//   //   }
//   // }
//   return location;
// };

export const buildJsx = (
  str: string,
  ctx: AnonymousObject,
  wrapperReactElement: JSX.Element | null,
  i18nService: I18nService,
  locale: string,
): React.FunctionComponentElement<any> | string => {
  const result = {
    str,
  };
  if (ctx.vars) {
    Object.keys(ctx.vars).forEach((key) => {
      const regex = new RegExp(`{{\\s*${key}[^}]*}}`, 'g');
      let m;
      while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        m.forEach((match) => {
          result.str = result.str.replace(
            match,
            handleModifiers(match.slice(0, -2), ctx.vars[key], locale, i18nService),
          );
        });
      }
    });
  }
  str = result.str;
  if (isNull(wrapperReactElement)) return str;
  const children = parseJsx(str, ctx);
  return React.cloneElement(wrapperReactElement as JSX.Element, {}, children);
};

export function detectLocale(
  location: Location,
  reduxLocale: string,
  settings?: AppSettings,
  initialLocale?: string,
): string | undefined {
  let locale = initialLocale;
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
  if (!locale) {
    locale = reduxLocale;
  }
  if (!locale && isBrowser()) {
    locale = localStorage.getItem('onekijs.locale') || undefined;
    if (!locale) {
      const languages = navigator.languages;
      if (languages && languages.length > 0 && settings) {
        locale = languages.find((language) => getLocaleSettings(language.slice(0, 2), settings));
        if (locale) return locale.slice(0, 2);
      } else if (navigator.language) locale = navigator.language.slice(0, 2);
      else if ((navigator as any).userLanguage) locale = (navigator as any).userLanguage.slice(0, 2);
    }
  }
  if (locale && settings && getLocaleSettings(locale, settings)) {
    return locale;
  }
  return get<string>(settings, 'i18n.defaultLocale');
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

export const handleFilterArgs = (filter: string, result: any[]): void => {
  const regexArgs = /\(.*\)/gm;
  let filterArgs;

  while ((filterArgs = regexArgs.exec(filter)) !== null) {
    if (filterArgs.index === regexArgs.lastIndex) {
      regexArgs.lastIndex++;
    }

    filterArgs.forEach((filterArg) => {
      const args = filterArg.slice(1, -1).split(',');
      args.forEach((arg) => {
        arg = arg.trim();
        if (arg.indexOf("'") === 0) arg = `"${arg.slice(1, -1)}"`;
        result.push(JSON.parse(arg));
      });
    });
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handleModifiers = (input: string, value: any, locale: string, i18nService: I18nService): any => {
  const modifiers = input.split('|');
  const args = [value, locale];
  if (modifiers.length > 1) {
    for (let i = 1; i < modifiers.length; i++) {
      const filter = modifiers[i].trim();
      let modifierNoArgs = filter;
      const pos = filter.indexOf('(');
      if (pos > -1) {
        modifierNoArgs = modifierNoArgs.substring(0, pos);
      }
      handleFilterArgs(filter, args);
      if (i18nService.modifiers[modifierNoArgs]) {
        return i18nService.modifiers[modifierNoArgs](...args);
      } else {
        throw new BasicError(`No filter named ${modifierNoArgs} found in settings`);
      }
    }
  }
  return value;
};

export const localeFromLocation = (location: Location, settings: AppSettings): string | undefined => {
  const { contextPath } = settings;
  const length = contextPath.endsWith('/') ? contextPath.length : contextPath.length + 1;
  const urlLocale = location.pathname.substring(length).split('/')[0];
  let defaultLocale: I18nLocalePath | I18nLocaleDomain | undefined;
  let detectedLocale: I18nLocalePath | I18nLocaleDomain | undefined = get(settings, 'i18n.locales', []).find(
    (locale: I18nLocalePath | I18nLocaleDomain) => {
      if ((locale as I18nLocaleDomain).domain === location.hostname) return true;
      if ((locale as I18nLocalePath).path === `/${urlLocale}`) return true;
      if ((locale as I18nLocalePath).path === '') defaultLocale = locale;
      return false;
    },
  );
  if (!detectedLocale) detectedLocale = defaultLocale;
  return detectedLocale?.locale;
};

export const toI18nLocation = (
  urlOrLocation: string | Location,
  { settings, i18n }: { settings: AppSettings; i18n: I18n },
  locale: string | false | undefined,
): Location => {
  // TODO
  let location: Location;
  if (typeof urlOrLocation === 'string') {
    location = toLocation(urlOrLocation, settings);
  } else {
    location = urlOrLocation;
  }

  if (locale === false) return location;
  if (location.hostname !== window.location.hostname) return location;
  if (settings && (locale || i18n.locale)) {
    location = settings.i18n.addLocaleToLocation(locale || i18n.locale, location, settings);
  }
  return location;
};
