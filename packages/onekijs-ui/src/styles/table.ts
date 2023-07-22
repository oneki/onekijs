import { Property } from 'csstype';
import { pxFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import { TLength } from './typings';

export const borderCollapse = cssProperty<Property.BorderCollapse>('border-collapse');

export const borderSpacing = cssProperty<Property.BorderSpacing<TLength>>('border-spacing', pxFormatter);

export const captionSide = cssProperty<Property.CaptionSide>('caption-side');

export const emptyCells = cssProperty<Property.EmptyCells>('empty-cells');

export const tableLayout = cssProperty<Property.TableLayout>('table-layout');

export const verticalAlign = cssProperty<Property.VerticalAlign<TLength>>('vertical-align');
