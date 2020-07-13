import { css } from 'styled-components';
import { cssProperty } from '../utils/style';

export const padding = (spacing, variants = {}) => {
  return cssProperty('padding', 'spacings', spacing, variants);
};

export const paddingY = (spacing, variants = {}) => {
  return cssProperty('padding-top', 'spacings', spacing, variants).concat(
    cssProperty('padding-bottom', 'spacings', spacing, variants)
  );
};

export const paddingX = (spacing, variants = {}) => {
  return cssProperty('padding-left', 'spacings', spacing, variants).concat(
    cssProperty('padding-right', 'spacings', spacing, variants)
  );
};

export const paddingLeft = (spacing, variants = {}) => {
  return cssProperty('padding-left', 'spacings', spacing, variants);
};

export const paddingRight = (spacing, variants = {}) => {
  return cssProperty('padding-right', 'spacings', spacing, variants);
};

export const paddingTop = (spacing, variants = {}) => {
  return cssProperty('padding-top', 'spacings', spacing, variants);
};

export const paddingBottom = (spacing, variants = {}) => {
  return cssProperty('padding-bottom', 'spacings', spacing, variants);
};
