import {
  ColorProperty,
  FontFamilyProperty,
  FontFeatureSettingsProperty,
  FontKerningProperty,
  FontLanguageOverrideProperty,
  FontOpticalSizingProperty,
  FontProperty,
  FontSizeAdjustProperty,
  FontSizeProperty,
  FontStretchProperty,
  FontStyleProperty,
  FontWeightProperty,
  LetterSpacingProperty,
  LineHeightProperty,
  ListStylePositionProperty,
  ListStyleProperty,
  OpacityProperty,
  TextAlignProperty,
  TextDecorationProperty,
  TextOverflowProperty,
  TextTransformProperty,
  VerticalAlignProperty,
  WhiteSpaceProperty,
  WordBreakProperty,
  FontSynthesisProperty,
  FontVariantPositionProperty,
  FontVariantProperty,
  FontVariantAlternatesProperty,
  FontVariantCapsProperty,
  FontVariantEastAsianProperty,
  FontVariantLigaturesProperty,
  FontVariantNumericProperty,
  FontVariationSettingsProperty,
  LineHeightStepProperty,
  HyphensProperty,
  OverflowWrapProperty,
  TextIndentProperty,
  TextJustifyProperty,
  WordSpacingProperty,
  TextDecorationColorProperty,
  TextDecorationLineProperty,
  TextDecorationStyleProperty,
  TextDecorationThicknessProperty,
  TextEmphasisProperty,
  TextEmphasisColorProperty,
  GlobalsString,
  TextEmphasisStyleProperty,
  TextShadowProperty,
  TextUnderlineOffsetProperty,
  TextUnderlinePositionProperty,
} from 'csstype';
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

export const color = cssProperty<ColorPropertyTheme | ColorProperty>(null, colorFormatter('color', 'text-opacity'));

export const font = cssProperty<FontProperty>('font');

export const fontFamily = cssProperty<FontFamilyPropertyTheme | FontFamilyProperty>(
  'font-family',
  themeFormatter('font.families'),
);

export const fontFeatureSettings = cssProperty<FontFeatureSettingsProperty>('font-feature-settings');

export const fontKerning = cssProperty<FontKerningProperty>('font-kerning');

export const fontLanguageOverride = cssProperty<FontLanguageOverrideProperty>('font-language-override');

export const fontOpticalSizing = cssProperty<FontOpticalSizingProperty>('font-optical-sizing');

export const fontSize = cssProperty<FontSizePropertyTheme | FontSizeProperty<TLength>>(
  'font-size',
  themeFormatter('font.sizes'),
);

export const fontSizeAdjust = cssProperty<FontSizeAdjustProperty>('font-size-adjust');

export const fontStretch = cssProperty<FontStretchProperty>('font-stetch');

// normal; italic; oblique; oblique XXdeg;
export const fontStyle = cssProperty<FontStyleProperty>('font-style');

export const fontSynthesis = cssProperty<FontSynthesisProperty>('font-synthesis');

export const fontVariant = cssProperty<FontVariantProperty>('font-variant');

export const fontVariantAlternates = cssProperty<FontVariantAlternatesProperty>('font-variant-alternates');

export const fontVariantCaps = cssProperty<FontVariantCapsProperty>('font-variant-caps');

export const fontVariantEastAsian = cssProperty<FontVariantEastAsianProperty>('font-variant-east-asian');

export const fontVariantLigatures = cssProperty<FontVariantLigaturesProperty>('font-variant-ligatures');

export const fontVariantNumeric = cssProperty<FontVariantNumericProperty>('font-variant-numeric');

export const fontVariantPosition = cssProperty<FontVariantPositionProperty>('font-variant-position');

export const fontVariationSettings = cssProperty<FontVariationSettingsProperty>('font-variation-settings');

export const fontWeight = cssProperty<FontWeightPropertyTheme | FontWeightProperty>(
  'font-weight',
  themeFormatter('font.weights'),
);

export const hyphens = cssProperty<HyphensProperty>('hyphens');

export const letterSpacing = cssProperty<LetterSpacingPropertyTheme | LetterSpacingProperty<TLength>>(
  'letter-spacing',
  themeFormatter('font.spacings'),
);

export const lineHeight = cssProperty<LineHeightPropertyTheme | LineHeightProperty<TLength>>(
  'line-height',
  themeFormatter('font.lineHeights'),
);

export const lineHeightStep = cssProperty<LineHeightStepProperty<TLength>>('line-height-step');

export const overflowWrap = cssProperty<OverflowWrapProperty>('overflow-wrap');

// left; center; right; justify
export const textAlign = cssProperty<TextAlignProperty>('text-align');

export const textDecoration = cssProperty<TextDecorationProperty<TLength>>('text-decoration');

export const textDecorationColor = cssProperty<TextDecorationColorProperty>(
  null,
  colorFormatter('text-decoration-color'),
);

export const textDecorationLine = cssProperty<TextDecorationLineProperty>('text-decoration-line');
export const textDecorationStyle = cssProperty<TextDecorationStyleProperty>('text-decoration-style');
export const textDecorationThickness = cssProperty<TextDecorationThicknessProperty<TLength>>(
  'text-decoration-thickness',
);

export const textEmphasis = cssProperty<TextEmphasisProperty>('text-emphasis');

export const textEmphasisColor = cssProperty<TextEmphasisColorProperty>(null, colorFormatter('text-emphasis'));

export const textEmphasisPosition = cssProperty<GlobalsString>('text-emphasis-position');

export const textEmphasisStyle = cssProperty<TextEmphasisStyleProperty>('text-emphasis-style');

export const textIdent = cssProperty<TextIndentProperty<TLength>>('text-ident');

export const textJustify = cssProperty<TextJustifyProperty>('text-justify');

// float between 0 and 1
export const textOpacity = cssProperty<OpacityProperty>('--text-opacity');

export const textOverflow = cssProperty<TextOverflowProperty>('text-overflow');

export const textTransform = cssProperty<TextTransformProperty>('text-transform');

export const textShadow = cssProperty<TextShadowProperty>('text-shadow');

export const textUnderlineOffset = cssProperty<TextUnderlinePositionProperty>('text-underline-offset');

export const textUnderlinePosition = cssProperty<TextUnderlinePositionProperty>('text-underline-position');

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

export const wordSpacing = cssProperty<WordSpacingProperty<TLength>>('word-spacing');
