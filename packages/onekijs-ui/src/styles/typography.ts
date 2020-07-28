import {
  ColorProperty,
  FontFamilyProperty,
  FontSizeProperty,
  FontStyleProperty,
  FontWeightProperty,
  LetterSpacingProperty,
  LineHeightProperty,
  ListStylePositionProperty,
  ListStyleProperty,
  OpacityProperty,
  TextAlignProperty,
  TextDecorationProperty,
  TextTransformProperty,
  VerticalAlignProperty,
  WhiteSpaceProperty,
  WordBreakProperty,
} from 'csstype';
import { themeFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import {
  FontFamilyPropertyTheme,
  FontSizePropertyTheme,
  FontWeightPropertyTheme,
  Formatter,
  letterSpacingPropertyTheme,
  lineHeightPropertyTheme,
  TLength,
} from './typings';

export const fontFamily = cssProperty<FontFamilyPropertyTheme | FontFamilyProperty>(
  'font-family',
  themeFormatter('font.families'),
);

export const fontSize = cssProperty<FontSizePropertyTheme | FontSizeProperty<TLength>>(
  'font-size',
  themeFormatter('font.sizes'),
);

// normal; italic; oblique; oblique XXdeg;
export const fontStyle = cssProperty<FontStyleProperty>('font-style');

export const fontWeight = cssProperty<FontWeightPropertyTheme | FontWeightProperty>(
  'font-weight',
  themeFormatter('font.weights'),
);

export const letterSpacing = cssProperty<letterSpacingPropertyTheme | LetterSpacingProperty<TLength>>(
  'letter-spacing',
  themeFormatter('font.spacings'),
);

export const lineHeight = cssProperty<lineHeightPropertyTheme | LineHeightProperty<TLength>>(
  'line-height',
  themeFormatter('font.lineHeights'),
);

// disc; circle; square; decimal; georgian; cjk-ideographic; kannada; any string
export const listStyleType = cssProperty<ListStyleProperty>('line-style-type');

// inside; outside
export const listStylePosition = cssProperty<ListStylePositionProperty>('line-style-position');

// left; center; right; justify
export const textAlign = cssProperty<TextAlignProperty>('text-align');

export const color = cssProperty<ColorProperty>('color', themeFormatter('colors'));

// float between 0 and 1
export const textOpacity = cssProperty<OpacityProperty>('--text-opacity');

export const textDecoration = cssProperty<TextDecorationProperty<TLength>>('text-decoration');

export const textTransform = cssProperty<TextTransformProperty>('text-transform');

export const verticalAlign = cssProperty<VerticalAlignProperty<TLength>>('vertical-align');

export const whiteSpace = cssProperty<WhiteSpaceProperty>('white-space');

// normal; words; all; truncate
const wordBreakFormatter: Formatter<WordBreakProperty | 'normal' | 'words' | 'all' | 'truncate'> = (value) => {
  if (value === 'normal') {
    return 'word-break: normal;overflow-wrap: normal';
  }
  if (value === 'words') {
    return 'overflow-wrap: break-word';
  }
  if (value === 'all') {
    return 'word-break: break-all';
  }
  if (value === 'truncate') {
    return 'overflow: hidden;text-overflow: ellipsis;white-space: nowrap';
  }
  return `word-break: ${value}`;
};
export const wordBreak = cssProperty<WordBreakProperty | 'normal' | 'words' | 'all' | 'truncate'>(
  null,
  wordBreakFormatter,
);
