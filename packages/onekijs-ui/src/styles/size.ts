import {
  OverscrollBehaviorBlockProperty,
  OverscrollBehaviorInlineProperty,
  OverscrollBehaviorProperty,
  OverscrollBehaviorXProperty,
  OverscrollBehaviorYProperty,
} from 'csstype';
import { cssProperty } from '../utils/style';
import { Formatter, SizePropertyTheme, Theme } from './typings';
import { pxFormatter } from '../utils/formatter';
import { get } from 'onekijs-framework';

const sizeFormatter = (type: 'width' | 'height', value: SizePropertyTheme, theme: Theme) => {
  if (get(theme.sizes, `${value}`) !== undefined) {
    return get(theme.sizes, `${value}`);
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
export const width = cssProperty<SizePropertyTheme>('width', widthFormatter);

// spacing or fraction or auto or full or screen
export const minWidth = cssProperty<SizePropertyTheme>('min-width', widthFormatter);

export const maxWidth = cssProperty<SizePropertyTheme>('max-width', widthFormatter);

export const height = cssProperty<SizePropertyTheme>('height', heightFormatter);

export const minHeight = cssProperty<SizePropertyTheme>('min-height', heightFormatter);

export const maxHeight = cssProperty<SizePropertyTheme>('max-height', heightFormatter);

export const overscrollBehavior = cssProperty<OverscrollBehaviorProperty>('overscroll-behavior');

export const overscrollBehaviorBlock = cssProperty<OverscrollBehaviorBlockProperty>('overscroll-behavior-block');

export const overscrollBehaviorInline = cssProperty<OverscrollBehaviorInlineProperty>('overscroll-behavior-inline');

export const overscrollBehaviorX = cssProperty<OverscrollBehaviorXProperty>('overscroll-behavior-x');

export const overscrollBehaviorY = cssProperty<OverscrollBehaviorYProperty>('overscroll-behavior-y');
