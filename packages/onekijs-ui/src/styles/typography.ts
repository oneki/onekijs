import { Property } from 'csstype';
import { colorFormatter, themeFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import {
  ColorPropertyTheme,
  FontFamilyPropertyTheme,
  FontSizePropertyTheme,
  FontWeightPropertyTheme,
  Formatter,
  LetterSpacingPropertyTheme,
  LineHeightPropertyTheme,
  TLength,
} from './typings';

export const color = cssProperty<ColorPropertyTheme | Property.Color>(null, colorFormatter('color', 'text-opacity'));

export const font = cssProperty<Property.Font>('font');

export const fontFamily = cssProperty<FontFamilyPropertyTheme | Property.FontFamily>(
  'font-family',
  themeFormatter('font.families'),
);

export const fontFeatureSettings = cssProperty<Property.FontFeatureSettings>('font-feature-settings');

export const fontKerning = cssProperty<Property.FontKerning>('font-kerning');

export const fontLanguageOverride = cssProperty<Property.FontLanguageOverride>('font-language-override');

export const fontOpticalSizing = cssProperty<Property.FontOpticalSizing>('font-optical-sizing');

export const fontSize = cssProperty<FontSizePropertyTheme | Property.FontSize<TLength>>(
  'font-size',
  themeFormatter('font.sizes'),
);

export const fontSizeAdjust = cssProperty<Property.FontSizeAdjust>('font-size-adjust');

export const fontStretch = cssProperty<Property.FontStretch>('font-stetch');

// normal; italic; oblique; oblique XXdeg;
export const fontStyle = cssProperty<Property.FontStyle>('font-style');

export const fontSynthesis = cssProperty<Property.FontSynthesis>('font-synthesis');

export const fontVariant = cssProperty<Property.FontVariant>('font-variant');

export const fontVariantAlternates = cssProperty<Property.FontVariantAlternates>('font-variant-alternates');

export const fontVariantCaps = cssProperty<Property.FontVariantCaps>('font-variant-caps');

export const fontVariantEastAsian = cssProperty<Property.FontVariantEastAsian>('font-variant-east-asian');

export const fontVariantLigatures = cssProperty<Property.FontVariantLigatures>('font-variant-ligatures');

export const fontVariantNumeric = cssProperty<Property.FontVariantNumeric>('font-variant-numeric');

export const fontVariantPosition = cssProperty<Property.FontVariantPosition>('font-variant-position');

export const fontVariationSettings = cssProperty<Property.FontVariationSettings>('font-variation-settings');

export const fontWeight = cssProperty<FontWeightPropertyTheme | Property.FontWeight>(
  'font-weight',
  themeFormatter('font.weights'),
);

export const hyphens = cssProperty<Property.Hyphens>('hyphens');

export const letterSpacing = cssProperty<LetterSpacingPropertyTheme | Property.LetterSpacing<TLength>>(
  'letter-spacing',
  themeFormatter('font.spacings'),
);

export const lineHeight = cssProperty<LineHeightPropertyTheme | Property.LineHeight<TLength>>(
  'line-height',
  themeFormatter('font.lineHeights'),
);

export const lineHeightStep = cssProperty<Property.LineHeightStep<TLength>>('line-height-step');

export const overflowWrap = cssProperty<Property.OverflowWrap>('overflow-wrap');

// left; center; right; justify
export const textAlign = cssProperty<Property.TextAlign>('text-align');

export const textDecoration = cssProperty<Property.TextDecoration<TLength>>('text-decoration');

export const textDecorationColor = cssProperty<Property.TextDecorationColor>(
  null,
  colorFormatter('text-decoration-color'),
);

export const textDecorationLine = cssProperty<Property.TextDecorationLine>('text-decoration-line');
export const textDecorationStyle = cssProperty<Property.TextDecorationStyle>('text-decoration-style');
export const textDecorationThickness = cssProperty<Property.TextDecorationThickness<TLength>>(
  'text-decoration-thickness',
);

export const textEmphasis = cssProperty<Property.TextEmphasis>('text-emphasis');

export const textEmphasisColor = cssProperty<Property.TextEmphasisColor>(null, colorFormatter('text-emphasis'));

export const textEmphasisPosition = cssProperty<Property.TextEmphasisPosition>('text-emphasis-position');

export const textEmphasisStyle = cssProperty<Property.TextEmphasisStyle>('text-emphasis-style');

export const textIdent = cssProperty<Property.TextIndent<TLength>>('text-ident');

export const textJustify = cssProperty<Property.TextJustify>('text-justify');

// float between 0 and 1
export const textOpacity = cssProperty<Property.Opacity>('--text-opacity');

export const textOverflow = cssProperty<Property.TextOverflow>('text-overflow');

export const textTransform = cssProperty<Property.TextTransform>('text-transform');

export const textShadow = cssProperty<Property.TextShadow>('text-shadow');

export const textUnderlineOffset = cssProperty<Property.TextUnderlinePosition>('text-underline-offset');

export const textUnderlinePosition = cssProperty<Property.TextUnderlinePosition>('text-underline-position');

export const whiteSpace = cssProperty<Property.WhiteSpace>('white-space');

// normal; words; all; truncate
const wordBreakFormatter: Formatter<Property.WordBreak | 'normal' | 'words' | 'all' | 'truncate'> = (value) => {
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
export const wordBreak = cssProperty<Property.WordBreak | 'normal' | 'words' | 'all' | 'truncate'>(
  null,
  wordBreakFormatter,
);

export const wordSpacing = cssProperty<Property.WordSpacing<TLength>>('word-spacing');
