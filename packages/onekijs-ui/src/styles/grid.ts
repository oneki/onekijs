import { Property } from 'csstype';
import { colorFormatter, pxFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import { columnGap, gap, rowGap } from './alignment';
import { ColorPropertyTheme, TLength } from './typings';

export const columnCount = cssProperty<Property.ColumnCount>('column-count');

export const columnFill = cssProperty<Property.ColumnFill>('column-fill');

export const columnRule = cssProperty<Property.ColumnRule<TLength>>('column-rule');

export const columnRuleColor = cssProperty<ColorPropertyTheme | Property.ColumnRuleColor>(
  null,
  colorFormatter('column-rule-color'),
);

export const columnRuleStyle = cssProperty<Property.ColumnRuleStyle>('column-rule-style');

export const columnRuleWidth = cssProperty<Property.ColumnRuleWidth<TLength>>('column-rule-width', pxFormatter);

export const columnSpan = cssProperty<Property.ColumnSpan>('column-span');

export const columnWidth = cssProperty<Property.ColumnWidth<TLength>>('column-width', pxFormatter);

export const columns = cssProperty<Property.Columns<TLength>>('columns');

export const grid = cssProperty<Property.Grid>('grid');

export const gridAutoColumns = cssProperty<Property.GridAutoColumns<TLength>>('grid-auto-columns');

export const gridAutoFlow = cssProperty<Property.GridAutoFlow>('grid-auto-flow');

export const gridAutoRows = cssProperty<Property.GridAutoRows<TLength>>('grid-auto-rows');

export const gridColumn = cssProperty<Property.GridColumn>('grid-column');

export const gridColumnEnd = cssProperty<Property.GridColumnEnd>('grid-column-start');

export const gridColumnGap = columnGap;

export const gridColumnStart = cssProperty<Property.GridColumnStart>('grid-column-start');

export const gridGap = gap;

export const gridRow = cssProperty<Property.GridRow>('grid-row');

export const gridRowEnd = cssProperty<Property.GridRowEnd>('grid-row-end');

export const gridRowGap = rowGap;

export const gridRowStart = cssProperty<Property.GridRowStart>('grid-row-start');

export const gridTemplate = cssProperty<Property.GridTemplate>('grid-template');

export const gridTemplateAreas = cssProperty<Property.GridTemplateAreas>('grid-template-areas');

export const gridTemplateColumns = cssProperty<Property.GridTemplateColumns<TLength>>('grid-template-columns');

export const gridTemplateRows = cssProperty<Property.GridTemplateRows<TLength>>('grid-template-rows');
