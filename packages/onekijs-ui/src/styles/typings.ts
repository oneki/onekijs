import { AnonymousObject } from 'onekijs';
import { FlattenInterpolation, ThemeProps } from 'styled-components';
import { Globals } from 'csstype';

export type CssProperty<T> = (value: T, variants?: AnonymousObject) => FlattenInterpolation<ThemeProps<any>>;
export type Formatter<T> = (value: T, theme: Theme) => string;
export type Media = 'all' | 'sm' | 'md' | 'lg' | 'xl';
export type Theme = AnonymousObject;
export type TLength = string | 0;
export type SizeProperty =
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
  | string;
export type ColorPropertyTheme = string;
export type SpacingPropertyTheme =
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
  | 'px';
export type FontFamilyPropertyTheme = 'mono' | 'sans' | 'serif';
export type FontSizePropertyTheme = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
export type FontWeightPropertyTheme =
  | 'hairline'
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type LineHeightPropertyTheme =
  | 'none'
  | 'tight'
  | 'snug'
  | 'normal'
  | 'relaxed'
  | 'loose'
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10;

export type LetterSpacingPropertyTheme = 'tighte' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

export type RadiusPropertyTheme = 'none' | 'sm' | 'default' | 'md' | 'lg' | 'full';

export type ShadowPropertyTheme = 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'outline' | 'none';
