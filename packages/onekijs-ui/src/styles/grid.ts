import {
  ColumnCountProperty,
  ColumnFillProperty,
  ColumnRuleColorProperty,
  ColumnRuleProperty,
  ColumnRuleStyleProperty,
  ColumnRuleWidthProperty,
  ColumnSpanProperty,
  ColumnsProperty,
  ColumnWidthProperty,
  GridAutoColumnsProperty,
  GridAutoFlowProperty,
  GridAutoRowsProperty,
  GridColumnEndProperty,
  GridColumnProperty,
  GridColumnStartProperty,
  GridProperty,
  GridRowEndProperty,
  GridRowProperty,
  GridRowStartProperty,
  GridTemplateAreasProperty,
  GridTemplateColumnsProperty,
  GridTemplateProperty,
  GridTemplateRowsProperty,
} from 'csstype';
import { colorFormatter, pxFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import { columnGap, gap, rowGap } from './alignment';
import { ColorPropertyTheme, TLength } from './typings';

export const columnCount = cssProperty<ColumnCountProperty>('column-count');

export const columnFill = cssProperty<ColumnFillProperty>('column-fill');

export const columnRule = cssProperty<ColumnRuleProperty<TLength>>('column-rule');

export const columnRuleColor = cssProperty<ColorPropertyTheme | ColumnRuleColorProperty>(
  null,
  colorFormatter('column-rule-color'),
);

export const columnRuleStyle = cssProperty<ColumnRuleStyleProperty>('column-rule-style');

export const columnRuleWidth = cssProperty<ColumnRuleWidthProperty<TLength>>('column-rule-width', pxFormatter);

export const columnSpan = cssProperty<ColumnSpanProperty>('column-span');

export const columnWidth = cssProperty<ColumnWidthProperty<TLength>>('column-width', pxFormatter);

export const columns = cssProperty<ColumnsProperty<TLength>>('columns');

export const grid = cssProperty<GridProperty>('grid');

export const gridAutoColumns = cssProperty<GridAutoColumnsProperty<TLength>>('grid-auto-columns');

export const gridAutoFlow = cssProperty<GridAutoFlowProperty>('grid-auto-flow');

export const gridAutoRows = cssProperty<GridAutoRowsProperty<TLength>>('grid-auto-rows');

export const gridColumn = cssProperty<GridColumnProperty>('grid-column');

export const gridColumnEnd = cssProperty<GridColumnEndProperty>('grid-column-start');

export const gridColumnGap = columnGap;

export const gridColumnStart = cssProperty<GridColumnStartProperty>('grid-column-start');

export const gridGap = gap;

export const gridRow = cssProperty<GridRowProperty>('grid-row');

export const gridRowEnd = cssProperty<GridRowEndProperty>('grid-row-end');

export const gridRowGap = rowGap;

export const gridRowStart = cssProperty<GridRowStartProperty>('grid-row-start');

export const gridTemplate = cssProperty<GridTemplateProperty>('grid-template');

export const gridTemplateAreas = cssProperty<GridTemplateAreasProperty>('grid-template-areas');

export const gridTemplateColumns = cssProperty<GridTemplateColumnsProperty<TLength>>('grid-template-columns');

export const gridTemplateRows = cssProperty<GridTemplateRowsProperty<TLength>>('grid-template-rows');
