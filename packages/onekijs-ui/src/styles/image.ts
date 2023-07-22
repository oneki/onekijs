import { cssProperty } from '../utils/style';
import { Property } from 'csstype';
import { TLength } from './typings';

export const imageRendering = cssProperty<Property.ImageRendering>('image-rendering');

// contain; cover; fill; none; scale-down;
export const objectFit = cssProperty<Property.ObjectFit>('object-fit');

// bottom; center; left; right; top; left-bottom; right-bottom; left-top; right-top;
export const objectPosition = cssProperty<Property.ObjectPosition<TLength>>('object-position');
