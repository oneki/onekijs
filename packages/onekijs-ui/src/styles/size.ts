import {
  Property,
} from 'csstype';
import { cssProperty } from '../utils/style';
import { Formatter, SizePropertyTheme, Theme, TLength } from './typings';
import { pxFormatter } from '../utils/formatter';
import { get } from 'onekijs-framework';

const sizeFormatter = (type: 'width' | 'height', value: SizePropertyTheme, theme: Theme): string => {
  if (get<any>(theme.sizes, `${value}`) !== undefined) {
    return get<any>(theme.sizes, `${value}`) as string;
  }
  if (value === 'auto') return 'auto';
  if (value === 'none') return 'none';
  if (value === 'full') return '100%';
  if (value === 'screen') return type === 'height' ? '100vh' : '100vw';

  if (value.toString().includes('/')) {
    const [time, div] = value
      .toString()
      .split('/')
      .map((x) => parseInt(x));
    return `${(100 * time) / div}%`;
  }
  return pxFormatter(value, theme);
};

const widthFormatter: Formatter<SizePropertyTheme> = (value, theme) => {
  return sizeFormatter('width', value, theme);
};

const heightFormatter: Formatter<SizePropertyTheme> = (value, theme) => {
  return sizeFormatter('height', value, theme);
};

// spacing or fraction or auto or full or screen
export const width = cssProperty<SizePropertyTheme | Property.Width<TLength>>('width', widthFormatter);

// spacing or fraction or auto or full or screen
export const minWidth = cssProperty<SizePropertyTheme | Property.MaxWidth<TLength>>('min-width', widthFormatter);

export const maxWidth = cssProperty<SizePropertyTheme | Property.MinWidth<TLength>>('max-width', widthFormatter);

export const height = cssProperty<SizePropertyTheme | Property.Height<TLength>>('height', heightFormatter);

export const minHeight = cssProperty<SizePropertyTheme | Property.MinHeight<TLength>>('min-height', heightFormatter);

export const maxHeight = cssProperty<SizePropertyTheme | Property.MaxHeight<TLength>>('max-height', heightFormatter);

export const overscrollBehavior = cssProperty<Property.OverscrollBehavior>('overscroll-behavior');

export const overscrollBehaviorBlock = cssProperty<Property.OverscrollBehaviorBlock>('overscroll-behavior-block');

export const overscrollBehaviorInline = cssProperty<Property.OverscrollBehaviorInline>('overscroll-behavior-inline');

export const overscrollBehaviorX = cssProperty<Property.OverscrollBehaviorX>('overscroll-behavior-x');

export const overscrollBehaviorY = cssProperty<Property.OverscrollBehaviorY>('overscroll-behavior-y');
