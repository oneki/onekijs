import {
  Property
} from 'csstype';
import { colorFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import { ColorPropertyTheme, TLength } from './typings';

export const backgroundColor = cssProperty<ColorPropertyTheme | Property.BackgroundColor>(
  null,
  colorFormatter('background-color', 'background-opacity'),
);

export const backgroundAttachment = cssProperty<Property.BackgroundAttachment>('background-attachment');

export const backgroundClip = cssProperty<Property.BackgroundClip>('background-clip');

export const backgroundImage = cssProperty<Property.BackgroundImage>('background-image');

export const backgroundOpacity = cssProperty<Property.Opacity>('--background-opacity');

export const backgroundOrigin = cssProperty<Property.BackgroundOrigin>('background-origin');

export const backgroundPosition = cssProperty<Property.BackgroundPosition<TLength>>('background-position');

export const backgroundRepeat = cssProperty<Property.BackgroundRepeat>('background-repeat');

export const backgroundSize = cssProperty<Property.BackgroundSize<TLength>>('background-size');
