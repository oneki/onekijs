import { ListStyleImageProperty, ListStylePositionProperty, ListStyleProperty, ListStyleTypeProperty } from 'csstype';
import { cssProperty } from '../utils/style';

export const listStyle = cssProperty<ListStyleProperty>('list-style');

export const listStyleImage = cssProperty<ListStyleImageProperty>('list-style-image');

// inside; outside
export const listStylePosition = cssProperty<ListStylePositionProperty>('list-style-position');

// disc; circle; square; decimal; georgian; cjk-ideographic; kannada; any string
export const listStyleType = cssProperty<ListStyleTypeProperty>('list-style-type');
