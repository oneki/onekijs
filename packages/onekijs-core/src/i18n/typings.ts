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
