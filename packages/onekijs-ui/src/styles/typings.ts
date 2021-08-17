import { BackgroundColorProperty, ColorProperty, FontWeightProperty, Globals, PaddingProperty } from 'csstype';
import { FlattenInterpolation, ThemedStyledProps, ThemeProps as SytledThemeProps } from 'styled-components';
import { AnonymousObject } from 'onekijs-framework';

export type CssProperty<T> = (value: T, variants?: AnonymousObject) => FlattenInterpolation<SytledThemeProps<any>>;
export type Formatter<T> = (value: T, theme: Theme) => string;
export type Media = 'all' | 'sm' | 'md' | 'lg' | 'xl';
export enum ColorKeys {
  white = 'white',
  lightest = 'lightest',
  light = 'light',
  dark = 'dark',
  darkest = 'darkest',
  black = 'black',
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  primary = 'primary',
  secondary = 'secondary',
}

export enum BreakpointKeys {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

export enum SpacingKeys {
  none = 'none',
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
}

export enum FontSizeKeys {
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
      color: ColorPropertyTheme | ColorProperty;
      fontWeight: FontWeightPropertyTheme | FontWeightProperty;
      hoverBgColor: ColorPropertyTheme | BackgroundColorProperty;
      hoverColor: ColorPropertyTheme | ColorProperty;
      paddingY: SpacingPropertyTheme | PaddingProperty<TLength>;
      paddingX: SpacingPropertyTheme | PaddingProperty<TLength>;
      radius: RadiusPropertyTheme | string;
    };
  };
};
export type ThemeProps = AnonymousObject; //TODO create a actual type
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

export type ColorPropertyTheme = keyof typeof ColorKeys;
export type SpacingPropertyTheme = keyof typeof SpacingKeys;
export type FontFamilyPropertyTheme = keyof typeof FontFamiliesKeys;
export type FontSizePropertyTheme = keyof typeof FontSizeKeys;
export type FontWeightPropertyTheme = keyof typeof FontWeightKeys | number;
export type LineHeightPropertyTheme = keyof typeof FontLineHeightKeys | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type LetterSpacingPropertyTheme = keyof typeof FontSpacingKeys;
export type RadiusPropertyTheme = keyof typeof RadiusKeys;
export type ShadowPropertyTheme = keyof typeof ShadowKeys;

export type ComponentStyle<P, T extends Theme = Theme> = (
  propsWithTheme: ThemedStyledProps<P, T>,
) => FlattenInterpolation<SytledThemeProps<T>>;

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
