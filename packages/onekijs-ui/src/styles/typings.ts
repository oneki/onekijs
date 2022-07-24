import {
  AppearanceProperty,
  BackgroundColorProperty,
  BorderBottomStyleProperty,
  BorderColorProperty,
  BorderRadiusProperty,
  BorderStyleProperty,
  BorderWidthProperty,
  BoxShadowProperty,
  ColorProperty,
  CursorProperty,
  FontSizeProperty,
  FontWeightProperty,
  Globals,
  LetterSpacingProperty,
  LineHeightProperty,
  MarginProperty,
  OpacityProperty,
  OutlineProperty,
  PaddingProperty,
  TextDecorationProperty,
  TextOverflowProperty,
  TextTransformProperty,
  WhiteSpaceProperty,
  WidthProperty,
} from 'csstype';
import { AnonymousObject } from 'onekijs-framework';
import {
  FlattenInterpolation,
  GlobalStyleComponent,
  ThemedStyledProps,
  ThemeProps as SytledThemeProps,
} from 'styled-components';

export type CssProperty<T> = (value: T, variants?: AnonymousObject) => FlattenInterpolation<SytledThemeProps<any>>;
export type Formatter<T> = (value: T, theme: Theme) => string;
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
}

export enum DashboardKeys {
  left = 'left',
  right = 'right',
  header = 'header',
  footer = 'footer',
  body = 'body',
}

export enum BreakpointKeys {
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
  GlobalStyles: GlobalStyleComponent<any, any>;
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
      bgColor: ColorPropertyTheme | BackgroundColorProperty;
      bgColorFlat: ColorPropertyTheme | BackgroundColorProperty;
      bgColorOutline: ColorPropertyTheme | BackgroundColorProperty;
      borderColor: ColorPropertyTheme | BorderColorProperty;
      borderColorFlat: ColorPropertyTheme | BackgroundColorProperty;
      borderColorOutline: ColorPropertyTheme | BackgroundColorProperty;
      borderRadius: RadiusPropertyTheme | string;
      borderStyle: BorderStyleProperty;
      borderWidth: BorderWidthProperty<TLength>;
      color: ColorPropertyTheme | ColorProperty;
      colorFlat: ColorPropertyTheme | BackgroundColorProperty;
      colorOutline: ColorPropertyTheme | BackgroundColorProperty;
      cursor: CursorProperty;
      cursorDisabled: CursorProperty;
      fontSize: FontSizePropertyTheme | FontSizeProperty<TLength>;
      fontWeight: FontWeightPropertyTheme | FontWeightProperty;
      hoverBgColor: ColorPropertyTheme | BackgroundColorProperty;
      hoverBgColorFlat: ColorPropertyTheme | BackgroundColorProperty;
      hoverBgColorOutline: ColorPropertyTheme | BackgroundColorProperty;
      hoverBorderColor: ColorPropertyTheme | BackgroundColorProperty;
      hoverBorderColorFlat: ColorPropertyTheme | BackgroundColorProperty;
      hoverBorderColorOutline: ColorPropertyTheme | BackgroundColorProperty;
      hoverColor: ColorPropertyTheme | ColorProperty;
      hoverColorFlat: ColorPropertyTheme | BackgroundColorProperty;
      hoverColorOutline: ColorPropertyTheme | BackgroundColorProperty;
      letterSpacing: LetterSpacingPropertyTheme | LetterSpacingProperty<TLength>;
      lineHeight: LineHeightPropertyTheme | LineHeightProperty<TLength>;
      opacity: OpacityProperty;
      opacityDisabled: OpacityProperty;
      paddingY: SpacingPropertyTheme | PaddingProperty<TLength>;
      paddingX: SpacingPropertyTheme | PaddingProperty<TLength>;
      textOverflow: TextOverflowProperty;
      textTransform: TextTransformProperty;
      whiteSpace: WhiteSpaceProperty;
    };
  };

  fieldLayout: {
    marginY: MarginProperty<TLength> | SpacingPropertyTheme;
    helperMarginLeft: MarginProperty<TLength> | SpacingPropertyTheme;
    helperColor: ColorProperty | ColorPropertyTheme;
    descriptionFontSize: FontSizePropertyTheme | FontSizeProperty<TLength>;
    descriptionColor: ColorProperty | ColorPropertyTheme;
  };

  table: {
    bgColor: ColorPropertyTheme | BackgroundColorProperty;
    shadow: ShadowPropertyTheme | BoxShadowProperty;
    thPaddingX: SpacingPropertyTheme | PaddingProperty<TLength>;
    thPaddingY: SpacingPropertyTheme | PaddingProperty<TLength>;
    thBorderBottomWidth: number | BorderWidthProperty<TLength>;
    thBorderBottomColor: ColorPropertyTheme | BorderColorProperty;
    thBgColor: ColorPropertyTheme | BackgroundColorProperty;
    thFontWeigth: FontWeightPropertyTheme | FontWeightProperty;
    thFontColor: ColorPropertyTheme | ColorProperty;
    thFontCase: TextTransformProperty;
    thFontSize: FontSizePropertyTheme | FontSizeProperty<TLength>;
    thLetterSpacing: LetterSpacingPropertyTheme | LetterSpacingProperty<TLength>;
    thFilterInputBgColor: ColorPropertyTheme | BackgroundColorProperty;
    thFilterInputFontSize: FontSizePropertyTheme | FontSizeProperty<TLength>;
    thFilterInputPaddingX: SpacingPropertyTheme | PaddingProperty<TLength>;
    thFilterInputPaddingY: SpacingPropertyTheme | PaddingProperty<TLength>;
    tdFontColor: ColorPropertyTheme | ColorProperty;
    tdPaddingX: SpacingPropertyTheme | PaddingProperty<TLength>;
    tdPaddingY: SpacingPropertyTheme | PaddingProperty<TLength>;
    tdBorderBottomColor: ColorPropertyTheme | BorderColorProperty;
    tdBorderBottomWidth: number | BorderWidthProperty<TLength>;
    tdBorderBottomStyle: BorderBottomStyleProperty;
    tdStripBgColor: ColorPropertyTheme | BackgroundColorProperty;
    tdHoverBgColor: ColorPropertyTheme | BackgroundColorProperty;
    tdHoverFontColor: ColorPropertyTheme | ColorProperty;
    tdExpandedBgColor: ColorPropertyTheme | BackgroundColorProperty;
  };

  input: {
    bgColor: ColorPropertyTheme | BackgroundColorProperty;
    width: SizePropertyTheme | WidthProperty<TLength>;
    borderWidth: number | BorderWidthProperty<TLength>;
    borderColor: ColorPropertyTheme | BorderColorProperty;
    borderRadius: RadiusPropertyTheme | string;
    borderStyle: BorderBottomStyleProperty;
    borderFocusColor: ColorPropertyTheme | BorderColorProperty;
    borderFocusWidth: number | BorderWidthProperty<TLength>;
    paddingX: SpacingPropertyTheme | PaddingProperty<TLength>;
    paddingY: SpacingPropertyTheme | PaddingProperty<TLength>;
    appearance: AppearanceProperty;
    outline: OutlineProperty<TLength>;
    fontColor: ColorPropertyTheme | ColorProperty;
    placeholderColor: ColorPropertyTheme | ColorProperty;
  };

  checkbox: {
    bgColor: ColorPropertyTheme | BackgroundColorProperty;
    color: ColorPropertyTheme | BackgroundColorProperty;
  };

  label: {
    fontWeight: FontWeightPropertyTheme | FontWeightProperty;
    fontCase: TextTransformProperty;
    fontColor: ColorPropertyTheme | ColorProperty;
    fontSize: FontSizePropertyTheme | FontSizeProperty<TLength>;
    letterSpacing: LetterSpacingPropertyTheme | LetterSpacingProperty<TLength>;
    requiredColor: ColorPropertyTheme | ColorProperty;
    requiredWeight: FontWeightPropertyTheme | FontWeightProperty;
    requiredMarginLeft: SpacingPropertyTheme | MarginProperty<TLength>;
    helperIconColor: ColorPropertyTheme | ColorProperty;
    helperMarginLeft: SpacingPropertyTheme | MarginProperty<TLength>;
  };

  link: {
    fontWeight: FontWeightPropertyTheme | FontWeightProperty;
    fontColor: ColorPropertyTheme | ColorProperty;
    textDecoration: TextDecorationProperty<TLength>;
    fontWeightHover: FontWeightPropertyTheme | FontWeightProperty;
    fontColorHover: ColorPropertyTheme | ColorProperty;
    textDecorationHover: TextDecorationProperty<TLength>;
  };

  tooltip: {
    [k in ColorKeys]: {
      bgColor: ColorPropertyTheme | BackgroundColorProperty;
      color: ColorPropertyTheme | ColorProperty;
      borderColor: ColorPropertyTheme | BackgroundColorProperty;
      borderRadius: BorderRadiusProperty<TLength> | RadiusPropertyTheme;
      borderStyle: BorderStyleProperty;
      borderWidth: BorderWidthProperty<TLength>;
      boxShadow: ShadowPropertyTheme | BoxShadowProperty;
      padding: SpacingPropertyTheme | PaddingProperty<TLength>;
      fontSize: FontSizePropertyTheme | FontSizeProperty<TLength>;
    };
  };

  accordion: {
    fontWeight: FontWeightPropertyTheme | FontWeightProperty;
    fontColor: ColorPropertyTheme | ColorProperty;
    activeFontColor: ColorPropertyTheme | BackgroundColorProperty;
    hoverFontColor: ColorPropertyTheme | BackgroundColorProperty;
    fontSize: FontSizePropertyTheme | FontSizeProperty<TLength>;
    togglerIconWidth: WidthProperty<TLength> | IconSizePropertyTheme;
    togglerIconHeight: WidthProperty<TLength> | IconSizePropertyTheme;
    bgColor: ColorPropertyTheme | BackgroundColorProperty;
    activeBgColor: ColorPropertyTheme | BackgroundColorProperty;
    hoverBgColor: ColorPropertyTheme | BackgroundColorProperty;
    borderColor: ColorPropertyTheme | BackgroundColorProperty;
    borderRadius: BorderRadiusProperty<TLength> | RadiusPropertyTheme;
    borderStyle: BorderStyleProperty;
    borderWidth: BorderWidthProperty<TLength>;
    paddingX: SpacingPropertyTheme | PaddingProperty<TLength>;
    paddingY: SpacingPropertyTheme | PaddingProperty<TLength>;
  };

  dashboard: {
    [k in DashboardKeys]: {
      bgColor: ColorPropertyTheme | BackgroundColorProperty;
    };
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

export type ComponentStyle<P, T extends Theme = Theme> = (
  propsWithTheme: ThemedStyledProps<P, T>,
) => FlattenInterpolation<SytledThemeProps<T>>;

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
