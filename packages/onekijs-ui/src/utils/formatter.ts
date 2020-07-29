import { AnonymousObject, get } from 'onekijs';
import { Formatter } from '../styles/typings';
import { hexToRgb } from './color';

export const booleanFormatter: Formatter<boolean> = (value): '0' | '1' => (value ? '1' : '0');

export const themeFormatter = (category: string): Formatter<string | number> => {
  return (value, theme) => {
    return get(theme, `${category}.${value}`, String(value));
  };
};

export const colorFormatter = (key: string, opacityKey?: string): Formatter<string> => {
  return (value, theme) => {
    if (Object.keys(theme.kind).includes(value)) {
      value = theme.kind[value];
    }
    let result = '';
    value = get(theme, `colors.${value}`, String(value));
    if (opacityKey) {
      result = `--${opacityKey}: 1;`;
    }
    result = `${result}${key}: ${value}`;
    if (opacityKey) {
      const rgb = hexToRgb(value);
      if (rgb) {
        result = `${result};${key}: rgba(${rgb.r},${rgb.g},${rgb.b},var(--${opacityKey}))`;
      }
    }
    result += ';';

    return result;
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

export const pxFormatter: Formatter<string | number> = (value) => {
  if (typeof value === 'string') {
    return value;
  }
  if (value === 0) {
    return '0';
  }
  return `${value}px`;
};
