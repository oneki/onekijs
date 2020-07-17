import { cssProperty } from '../utils/style';
import { themeFormatter } from '../utils/formatter';

// none or number
export const gridTemplateColumns = (value, variants = {}) => {
  return cssProperty(
    'grid-template-columns',
    gridTemplateFormatter,
    value,
    variants
  );
};

const gridTemplateFormatter = value =>
  value === 'none' ? 'none' : `repeat(${value}, minmax(0, 1fr))`;

// auto or number
export const gridColumn = (value, variants = {}) => {
  return cssProperty('grid-column', gridSpanFormatter, value, variants);
};

const gridSpanFormatter = value =>
  value === 'auto' ? 'auto' : `span ${value} / span ${value}`;

// auto or number
export const gridColumnStart = (value, variants = {}) => {
  return cssProperty(
    'grid-column-start',
    gridStartEndFormatter,
    value,
    variants
  );
};

const gridStartEndFormatter = value => (value === 'auto' ? 'auto' : `${value}`);

// auto or number
export const gridColumnEnd = (value, variants = {}) => {
  return cssProperty(
    'grid-column-start',
    gridStartEndFormatter,
    value,
    variants
  );
};

// none or number
export const gridTemplateRows = (value, variants = {}) => {
  return cssProperty(
    'grid-template-rows',
    gridTemplateFormatter,
    value,
    variants
  );
};

// auto or number
export const gridRow = (value, variants = {}) => {
  return cssProperty('grid-row', gridSpanFormatter, value, variants);
};

// auto or number
export const gridRowStart = (value, variants = {}) => {
  return cssProperty('grid-row-start', gridStartEndFormatter, value, variants);
};

// auto or number
export const gridRowEnd = (value, variants = {}) => {
  return cssProperty('grid-row-end', gridStartEndFormatter, value, variants);
};

// theme.spacings
export const gap = (value, variants = {}) => {
  return cssProperty('gap', themeFormatter('spacings'), value, variants);
};

// row; colum; row dense; column dense;
export const gridAutoFlow = (value, variants = {}) => {
  return cssProperty('grid-auto-flow', null, value, variants);
};
