import { Property } from 'csstype';
import { cssProperty } from '../utils/style';
import { TLength } from './typings';
import { colorFormatter, pxFormatter } from '../utils/formatter';

export const appearance = cssProperty<Property.Appearance>('appearance');

export const aspectRatio = cssProperty<Property.AspectRatio>('aspect-ratio');

export const boxSizing = cssProperty<Property.BoxSizing>('box-sizing');

export const caretColor = cssProperty<Property.CaretColor>(null, colorFormatter('caret-color'));

export const cursor = cssProperty<Property.Cursor>('cursor');

export const outline = cssProperty<Property.Outline<TLength>>('outline');

export const outlineColor = cssProperty<Property.OutlineColor>(null, colorFormatter('outline-color'));

export const outlineOffset = cssProperty<Property.OutlineOffset<TLength>>('outline-offset');

export const outlineStyle = cssProperty<Property.OutlineStyle>('outline-style');

export const outlineWidth = cssProperty<Property.OutlineWidth<TLength>>('outline', pxFormatter);

export const pointerEvents = cssProperty<Property.PointerEvents>('pointer-events');

export const resize = cssProperty<Property.Resize>('resize');

export const touchAction = cssProperty<Property.TouchAction>('touch-action');

export const userSelect = cssProperty<Property.UserSelect>('user-select');
