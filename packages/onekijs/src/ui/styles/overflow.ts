import { cssProperty } from '../utils/style';
import {
  OverflowProperty,
  OverflowXProperty,
  OverflowYProperty,
  OverflowBlockProperty,
  OverflowInlineProperty,
} from 'csstype';

// auto; hidden; visible; scroll;
export const overflow = cssProperty<OverflowProperty>('overflow');

export const overflowBlock = cssProperty<OverflowBlockProperty>('overflow-block');

export const overflowInline = cssProperty<OverflowInlineProperty>('overflow-inline');

// auto; hidden; visible; scroll;
export const overflowX = cssProperty<OverflowXProperty>('overflow-x');

// auto; hidden; visible; scroll;
export const overflowY = cssProperty<OverflowYProperty>('overflow-y');
