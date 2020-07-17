import { cssProperty } from '../utils/style';
import { themeFormatter } from '../utils/formatter';

export const padding = (spacing, variants = {}) => {
  return cssProperty('padding', themeFormatter('spacings'), spacing, variants);
};

export const paddingY = (spacing, variants = {}) => {
  return cssProperty(
    'padding-top',
    themeFormatter('spacings'),
    spacing,
    variants
  ).concat(
    cssProperty('padding-bottom', themeFormatter('spacings'), spacing, variants)
  );
};

export const paddingX = (spacing, variants = {}) => {
  return cssProperty(
    'padding-left',
    themeFormatter('spacings'),
    spacing,
    variants
  ).concat(
    cssProperty('padding-right', themeFormatter('spacings'), spacing, variants)
  );
};

export const paddingLeft = (spacing, variants = {}) => {
  return cssProperty(
    'padding-left',
    themeFormatter('spacings'),
    spacing,
    variants
  );
};

export const paddingRight = (spacing, variants = {}) => {
  return cssProperty(
    'padding-right',
    themeFormatter('spacings'),
    spacing,
    variants
  );
};

export const paddingTop = (spacing, variants = {}) => {
  return cssProperty(
    'padding-top',
    themeFormatter('spacings'),
    spacing,
    variants
  );
};

export const paddingBottom = (spacing, variants = {}) => {
  return cssProperty(
    'padding-bottom',
    themeFormatter('spacings'),
    spacing,
    variants
  );
};

export const margin = (spacing, variants = {}) => {
  return cssProperty('margin', themeFormatter('spacings'), spacing, variants);
};

export const marginY = (spacing, variants = {}) => {
  return cssProperty(
    'margin-top',
    themeFormatter('spacings'),
    spacing,
    variants
  ).concat(
    cssProperty('margin-bottom', themeFormatter('spacings'), spacing, variants)
  );
};

export const marginX = (spacing, variants = {}) => {
  return cssProperty(
    'margin-left',
    themeFormatter('spacings'),
    spacing,
    variants
  ).concat(
    cssProperty('margin-right', themeFormatter('spacings'), spacing, variants)
  );
};

export const marginLeft = (spacing, variants = {}) => {
  return cssProperty(
    'margin-left',
    themeFormatter('spacings'),
    spacing,
    variants
  );
};

export const marginRight = (spacing, variants = {}) => {
  return cssProperty(
    'margin-right',
    themeFormatter('spacings'),
    spacing,
    variants
  );
};

export const marginTop = (spacing, variants = {}) => {
  return cssProperty(
    'margin-top',
    themeFormatter('spacings'),
    spacing,
    variants
  );
};

export const marginBottom = (spacing, variants = {}) => {
  return cssProperty(
    'margin-bottom',
    themeFormatter('spacings'),
    spacing,
    variants
  );
};
