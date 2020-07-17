import { cssProperty } from '../utils/style';
import { themeFormatter } from '../utils/formatter';

export const fontFamily = (value, variants = {}) => {
  return cssProperty(
    'font-family',
    themeFormatter('font.families'),
    value,
    variants
  );
};

export const fontSize = (value, variants = {}) => {
  return cssProperty(
    'font-size',
    themeFormatter('font.sizes'),
    value,
    variants
  );
};

// normal; italic; oblique; oblique XXdeg;
export const fontStyle = (value, variants = {}) => {
  return cssProperty('font-style', null, value, variants);
};

export const fontWeight = (value, variants = {}) => {
  return cssProperty(
    'font-weight',
    themeFormatter('font.weights'),
    value,
    variants
  );
};

export const letterSpacing = (value, variants = {}) => {
  return cssProperty(
    'letter-spacing',
    themeFormatter('font.spacings'),
    value,
    variants
  );
};

export const lineHeight = (value, variants = {}) => {
  return cssProperty(
    'line-height',
    themeFormatter('font.lineHeights'),
    value,
    variants
  );
};

// disc; circle; square; decimal; georgian; cjk-ideographic; kannada; any string
export const listStyleType = (value, variants = {}) => {
  return cssProperty('line-style-type', null, value, variants);
};

// inside; outside
export const listStylePosition = (value, variants = {}) => {
  return cssProperty('line-style-position', null, value, variants);
};

// left; center; right; justify
export const textAlign = (value, variants = {}) => {
  return cssProperty('text-align', null, value, variants);
};

export const color = (value, variants = {}) => {
  return cssProperty('color', themeFormatter('colors'), value, variants);
};

// float between 0 and 1
export const textOpacity = (value, variants = {}) => {
  return cssProperty('--text-opacity', null, value, variants);
};

export const textDecoration = (value, variants = {}) => {
  return cssProperty('text-decoration', null, value, variants);
};

export const textTransform = (value, variants = {}) => {
  return cssProperty('text-transform', null, value, variants);
};

export const verticalAlign = (value, variants = {}) => {
  return cssProperty('vertical-align', null, value, variants);
};

export const whiteSpace = (value, variants = {}) => {
  return cssProperty('white-space', null, value, variants);
};

// normal; words; all; truncate
export const wordBreak = (value, variants = {}) => {
  if (value === 'normal') {
    return cssProperty(null, wordBreakFormatter, value, variants);
  }
};

const wordBreakFormatter = value => {
  if (value === 'normal') {
    return 'word-break: normal;overflow-wrap: normal';
  }
  if (value === 'words') {
    return 'overflow-wrap: break-word';
  }
  if (value === 'all') {
    return 'word-break: break-all';
  }
  if (value === 'truncate') {
    return 'overflow: hidden;text-overflow: ellipsis;white-space: nowrap';
  }
  return `word-break: ${value}`;
};
