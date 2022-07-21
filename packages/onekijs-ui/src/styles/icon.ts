import { FontSizeProperty } from 'csstype';
import { themeFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import { FontSizePropertyTheme, TLength } from './typings';

export const iconWidth = cssProperty<FontSizePropertyTheme | FontSizeProperty<TLength>>(
  'width',
  themeFormatter('font.sizes'),
);

export const iconHeight = cssProperty<FontSizePropertyTheme | FontSizeProperty<TLength>>(
  'height',
  themeFormatter('font.sizes'),
);
