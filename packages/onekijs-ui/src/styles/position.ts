import { Property } from 'csstype';
import { cssProperty } from '../utils/style';
import { TLength } from './typings';

// left; right; both; none;
export const clear = cssProperty<Property.Clear>('clear');

// right; left; none;
export const float = cssProperty<Property.Float>('float');

// integer
export const left = cssProperty<Property.Left<TLength>>('left');

// static; fixed; absolute; relative; sticky;
export const position = cssProperty<Property.Position>('position');

// integer
export const right = cssProperty<Property.Right<TLength>>('right');

// integer
export const top = cssProperty<Property.Top<TLength>>('top');

// integer
export const bottom = cssProperty<Property.Top<TLength>>('bottom');

// auto or integer
export const zIndex = cssProperty<Property.ZIndex>('z-index');
