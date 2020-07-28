import {
  GapProperty,
  GridAutoFlowProperty,
  GridColumnEndProperty,
  GridColumnProperty,
  GridColumnStartProperty,
  GridRowEndProperty,
  GridRowProperty,
  GridRowStartProperty,
  GridTemplateColumnsProperty,
  GridTemplateRowsProperty,
} from 'csstype';
import { themeFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import { Spacing, TLength } from './typings';

// none or number
export const gridTemplateColumns = cssProperty<GridTemplateColumnsProperty<TLength>>('grid-template-columns');

// auto or number
export const gridColumn = cssProperty<GridColumnProperty>('grid-column');

// auto or number
export const gridColumnStart = cssProperty<GridColumnStartProperty>('grid-column-start');

// auto or number
export const gridColumnEnd = cssProperty<GridColumnEndProperty>('grid-column-start');

// none or number
export const gridTemplateRows = cssProperty<GridTemplateRowsProperty<TLength>>('grid-template-rows');

// auto or number
export const gridRow = cssProperty<GridRowProperty>('grid-row');

// auto or number
export const gridRowStart = cssProperty<GridRowStartProperty>('grid-row-start');

// auto or number
export const gridRowEnd = cssProperty<GridRowEndProperty>('grid-row-end');

// theme.spacings
export const gap = cssProperty<GapProperty<TLength> | Spacing>('gap', themeFormatter('spacings'));

// row; colum; row dense; column dense;
export const gridAutoFlow = cssProperty<GridAutoFlowProperty>('grid-auto-flow');
