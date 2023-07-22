import { Property } from 'csstype';
import { cssProperty } from '../utils/style';
import { TLength } from './typings';

export const perspective = cssProperty<Property.Perspective<TLength>>('perspective');

export const perspectiveOrigin = cssProperty<Property.PerspectiveOrigin<TLength>>('perspective-origin');

export const rotate = cssProperty<Property.Rotate>('rotate');

export const scale = cssProperty<Property.Scale>('scale');

export const transform = cssProperty<Property.Transform>('transform');

export const transformOrigin = cssProperty<Property.TransformOrigin<TLength>>('transform-origin');
