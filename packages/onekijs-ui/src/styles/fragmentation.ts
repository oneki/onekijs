import { BreakAfterProperty, BreakBeforeProperty, BreakInsideProperty, GlobalsNumber } from 'csstype';
import { cssProperty } from '../utils/style';

export const breakAfter = cssProperty<BreakAfterProperty>('break-after');

export const breakBefore = cssProperty<BreakBeforeProperty>('break-before');

export const breakInside = cssProperty<BreakInsideProperty>('break-inside');

export const orphans = cssProperty<GlobalsNumber>('orphans');

export const widows = cssProperty<GlobalsNumber>('widows');
