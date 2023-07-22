import { Property } from 'csstype';
import { cssProperty } from '../utils/style';

export const breakAfter = cssProperty<Property.BreakAfter>('break-after');

export const breakBefore = cssProperty<Property.BreakBefore>('break-before');

export const breakInside = cssProperty<Property.BreakInside>('break-inside');

export const orphans = cssProperty<Property.Orphans>('orphans');

export const widows = cssProperty<Property.Widows>('widows');
