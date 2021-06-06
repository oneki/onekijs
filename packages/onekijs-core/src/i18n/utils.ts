import React from 'react';
import DefaultBasicError from '../core/BasicError';
import { isBrowser } from '../utils/browser';
import { parseJsx } from '../utils/jsx';
import { get, isNull } from '../utils/object';
import { rebuildLocation, toLocation } from '../router/utils';
import I18nService from './I18nService';
import { I18n, I18nLocaleDomain, I18nLocalePath } from './typings';
import { AnonymousObject } from '../typings/object';
import { AppSettings } from '../typings/app';
import { indexedLocales, isLocaleDomain, isLocalePath } from '../utils/settings';
import { Location } from '../typings/router';
import { localeNoPathSymbol } from '../typings/symbol';

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
        throw new DefaultBasicError(`No filter named ${modifierNoArgs} found in settings`);
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
  location: string | Location,
  settings: AppSettings,
  i18n: I18n,
  locale: string | false | undefined,
): Location => {
  const nextLocation = typeof location === 'string' ? toLocation(location, settings) : location;
  const nextLocale = (locale || i18n.locale) as string;
  if (isLocaleDomain(settings)) {
    nextLocation.hostname = indexedLocales(settings)[nextLocale];
  } else if (isLocalePath(settings)) {
    if (indexedLocales(settings)[nextLocale] !== localeNoPathSymbol) {
      nextLocation.pathlocale = indexedLocales(settings)[nextLocale];
    } else {
      nextLocation.pathlocale = undefined;
    }
  }
  rebuildLocation(nextLocation);
  return nextLocation;
};
