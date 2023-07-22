import { cssProperty } from '../utils/style';
import { Property } from 'csstype';
import { ColorPropertyTheme, TLength } from './typings';
import { colorFormatter } from '../utils/formatter';

export const fill = cssProperty<Property.Fill>(null, colorFormatter('fill'));

export const stroke = cssProperty<ColorPropertyTheme | Property.Stroke>(null, colorFormatter('stroke'));

export const strokeWidth = cssProperty<Property.StrokeWidth<TLength>>('stroke-width');
