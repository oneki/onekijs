import { Property } from 'csstype';
import { cssProperty } from '../utils/style';

export const listStyle = cssProperty<Property.ListStyle>('list-style');

export const listStyleImage = cssProperty<Property.ListStyleImage>('list-style-image');

// inside; outside
export const listStylePosition = cssProperty<Property.ListStylePosition>('list-style-position');

// disc; circle; square; decimal; georgian; cjk-ideographic; kannada; any string
export const listStyleType = cssProperty<Property.ListStyleType>('list-style-type');
