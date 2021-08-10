import { cssProperty } from '../utils/style';
import { FillProperty, StrokeProperty, StrokeWidthProperty } from 'csstype';
import { ColorPropertyTheme, TLength } from './typings';
import { colorFormatter } from '../utils/formatter';

export const fill = cssProperty<FillProperty>('fill');

export const stroke = cssProperty<ColorPropertyTheme | StrokeProperty>(null, colorFormatter('stroke'));

export const strokeWidth = cssProperty<StrokeWidthProperty<TLength>>('stroke-width');
