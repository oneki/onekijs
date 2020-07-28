import { AnonymousObject, get } from 'onekijs';
import { Formatter } from '../styles/typings';

export const booleanFormatter: Formatter<boolean> = (value): '0' | '1' => (value ? '1' : '0');

export const themeFormatter = (category: string): Formatter<string | number> => {
  return (value, theme) => {
    return get(theme, `${category}.${value}`, String(value));
  };
};

export const enumFormatter = <T>(values: AnonymousObject): Formatter<T> => {
  return (value) => {
    if (Object.keys(values).includes(String(value))) {
      return String(values[String(value)]);
    }
    return String(value);
  };
};
