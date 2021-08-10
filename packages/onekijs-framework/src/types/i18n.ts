import { AnonymousObject } from './object';

export interface I18n {
  translations?: AnonymousObject;
  ns?: string[];
  locale?: string;
}
