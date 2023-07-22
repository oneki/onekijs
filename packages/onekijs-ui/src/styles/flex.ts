import { Property, Globals } from 'csstype';
import { enumFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import { TLength } from './typings';

// initial; 1; auto; none;
const flexValues = {
  initial: '0 1 auto',
  1: '1 1 0%',
  auto: '1 1 auto',
  none: 'none',
};
const flexFormatter = enumFormatter<Property.Flex<TLength>>(flexValues);
export const flex = cssProperty<Property.Flex<TLength>>('flex', flexFormatter);

// row; row-reverse; column; column-reverse
export const flexBasis = cssProperty<Property.FlexBasis<TLength>>('flex-basic');

// row; row-reverse; column; column-reverse
export const flexDirection = cssProperty<Property.FlexDirection>('flex-direction');

// true; false
export const flexGrow = cssProperty<number>('flex-grow');

// true; false
export const flexShrink = cssProperty<number>('flex-shrink');

// nowrap; wrap; wrap-reverse;
export const flexWrap = cssProperty<Property.FlexWrap>('flex-wrap');

// first; last; none; 1; 2; 3; 4; 5; 6; 7; 8; 9; 10; 11; 12
const orderValues = {
  first: '-9999',
  last: '9999',
  none: '0',
};
const orderFormatter = enumFormatter<Globals | number | 'first' | 'last' | 'none'>(orderValues);
export const order = cssProperty<Globals | number | 'first' | 'last' | 'none'>('order', orderFormatter);
