import {
  PerspectiveOriginProperty,
  PerspectiveProperty,
  RotateProperty,
  ScaleProperty,
  TransformOriginProperty,
  TransformProperty,
} from 'csstype';
import { cssProperty } from '../utils/style';
import { TLength } from './typings';

export const perspective = cssProperty<PerspectiveProperty<TLength>>('perspective');

export const perspectiveOrigin = cssProperty<PerspectiveOriginProperty<TLength>>('perspective-origin');

export const rotate = cssProperty<RotateProperty>('rotate');

export const scale = cssProperty<ScaleProperty>('scale');

export const transform = cssProperty<TransformProperty>('transform');

export const transformOrigin = cssProperty<TransformOriginProperty<TLength>>('transform-origin');
