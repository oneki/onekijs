import {
  BackgroundAttachmentProperty,
  BackgroundColorProperty,
  BackgroundPositionProperty,
  BackgroundRepeatProperty,
  BackgroundSizeProperty,
  OpacityProperty,
  BackgroundClipProperty,
  BackgroundImageProperty,
  BackgroundOriginProperty,
} from 'csstype';
import { colorFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import { ColorPropertyTheme, TLength } from './typings';

export const backgroundColor = cssProperty<ColorPropertyTheme | BackgroundColorProperty>(
  null,
  colorFormatter('background-color', 'background-opacity'),
);

export const backgroundAttachment = cssProperty<BackgroundAttachmentProperty>('background-attachment');

export const backgroundClip = cssProperty<BackgroundClipProperty>('background-clip');

export const backgroundImage = cssProperty<BackgroundImageProperty>('background-image');

export const backgroundOpacity = cssProperty<OpacityProperty>('--background-opacity');

export const backgroundOrigin = cssProperty<BackgroundOriginProperty>('background-origin');

export const backgroundPosition = cssProperty<BackgroundPositionProperty<TLength>>('background-position');

export const backgroundRepeat = cssProperty<BackgroundRepeatProperty>('background-repeat');

export const backgroundSize = cssProperty<BackgroundSizeProperty<TLength>>('background-size');
