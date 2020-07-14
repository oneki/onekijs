import { cssProperty } from '../utils/style';

export const backgroundColor = (color, variants = {}) => {
  return cssProperty('background-color', 'colors', color, variants);
};
