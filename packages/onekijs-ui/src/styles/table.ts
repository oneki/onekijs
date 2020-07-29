import {
  BorderCollapseProperty,
  BorderSpacingProperty,
  CaptionSideProperty,
  EmptyCellsProperty,
  TableLayoutProperty,
  VerticalAlignProperty,
} from 'csstype';
import { pxFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import { TLength } from './typings';

export const borderCollapse = cssProperty<BorderCollapseProperty>('border-collapse');

export const borderSpacing = cssProperty<BorderSpacingProperty<TLength>>('border-spacing', pxFormatter);

export const captionSide = cssProperty<CaptionSideProperty>('caption-side');

export const emptyCells = cssProperty<EmptyCellsProperty>('empty-cells');

export const tableLayout = cssProperty<TableLayoutProperty>('table-layout');

export const verticalAlign = cssProperty<VerticalAlignProperty<TLength>>('vertical-align');
