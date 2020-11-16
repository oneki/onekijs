import { AnonymousObject } from '../core/typings';

export interface I18n {
  translations?: AnonymousObject;
  ns?: string[];
  locale?: string;
}

export interface TranslationProps {
  alias?: string;
  count?: number;
}

export interface I18nSettings {
  locales: (I18nLocalePath | I18nLocaleDomain)[];
  defaultLocale?: string;
  translationEndpoint: string;
}

export interface I18nLocale {
  locale: string;
}

export interface I18nLocalePath extends I18nLocale {
  path?: string;
}

export interface I18nLocaleDomain extends I18nLocale {
  domain: string;
}
