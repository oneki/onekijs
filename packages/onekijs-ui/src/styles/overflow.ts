import { cssProperty } from '../utils/style';
import { Property } from 'csstype';

// auto; hidden; visible; scroll;
export const overflow = cssProperty<Property.Overflow>('overflow');

export const overflowBlock = cssProperty<Property.OverflowBlock>('overflow-block');

export const overflowInline = cssProperty<Property.OverflowInline>('overflow-inline');

// auto; hidden; visible; scroll;
export const overflowX = cssProperty<Property.OverflowX>('overflow-x');

// auto; hidden; visible; scroll;
export const overflowY = cssProperty<Property.OverflowY>('overflow-y');
