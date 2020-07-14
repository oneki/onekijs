import { css } from 'styled-components';
import { cssProperty } from '../utils/style';

// row; row-reverse; column; column-reverse
export const container = value => {
  let result = ['width: 100%'];
  ['sm', 'md', 'lg', 'xl'].forEach(media => {
    result.concat(css`
      ${props => `@media (min-width: ${props.theme.breakpoints[media]}) {
        max-width: ${props.theme.breakpoints[media]};
      }`}
    `);
  });
};

// border-box; content-box;
export const boxSizing = (value, variants = {}) => {
  return cssProperty('box-sizing', null, value, variants);
};

// none; block; flow-root; inline-block; inline; flex; inline-flex; grid;
// inline-grid; table; table-caption; table-cell; table-column;
// table-column-group; table-footer-group; table-header-group; table-row;
export const display = (value, variants = {}) => {
  return cssProperty('display', null, value, variants);
};

// right; left; none;
export const float = (value, variants = {}) => {
  return cssProperty('float', null, value, variants);
};

// left; right; both; none;
export const clear = (value, variants = {}) => {
  return cssProperty('clear', null, value, variants);
};

// contain; cover; fill; none; scale-down;
export const objectFit = (value, variants = {}) => {
  return cssProperty('object-fit', null, value, variants);
};

// bottom; center; left; right; top; left-bottom; right-bottom; left-top; right-top;
export const objectPosition = (value, variants = {}) => {
  return cssProperty(
    'object-position',
    objectPositionFormatter,
    value,
    variants
  );
};

// auto; hidden; visible; scroll;
export const overflow = (value, variants = {}) => {
  return cssProperty('overflow', null, value, variants);
};

// auto; hidden; visible; scroll;
export const overflowX = (value, variants = {}) => {
  return cssProperty('overflow-x', null, value, variants);
};

// auto; hidden; visible; scroll;
export const overflowY = (value, variants = {}) => {
  return cssProperty('overflow-x', null, value, variants);
};

// static; fixed; absolute; relative; sticky;
export const position = (value, variants = {}) => {
  return cssProperty('position', null, value, variants);
};

// integer
export const top = (value, variants = {}) => {
  return cssProperty('top', null, value, variants);
};

// integer
export const bottom = (value, variants = {}) => {
  return cssProperty('bottom', null, value, variants);
};

// integer
export const right = (value, variants = {}) => {
  return cssProperty('right', null, value, variants);
};

// integer
export const left = (value, variants = {}) => {
  return cssProperty('left', null, value, variants);
};

// boolean
export const visibility = (value, variants = {}) => {
  return cssProperty('visibility', visibleFormatter, value, variants);
};

// auto or integer
export const zIndex = (value, variants = {}) => {
  return cssProperty('z-index', null, value, variants);
};

const objectPositionValues = {
  'left-bottom': 'left bottom',
  'right-bottom': 'right bottom',
  'left-top': 'left top',
  'right-top': 'right top',
};

['bottom', 'center', 'left', 'right', 'top'].forEach(
  p => (objectPositionValues[p] = p)
);

const objectPositionFormatter = value => objectPositionValues[value];

const visibleValues = {
  true: 'visible',
  false: 'hidden',
};

const visibleFormatter = value => visibleValues[value];
