import { Property } from 'csstype';
import { themeFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import { FontSizePropertyTheme, TLength } from './typings';

export const iconWidth = cssProperty<FontSizePropertyTheme | Property.FontSize<TLength>>(
  'width',
  themeFormatter('font.sizes'),
);

export const iconHeight = cssProperty<FontSizePropertyTheme | Property.FontSize<TLength>>(
  'height',
  themeFormatter('font.sizes'),
);
