import { cssProperty } from '../utils/style';
import { booleanFormatter } from '../utils/formatter';

// row; row-reverse; column; column-reverse
export const flexDirection = (value, variants = {}) => {
  return cssProperty('flex-direction', null, value, variants);
};

// nowrap; wrap; wrap-reverse;
export const flexWrap = (value, variants = {}) => {
  return cssProperty('flex-wrap', null, value, variants);
};

// stretch; flex-start; center; flex-end; baseline;
export const alignItems = (value, variants = {}) => {
  return cssProperty('align-items', null, value, variants);
};

// flex-start; center; flex-end; space-between; space-around;
export const alignContent = (value, variants = {}) => {
  return cssProperty('align-content', null, value, variants);
};

// auto; flex-start; center; flex-end; stretch;
export const alignSelf = (value, variants = {}) => {
  return cssProperty('align-self', null, value, variants);
};

// flex-start; center; flex-end; space-between; space-around;
export const justifyContent = (value, variants = {}) => {
  return cssProperty('justify-content', null, value, variants);
};

// initial; 1; auto; none;
export const flex = (value, variants = {}) => {
  return cssProperty('flex', flexFormatter, value, variants);
};

// true; false
export const flexGrow = (value, variants = {}) => {
  return cssProperty('flex-grow', booleanFormatter, value, variants);
};

// true; false
export const flexShrink = (value, variants = {}) => {
  return cssProperty('flex-shrink', booleanFormatter, value, variants);
};

// first; last; none; 1; 2; 3; 4; 5; 6; 7; 8; 9; 10; 11; 12
export const order = (value, variants = {}) => {
  return cssProperty('order', orderFormatter, value, variants);
};

const flexValues = {
  initial: '0 1 auto',
  1: '1 1 0%',
  auto: '1 1 auto',
  none: 'none',
};
const flexFormatter = value => flexValues[value];

const orderValues = {
  first: '-9999',
  last: '9999',
  none: '0',
};
for (let i = 1; i <= 12; i++) {
  orderValues[i] = i.toString();
}

const orderFormatter = value => orderValues[value];
