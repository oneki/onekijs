import { cssProperty } from '../utils/style';
import { FillProperty, StrokeProperty, StrokeWidthProperty } from 'csstype';
import { TLength } from './typings';

export const fill = cssProperty<FillProperty>('fill');

export const stroke = cssProperty<StrokeProperty>('stroke');

export const strokeWidth = cssProperty<StrokeWidthProperty<TLength>>('stroke-width');
