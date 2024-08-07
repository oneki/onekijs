import { AppSettings } from '../types/app';
import { indexedLocalesSymbol, localesModeSymbol } from '../types/symbol';

export const isLocalePath = (settings: AppSettings): boolean => {
  return settings.i18n && settings.i18n[indexedLocalesSymbol][localesModeSymbol] === 'path';
};

export const isLocaleSimple = (settings: AppSettings): boolean => {
  return settings.i18n && settings.i18n[indexedLocalesSymbol][localesModeSymbol] === 'simple';
};

export const isLocaleDomain = (settings: AppSettings): boolean => {
  return settings.i18n && settings.i18n[indexedLocalesSymbol][localesModeSymbol] === 'domain';
};

export const indexedLocales = (settings: AppSettings): any => {
  return settings.i18n && settings.i18n[indexedLocalesSymbol];
};
