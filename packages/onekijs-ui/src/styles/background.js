import { cssProperty } from '../utils/style';
import { themeFormatter } from '../utils/formatter';

export const backgroundColor = (color, variants = {}) => {
  return cssProperty(
    'background-color',
    themeFormatter('colors'),
    color,
    variants
  );
};
