import { get } from 'onekijs-core';
export const booleanFormatter = value => (value ? '1' : '0');

export const themeFormatter = category => {
  return (value, theme) => {
    return get(theme, `${category}.${value}`, value);
  };
};
