import { cssProperty } from '../utils/style';

export const color = (color, variants = {}) => {
  return cssProperty('color', 'colors', color, variants);
};

export const fontWeight = (weight, variants = {}) => {
  return cssProperty('font-weight', 'weights', weight, variants);
};
