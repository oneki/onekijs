import {
  AlignContentProperty,
  AlignItemsProperty,
  AlignSelfProperty,
  FlexDirectionProperty,
  FlexProperty,
  FlexWrapProperty,
  Globals,
  JustifyContentProperty,
} from 'csstype';
import { booleanFormatter, enumFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import { TLength } from './typings';

// row; row-reverse; column; column-reverse
export const flexDirection = cssProperty<FlexDirectionProperty>('flex-direction');

// nowrap; wrap; wrap-reverse;
export const flexWrap = cssProperty<FlexWrapProperty>('flex-wrap');

// stretch; flex-start; center; flex-end; baseline;
export const alignItems = cssProperty<AlignItemsProperty>('align-items');

// flex-start; center; flex-end; space-between; space-around;
export const alignContent = cssProperty<AlignContentProperty>('align-content');

// auto; flex-start; center; flex-end; stretch;
export const alignSelf = cssProperty<AlignSelfProperty>('align-self');

// flex-start; center; flex-end; space-between; space-around;
export const justifyContent = cssProperty<JustifyContentProperty>('justify-content');

// initial; 1; auto; none;
const flexValues = {
  initial: '0 1 auto',
  1: '1 1 0%',
  auto: '1 1 auto',
  none: 'none',
};
const flexFormatter = enumFormatter<FlexProperty<TLength>>(flexValues);
export const flex = cssProperty<FlexProperty<TLength>>('flex', flexFormatter);

// true; false
export const flexGrow = cssProperty<boolean>('flex-grow', booleanFormatter);

// true; false
export const flexShrink = cssProperty<boolean>('flex-shrink', booleanFormatter);

// first; last; none; 1; 2; 3; 4; 5; 6; 7; 8; 9; 10; 11; 12
const orderValues = {
  first: '-9999',
  last: '9999',
  none: '0',
};
const orderFormatter = enumFormatter<Globals | number | 'first' | 'last' | 'none'>(orderValues);
export const order = cssProperty<Globals | number | 'first' | 'last' | 'none'>('order', orderFormatter);
