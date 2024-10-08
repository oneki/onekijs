import { AnonymousObject, get } from 'onekijs-framework';
import { ColorPropertyTheme, Formatter } from '../styles/typings';
import { applyOpacity } from './color';

export const booleanFormatter: Formatter<boolean> = (value): '0' | '1' => (value ? '1' : '0');

export const themeFormatter = (category: string): Formatter<string | number> => {
  return (value, theme) => {
    return get<any>(theme, `${category}.${value}`, String(value));
  };
};

export const colorFormatter = (key: string, opacityKey?: string): Formatter<string> => {
  return (value, theme) => {
    if (Object.keys(theme.colors).includes(value)) {
      value = theme.colors[value as ColorPropertyTheme];
    }
    let result = '';
    value = get(theme, `palette.colors.${value}`, String(value));
    if (opacityKey) {
      result = `--${opacityKey}: 1;`;
    }
    result = `${result}${key}: ${value}`;
    if (opacityKey) {
      result = `${result};${key}: ${applyOpacity(value, `var(--${opacityKey})`)}`;
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



export const escapeCsvValue = (value: any, separator = ','): string => {
  const escape = (value: any): string => {
    if (Array.isArray(value)) {
      return value.map((v) => escape(v)).join(',');
    }
    if (value === null || value === undefined) return '';
    return `${value}`;
  }

  const result = escape(value);
  if (result.startsWith('"') && result.endsWith('"')) return result;  // the string is already escaped
  // escape only if the string contains the separator
  if (result.includes(separator)) {
    return `"${result.replace(/"/g, '""')}"`
  }
  return result;
}

export const pxFormatter: Formatter<string | number> = (value) => {
  if (typeof value === 'string') {
    return value;
  }
  if (value === 0) {
    return '0';
  }
  return `${value}px`;
};
