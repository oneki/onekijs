import React from 'react';
import I18nService from './I18nService';
import { Collection, AnonymousObject } from '../core/typings';
import { get, isNull } from '../core/utils/object';
import { AppSettings, Location } from '../app/typings';
import { parseJsx } from '../core/utils/jsx';
import { isBrowser } from '../core/utils/browser';
import BasicError from '../core/BasicError';
import AppContext from '../app/AppContext';
import { toLocation } from '../core/utils/url';

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
    locale = settings.i18n.localeFromLocation(location, settings);
  }
  if (!locale) {
    locale = reduxLocale;
  }
  if (!locale && isBrowser()) {
    locale = localStorage.getItem('onekijs.locale') || undefined;
    if (!locale) {
      const languages = navigator.languages;
      if (languages && languages.length > 0 && settings) {
        locale = languages.find((language) => settings.i18n.locales.includes(language.slice(0, 2)));
        if (locale) return locale.slice(0, 2);
      } else if (navigator.language) locale = navigator.language.slice(0, 2);
      else if ((navigator as any).userLanguage) locale = (navigator as any).userLanguage.slice(0, 2);
    }
  }
  if (locale && settings && get<string[]>(settings, 'i18n.locales', []).includes(locale)) {
    return locale;
  }
  return get<string>(settings, 'i18n.defaultLocale');
}

export const flattenTranslations = (translations: Collection<Collection<string>>): Collection<string> => {
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

export const toI18nLocation = (urlOrLocation: string | Location, { i18n, settings }: AppContext): Location => {
  // TODO
  let location: Location;
  if (typeof urlOrLocation === 'string') {
    location = toLocation(urlOrLocation);
  } else {
    location = urlOrLocation;
  }
  if (settings && i18n.locale) {
    location = settings.i18n.addLocaleToLocation(i18n.locale, location, settings);
  }
  return location;
};
