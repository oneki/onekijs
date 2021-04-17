import { ClearProperty, FloatProperty, LeftProperty, PositionProperty, RightProperty, TopProperty } from 'csstype';
import { cssProperty } from '../utils/style';
import { TLength } from './typings';

// left; right; both; none;
export const clear = cssProperty<ClearProperty>('clear');

// right; left; none;
export const float = cssProperty<FloatProperty>('float');

// integer
export const left = cssProperty<LeftProperty<TLength>>('left');

// static; fixed; absolute; relative; sticky;
export const position = cssProperty<PositionProperty>('position');

// integer
export const right = cssProperty<RightProperty<TLength>>('right');

// integer
export const top = cssProperty<TopProperty<TLength>>('top');

// integer
export const bottom = cssProperty<TopProperty<TLength>>('bottom');

// auto or integer
export const zIndex = cssProperty('z-index');
