import {
  AppearanceProperty,
  CursorProperty,
  OutlineProperty,
  PointerEventsProperty,
  ResizeProperty,
  UserSelectProperty,
  AspectRatioProperty,
  BoxSizingProperty,
  CaretColorProperty,
  OutlineColorProperty,
  OutlineOffsetProperty,
  OutlineStyleProperty,
  OutlineWidthProperty,
  TouchActionProperty,
} from 'csstype';
import { cssProperty } from '../utils/style';
import { TLength } from './typings';
import { colorFormatter, pxFormatter } from '../utils/formatter';

export const appearance = cssProperty<AppearanceProperty>('appearance');

export const aspectRatio = cssProperty<AspectRatioProperty>('aspect-ratio');

export const boxSizing = cssProperty<BoxSizingProperty>('box-sizing');

export const caretColor = cssProperty<CaretColorProperty>(null, colorFormatter('caret-color'));

export const cursor = cssProperty<CursorProperty>('cursor');

export const outline = cssProperty<OutlineProperty<TLength>>('outline');

export const outlineColor = cssProperty<OutlineColorProperty>(null, colorFormatter('outline-color'));

export const outlineOffset = cssProperty<OutlineOffsetProperty<TLength>>('outline-offset');

export const outlineStyle = cssProperty<OutlineStyleProperty>('outline-style');

export const outlineWidth = cssProperty<OutlineWidthProperty<TLength>>('outline', pxFormatter);

export const pointerEvents = cssProperty<PointerEventsProperty>('pointer-events');

export const resize = cssProperty<ResizeProperty>('resize');

export const touchAction = cssProperty<TouchActionProperty>('touch-action');

export const userSelect = cssProperty<UserSelectProperty>('user-select');
