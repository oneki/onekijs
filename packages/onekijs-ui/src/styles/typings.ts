import { Globals, Property } from 'csstype';
import { AnonymousObject } from 'onekijs-framework';
import {
  DefaultTheme,
  createGlobalStyle,
  css,
} from 'styled-components';

export type TshirtSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export type CssProperty<T> = (value: T, variants?: AnonymousObject) => ReturnType<typeof css> | ReturnType<typeof css>[];
export type Formatter<T> = (value: T, theme: DefaultTheme) => string;
export type Media = 'all' | 'sm' | 'md' | 'lg' | 'xl';
export enum ColorKeys {
  white = 'white',
  lightest = 'lightest',
  lighter = 'lighter',
  light = 'light',
  dark = 'dark',
  darker = 'darker',
  darkest = 'darkest',
  black = 'black',
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  primary = 'primary',
  secondary = 'secondary',
  blue = 'blue',
  red = 'red',
  purple = 'purple',
  pink = 'pink',
  indigo = 'indigo',
  teal = 'teal',
  orange = 'orange',
  yellow = 'yellow',
  green = 'green',
  lightblue = 'lightblue',
  lightred = 'lightred',
  lightpurple = 'lightpurple',
  lightpink = 'lightpink',
  lightindigo = 'lightindigo',
  lightteal = 'lightteal',
  lightorange = 'lightorange',
  lightyellow = 'lightyellow',
  lightgreen = 'lightgreen',
  background = 'background',
}

export enum DashboardKeys {
  left = 'left',
  right = 'right',
  header = 'header',
  footer = 'footer',
  body = 'body',
}

export enum BreakpointKeys {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

export enum SpacingKeys {
  none = 'none',
  '2xs' = '2xs',
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
  '3xl' = '3xl',
  '4xl' = '4xl',
  '5xl' = '5xl',
  '6xl' = '6xl',
  '7xl' = '7xl',
  '8xl' = '8xl',
  '9xl' = '9xl',
  '10xl' = '10xl',
  '11xl' = '11xl',
  '12xl' = '12xl',
  '13xl' = '13xl',
  px = 'px',
}

export enum TshirtKeys {
  xsmall = 'xsmall',
  small = 'small',
  medium = 'medium',
  large = 'large',
  xlarge = 'xlarge',
}

export enum FontWeightKeys {
  hairline = 'hairline',
  thin = 'thin',
  light = 'light',
  normal = 'normal',
  medium = 'medium',
  semibold = 'semibold',
  bold = 'bold',
  extrabold = 'extrabold',
  black = 'black',
}

export enum FontFamiliesKeys {
  sans = 'sans',
  serif = 'serif',
  mono = 'mono',
}

export enum FontLineHeightKeys {
  none = 'none',
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
  '3xl' = '3xl',
  '4xl' = '4xl',
}

export enum FontSizeKeys {
  '2xs' = '2xs',
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
  '3xl' = '3xl',
  '4xl' = '4xl',
  '5xl' = '5xl',
  '6xl' = '6xl',
  default = 'default',
}

export enum FontSpacingKeys {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
}

export enum RadiusKeys {
  none = 'none',
  '2xs' = '2xs',
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  full = 'full',
}

export enum ShadowKeys {
  default = 'default',
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
  'inner' = 'inner',
  'outline' = 'outline',
  'none' = 'none',
}

export enum SizeKeys {
  'zero' = 0,
  'one' = 1,
  'two' = 2,
  'three' = 3,
  'four' = 4,
  'five' = 5,
  'six' = 6,
  'eight' = 8,
  'ten' = 10,
  'twelve' = 12,
  'sixteen' = 16,
  'twenty' = 20,
  'twenty_four' = 24,
  'thirty_two' = 32,
  'fourty' = 40,
  'fourty_eight' = 48,
  'fifty_six' = 56,
  'sixty_four' = 64,
  'px' = 'px',
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
  '3xl' = '3xl',
  '4xl' = '4xl',
  '5xl' = '5xl',
  '6xl' = '6xl',
  'screen-sm' = 'screen-sm',
  'screen-md' = 'screen-md',
  'screen-lg' = 'screen-lg',
  'screen-xl' = 'screen-xl',
}

export type Theme = {
  GlobalStyles: ReturnType<typeof createGlobalStyle>;
  breakpoints: {
    [k in BreakpointKeys]: string;
  };
  colors: {
    [k in ColorKeys]: string;
  };
  spacings: {
    [k in SpacingKeys]: string;
  };
  palette: Palette;
  font: {
    families: {
      [k in FontFamiliesKeys]: string;
    };
    lineHeights: {
      [k in FontLineHeightKeys]: number;
    };
    sizes: {
      [k in FontSizeKeys]: string | 0;
    };
    spacings: {
      [k in FontSpacingKeys]: string | 0;
    };
    weights: {
      [k in FontWeightKeys]: number;
    };
  };
  radius: {
    [k in RadiusKeys]: string | 0;
  };
  shadow: {
    [k in ShadowKeys]: string;
  };

  sizes: {
    [k in SizeKeys]: string | 0;
  };

  buttons: {
    [k in ColorKeys]: {
      bgColor: ColorPropertyTheme | Property.BackgroundColor;
      bgColorFlat: ColorPropertyTheme | Property.BackgroundColor;
      bgColorOutline: ColorPropertyTheme | Property.BackgroundColor;
      borderColor: ColorPropertyTheme | Property.BorderColor;
      borderColorFlat: ColorPropertyTheme | Property.BackgroundColor;
      borderColorOutline: ColorPropertyTheme | Property.BackgroundColor;
      borderRadiusMedium: RadiusPropertyTheme | string;
      borderRadiusSmall: RadiusPropertyTheme | string;
      borderRadiusLarge: RadiusPropertyTheme | string;
      borderStyle: Property.BorderStyle;
      borderWidthSmall: Property.BorderWidth<TLength>;
      borderWidthMedium: Property.BorderWidth<TLength>;
      borderWidthLarge: Property.BorderWidth<TLength>;
      color: ColorPropertyTheme | Property.Color;
      colorFlat: ColorPropertyTheme | Property.BackgroundColor;
      colorOutline: ColorPropertyTheme | Property.BackgroundColor;
      cursor: Property.Cursor;
      cursorDisabled: Property.Cursor;
      fontSizeMedium: FontSizePropertyTheme | Property.FontSize<TLength>;
      fontSmallSize: FontSizePropertyTheme | Property.FontSize<TLength>;
      fontLargeSize: FontSizePropertyTheme | Property.FontSize<TLength>;
      fontWeight: FontWeightPropertyTheme | Property.FontWeight;
      hoverBgColor: ColorPropertyTheme | Property.BackgroundColor;
      hoverBgColorFlat: ColorPropertyTheme | Property.BackgroundColor;
      hoverBgColorOutline: ColorPropertyTheme | Property.BackgroundColor;
      hoverBorderColor: ColorPropertyTheme | Property.BackgroundColor;
      hoverBorderColorFlat: ColorPropertyTheme | Property.BackgroundColor;
      hoverBorderColorOutline: ColorPropertyTheme | Property.BackgroundColor;
      hoverColor: ColorPropertyTheme | Property.Color;
      hoverColorFlat: ColorPropertyTheme | Property.BackgroundColor;
      hoverColorOutline: ColorPropertyTheme | Property.BackgroundColor;
      letterSpacingSmall: LetterSpacingPropertyTheme | Property.LetterSpacing<TLength>;
      letterSpacingMedium: LetterSpacingPropertyTheme | Property.LetterSpacing<TLength>;
      letterSpacingLarge: LetterSpacingPropertyTheme | Property.LetterSpacing<TLength>;
      lineHeightSmall: LineHeightPropertyTheme | Property.LineHeight<TLength>;
      lineHeightMedium: LineHeightPropertyTheme | Property.LineHeight<TLength>;
      lineHeightLarge: LineHeightPropertyTheme | Property.LineHeight<TLength>;
      opacity: Property.Opacity;
      opacityDisabled: Property.Opacity;
      paddingYMedium: SpacingPropertyTheme | Property.Padding<TLength>;
      paddingXMedium: SpacingPropertyTheme | Property.Padding<TLength>;
      paddingYSmall: SpacingPropertyTheme | Property.Padding<TLength>;
      paddingXSmall: SpacingPropertyTheme | Property.Padding<TLength>;
      paddingYLarge: SpacingPropertyTheme | Property.Padding<TLength>;
      paddingXLarge: SpacingPropertyTheme | Property.Padding<TLength>;
      textOverflow: Property.TextOverflow;
      textTransform: Property.TextTransform;
      whiteSpace: Property.WhiteSpace;
    };
  };

  fieldLayout: {
    marginY: Property.Margin<TLength> | SpacingPropertyTheme;
    helperMarginLeft: Property.Margin<TLength> | SpacingPropertyTheme;
    helperMarginRight: Property.Margin<TLength> | SpacingPropertyTheme;
    helperColor: Property.Color | ColorPropertyTheme;
    descriptionFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    descriptionColor: Property.Color | ColorPropertyTheme;
  };

  table: {
    bgColor: ColorPropertyTheme | Property.BackgroundColor;
    shadow: ShadowPropertyTheme | Property.BoxShadow;
    thPaddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    thPaddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    thBorderBottomWidth: number | Property.BorderWidth<TLength>;
    thBorderBottomColor: ColorPropertyTheme | Property.BorderColor;
    thBgColor: ColorPropertyTheme | Property.BackgroundColor;
    thFontWeigth: FontWeightPropertyTheme | Property.FontWeight;
    thFontColor: ColorPropertyTheme | Property.Color;
    thFontCase: Property.TextTransform;
    thFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    thLetterSpacing: LetterSpacingPropertyTheme | Property.LetterSpacing<TLength>;
    thFilterInputBgColor: ColorPropertyTheme | Property.BackgroundColor;
    thFilterInputFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    thFilterInputPaddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    thFilterInputPaddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    tdFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    tdFontColor: ColorPropertyTheme | Property.Color;
    tdPaddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    tdPaddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    tdBorderBottomColor: ColorPropertyTheme | Property.BorderColor;
    tdBorderBottomWidth: number | Property.BorderWidth<TLength>;
    tdBorderBottomStyle: Property.BorderBottomStyle;
    tdStripBgColor: ColorPropertyTheme | Property.BackgroundColor;
    tdHoverBgColor: ColorPropertyTheme | Property.BackgroundColor;
    tdHoverFontColor: ColorPropertyTheme | Property.Color;
    tdExpandedBgColor: ColorPropertyTheme | Property.BackgroundColor;
    loadingRowBgColor: ColorPropertyTheme | Property.BackgroundColor;
    loadingRowMinHeight: SizePropertyTheme | Property.Height<TLength>;
  };

  input: {
    bgColor: ColorPropertyTheme | Property.BackgroundColor;
    width: SizePropertyTheme | Property.Width<TLength>;
    borderWidth: number | Property.BorderWidth<TLength>;
    borderColor: ColorPropertyTheme | Property.BorderColor;
    borderRadius: RadiusPropertyTheme | string;
    borderStyle: Property.BorderBottomStyle;
    borderFocusColor: ColorPropertyTheme | Property.BorderColor;
    borderFocusWidth: number | Property.BorderWidth<TLength>;
    paddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    paddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    xsPaddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    xsPaddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    xsFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    smPaddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    smPaddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    smFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    mdPaddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    mdPaddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    mdFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    lgPaddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    lgPaddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    lgFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    xlPaddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    xlPaddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    xlFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    appearance: Property.Appearance;
    outline: Property.Outline<TLength>;
    fontColor: ColorPropertyTheme | Property.Color;
    placeholderColor: ColorPropertyTheme | Property.Color;
  };

  textarea: {
    bgColor: ColorPropertyTheme | Property.BackgroundColor;
    width: SizePropertyTheme | Property.Width<TLength>;
    borderWidth: number | Property.BorderWidth<TLength>;
    borderColor: ColorPropertyTheme | Property.BorderColor;
    borderRadius: RadiusPropertyTheme | string;
    borderStyle: Property.BorderBottomStyle;
    borderFocusColor: ColorPropertyTheme | Property.BorderColor;
    borderFocusWidth: number | Property.BorderWidth<TLength>;
    paddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    paddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    xsPaddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    xsPaddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    xsFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    smPaddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    smPaddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    smFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    mdPaddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    mdPaddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    mdFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    lgPaddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    lgPaddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    lgFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    xlPaddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    xlPaddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    xlFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    appearance: Property.Appearance;
    outline: Property.Outline<TLength>;
    fontColor: ColorPropertyTheme | Property.Color;
    placeholderColor: ColorPropertyTheme | Property.Color;
  };

  checkbox: {
    bgColor: ColorPropertyTheme | Property.BackgroundColor;
    color: ColorPropertyTheme | Property.BackgroundColor;
  };

  label: {
    fontWeight: FontWeightPropertyTheme | Property.FontWeight;
    fontCase: Property.TextTransform;
    fontColor: ColorPropertyTheme | Property.Color;
    fontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    letterSpacing: LetterSpacingPropertyTheme | Property.LetterSpacing<TLength>;
    requiredColor: ColorPropertyTheme | Property.Color;
    requiredWeight: FontWeightPropertyTheme | Property.FontWeight;
    requiredMarginLeft: SpacingPropertyTheme | Property.Margin<TLength>;
    helperIconColor: ColorPropertyTheme | Property.Color;
    helperMarginLeft: SpacingPropertyTheme | Property.Margin<TLength>;
  };

  link: {
    fontWeight: FontWeightPropertyTheme | Property.FontWeight;
    fontColor: ColorPropertyTheme | Property.Color;
    textDecoration: Property.TextDecoration<TLength>;
    fontWeightHover: FontWeightPropertyTheme | Property.FontWeight;
    fontColorHover: ColorPropertyTheme | Property.Color;
    textDecorationHover: Property.TextDecoration<TLength>;
  };

  tooltip: {
    [k in ColorKeys]: {
      bgColor: ColorPropertyTheme | Property.BackgroundColor;
      color: ColorPropertyTheme | Property.Color;
      linkColor: ColorPropertyTheme | Property.Color;
      borderColor: ColorPropertyTheme | Property.BackgroundColor;
      borderRadius: Property.BorderRadius<TLength> | RadiusPropertyTheme;
      borderStyle: Property.BorderStyle;
      borderWidth: Property.BorderWidth<TLength>;
      boxShadow: ShadowPropertyTheme | Property.BoxShadow;
      padding: SpacingPropertyTheme | Property.Padding<TLength>;
      fontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    };
  };

  accordion: {
    fontWeight: FontWeightPropertyTheme | Property.FontWeight;
    fontColor: ColorPropertyTheme | Property.Color;
    activeFontColor: ColorPropertyTheme | Property.Color;
    hoverFontColor: ColorPropertyTheme | Property.Color;
    fontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    togglerIconWidth: Property.Width<TLength> | IconSizePropertyTheme;
    togglerIconHeight: Property.Width<TLength> | IconSizePropertyTheme;
    bgColor: ColorPropertyTheme | Property.BackgroundColor;
    activeBgColor: ColorPropertyTheme | Property.BackgroundColor;
    hoverBgColor: ColorPropertyTheme | Property.BackgroundColor;
    borderColor: ColorPropertyTheme | Property.BorderColor;
    borderRadius: Property.BorderRadius<TLength> | RadiusPropertyTheme;
    borderStyle: Property.BorderStyle;
    borderWidth: Property.BorderWidth<TLength>;
    paddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    paddingY: SpacingPropertyTheme | Property.Padding<TLength>;
  };

  tab: {
    activeBgColor: ColorPropertyTheme | Property.BackgroundColor;
    activeBorderColor: ColorPropertyTheme | Property.BorderColor;
    activeBorderStyle: Property.BorderStyle;
    activeBorderWidth: Property.BorderWidth<TLength>;
    activeFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    activeFontColor: ColorPropertyTheme | Property.Color;
    activeFontWeight: FontWeightPropertyTheme | Property.FontWeight;
    bgColor: ColorPropertyTheme | Property.BackgroundColor;
    borderColor: ColorPropertyTheme | Property.BorderColor;
    borderRadius: Property.BorderRadius<TLength> | RadiusPropertyTheme;
    borderStyle: Property.BorderStyle;
    borderWidth: Property.BorderWidth<TLength>;
    cursor: Property.Cursor;
    fontColor: ColorPropertyTheme | Property.Color;
    fontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    fontWeight: FontWeightPropertyTheme | Property.FontWeight;
    hoverBgColor: ColorPropertyTheme | Property.BackgroundColor;
    hoverBorderColor: ColorPropertyTheme | Property.BorderColor;
    hoverBorderStyle: Property.BorderStyle;
    hoverBorderWidth: Property.BorderWidth<TLength>;
    hoverFontColor: ColorPropertyTheme | Property.Color;
    marginBefore: SpacingPropertyTheme | Property.Margin<TLength>;
    marginAfter: SpacingPropertyTheme | Property.Margin<TLength>;
    paddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    paddingY: SpacingPropertyTheme | Property.Padding<TLength>;
  };

  wizard: {
    activeBgColor: ColorPropertyTheme | Property.BackgroundColor;
    activeBorderColor: ColorPropertyTheme | Property.BorderColor;
    activeFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    activeFontColor: ColorPropertyTheme | Property.Color;
    activeFontWeight: FontWeightPropertyTheme | Property.FontWeight;
    bgColor: ColorPropertyTheme | Property.BackgroundColor;
    borderColor: ColorPropertyTheme | Property.BorderColor;
    borderRadius: Property.BorderRadius<TLength> | RadiusPropertyTheme;
    borderStyle: Property.BorderStyle;
    borderWidth: Property.BorderWidth<TLength>;
    cursor: Property.Cursor;
    disabledBgColor: ColorPropertyTheme | Property.BackgroundColor;
    disabledBorderColor: ColorPropertyTheme | Property.BorderColor;
    disabledFontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    disabledFontColor: ColorPropertyTheme | Property.Color;
    disabledFontWeight: FontWeightPropertyTheme | Property.FontWeight;
    errorBgColor: ColorPropertyTheme | Property.BackgroundColor;
    errorBorderColor: ColorPropertyTheme | Property.BorderColor;
    errorFontColor: ColorPropertyTheme | Property.Color;
    fontColor: ColorPropertyTheme | Property.Color;
    fontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    fontWeight: FontWeightPropertyTheme | Property.FontWeight;
    hoverBgColor: ColorPropertyTheme | Property.BackgroundColor;
    hoverBorderColor: ColorPropertyTheme | Property.BorderColor;
    hoverBorderStyle: Property.BorderStyle;
    hoverBorderWidth: Property.BorderWidth<TLength>;
    hoverFontColor: ColorPropertyTheme | Property.Color;
    marginBefore: SpacingPropertyTheme | Property.Margin<TLength>;
    marginAfter: SpacingPropertyTheme | Property.Margin<TLength>;
    modalStepsBgColor: ColorPropertyTheme | Property.BackgroundColor;
    modalStepsBorderColor: ColorPropertyTheme | Property.BorderColor;
    modalStepsBorderStyle: Property.BorderStyle;
    modalStepsBorderWidth: Property.BorderWidth<TLength>;
    paddingRight: SpacingPropertyTheme | Property.Padding<TLength>;
    paddingLeft: SpacingPropertyTheme | Property.Padding<TLength>;
    paddingTop: SpacingPropertyTheme | Property.Padding<TLength>;
    paddingBottom: SpacingPropertyTheme | Property.Padding<TLength>;
    stepsBgColor: ColorPropertyTheme | Property.BackgroundColor;
    stepsBorderColor: ColorPropertyTheme | Property.BorderColor;
    stepsBorderStyle: Property.BorderStyle;
    stepsBorderWidth: Property.BorderWidth<TLength>;
    stepsPaddingTop: SpacingPropertyTheme | Property.Padding<TLength>;
    stepsPaddingBottom: SpacingPropertyTheme | Property.Padding<TLength>;
    stepsPaddingLeft: SpacingPropertyTheme | Property.Padding<TLength>;
    stepsPaddingRight: SpacingPropertyTheme | Property.Padding<TLength>;
    successBgColor: ColorPropertyTheme | Property.BackgroundColor;
    successBorderColor: ColorPropertyTheme | Property.BorderColor;
    successFontColor: ColorPropertyTheme | Property.Color;
    warningBgColor: ColorPropertyTheme | Property.BackgroundColor;
    warningBorderColor: ColorPropertyTheme | Property.BorderColor;
    warningFontColor: ColorPropertyTheme | Property.Color;
  };

  card: {
    borderColor: ColorPropertyTheme | Property.BorderColor;
    borderRadius: Property.BorderRadius<TLength> | RadiusPropertyTheme;
    borderStyle: Property.BorderStyle;
    borderWidth: Property.BorderWidth<TLength>;
    shadow: ShadowPropertyTheme | Property.BoxShadow;
    bgColor: ColorPropertyTheme | Property.BackgroundColor;
    fontColor: ColorPropertyTheme | Property.Color;
    fontSize: FontSizePropertyTheme | Property.FontSize<TLength>;
    fontWeight: FontWeightPropertyTheme | Property.FontWeight;
    fontCase: 'uppercase';
    paddingX: SpacingPropertyTheme | Property.Padding<TLength>;
    paddingY: SpacingPropertyTheme | Property.Padding<TLength>;
    letterSpacing: LetterSpacingPropertyTheme | Property.LetterSpacing<TLength>;
    iconColor: ColorPropertyTheme | Property.Color;
    iconWidth: SizePropertyTheme | Property.Width<TLength>;
    iconHeight: SizePropertyTheme | Property.Height<TLength>;
    marginTop: SpacingPropertyTheme | Property.Margin<TLength>;
    titleBorderBottomWidth: Property.BorderWidth<TLength>;
  };

  properties: {
    fontWeight: FontWeightPropertyTheme | Property.FontWeight;
    paddingY: SpacingPropertyTheme | Property.Padding<TLength>;
  };

  dashboard: {
    [k in DashboardKeys]: {
      bgColor: ColorPropertyTheme | Property.BackgroundColor;
    };
  };

  modal: {
    bgColor: ColorPropertyTheme | Property.BackgroundColor;
    maskColor: ColorPropertyTheme | Property.BackgroundColor;
    maskOpacity: Property.Opacity;
    zIndex: Property.ZIndex;
    xsmallSize: SizePropertyTheme | Property.Height<TLength>;
    smallSize: SizePropertyTheme | Property.Height<TLength>;
    mediumSize: SizePropertyTheme | Property.Height<TLength>;
    largeSize: SizePropertyTheme | Property.Height<TLength>;
    xlargeSize: SizePropertyTheme | Property.Height<TLength>;
    boxShadow: ShadowPropertyTheme | Property.BoxShadow;
    borderRadius: RadiusPropertyTheme | string;
  };
};
export type Palette = AnonymousObject; //TODO create a actual type
export type TLength = string | 0;
export type SizePropertyTheme =
  | Globals
  | TLength
  | '-moz-max-content'
  | '-moz-min-content'
  | '-webkit-max-content'
  | 'auto'
  | 'intrinsic'
  | 'max-content'
  | 'min-content'
  | 'min-intrinsic'
  | 'none'
  | 'full'
  | 'screen'
  | string
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12
  | 16
  | 20
  | 24
  | 32
  | 40
  | 48
  | 56
  | 64
  | 'px'
  | 'xs'
  | 'sm'
  | 'md'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | 'screen-sm'
  | 'screen-md'
  | 'screen-lg'
  | 'screen-xl';

export type ThemeProps = {
  theme?: Partial<Theme>;
};

export type ColorPropertyTheme = keyof typeof ColorKeys;
export type SpacingPropertyTheme = keyof typeof SpacingKeys;
export type FontFamilyPropertyTheme = keyof typeof FontFamiliesKeys;
export type FontSizePropertyTheme = keyof typeof FontSizeKeys;
export type IconSizePropertyTheme = keyof typeof FontSizeKeys;
export type FontWeightPropertyTheme = keyof typeof FontWeightKeys | number;
export type LineHeightPropertyTheme = keyof typeof FontLineHeightKeys | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type LetterSpacingPropertyTheme = keyof typeof FontSpacingKeys;
export type RadiusPropertyTheme = keyof typeof RadiusKeys;
export type ShadowPropertyTheme = keyof typeof ShadowKeys;

export type PropsWithTheme<P, T extends Theme = Theme> = P & {
  theme: T
}

export type ComponentStyle<P extends object, T extends Theme = Theme> = (
  propsWithTheme: PropsWithTheme<P, T>,
) => ReturnType<typeof css>;

export type StylableProps = {
  className?: string;
};
