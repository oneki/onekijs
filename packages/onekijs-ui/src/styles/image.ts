import { cssProperty } from '../utils/style';
import { ObjectFitProperty, ObjectPositionProperty, ImageRenderingProperty } from 'csstype';
import { TLength } from './typings';

export const imageRendering = cssProperty<ImageRenderingProperty>('image-rendering');

// contain; cover; fill; none; scale-down;
export const objectFit = cssProperty<ObjectFitProperty>('object-fit');

// bottom; center; left; right; top; left-bottom; right-bottom; left-top; right-top;
export const objectPosition = cssProperty<ObjectPositionProperty<TLength>>('object-position');
