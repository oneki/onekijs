import { FCC, get, set, simpleMergeDeep } from 'onekijs-framework';
import {
  BaseTheme,
  baseTheme,
  colorFormatter,
  ColorKeys,
  lighten,
  Palette,
  preflight,
  Theme,
  themeFormatter,
  ThemeProps,
  toCss,
} from 'onekijs-ui';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

const getColor = (color: string, theme: Theme): string => {
  const c = get<any>(theme.colors, color, color);
  return get<any>(theme.palette.colors, c, c);
};

const GlobalStyles = createGlobalStyle`
  ${preflight()}
  html {
    font-size: 125%;

  }
  body {
    ${toCss('font-size', themeFormatter('font.sizes'), 'default', {})}
    ${toCss('font-family', themeFormatter('font.families'), 'sans', {})}
    line-height: 1.2rem;
    font-weight: 400;
    ${toCss(null, colorFormatter('color'), 'gray-700', {})}
    ${toCss(null, colorFormatter('background-color'), 'background', {})}
    margin: 0;
  }
  a {
    ${toCss('font-weight', themeFormatter('link'), 'fontWeight', {})}
    ${toCss('text-decoration', themeFormatter('link'), 'textDecoration', {})}
    color: ${(props) => getColor(props.theme.link.fontColor, props.theme)};
    &:hover {
      ${toCss('font-weight', themeFormatter('link'), 'fontWeightHover', {})}
      ${toCss('text-decoration', themeFormatter('link'), 'textDecorationHover', {})}
      color: ${(props) => getColor(props.theme.link.fontColorHover, props.theme)};
    }
  }
`;

export const clarityPalette: Palette = {
  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    black: '#000',
    white: '#fff',
    'gray-0': 'hsl(198, 0%, 98%)',
    'gray-100': 'hsl(198, 0%, 95%)',
    'gray-200': 'hsl(198, 0%, 91%)',
    'gray-300': 'hsl(198, 0%, 87%)',
    'gray-400': 'hsl(198, 0%, 80%)',
    'gray-500': 'hsl(198, 0%, 70%)',
    'gray-600': 'hsl(198, 0%, 55%)',
    'gray-700': 'hsl(198, 0%, 40%)',
    'gray-800': 'hsl(198, 0%, 27%)',
    'gray-900': 'hsl(198, 0%, 20%)',
    'gray-1000': 'hsl(198, 0%, 13%)',
    'red-0': 'hsl(9, 100%, 97%)',
    'red-100': 'hsl(9, 95%, 92%)',
    'red-200': 'hsl(9, 91%, 86%)',
    'red-300': 'hsl(9, 83%, 76%)',
    'red-400': 'hsl(9, 85%, 67%)',
    'red-500': 'hsl(9, 88%, 61%)',
    'red-600': 'hsl(9, 92%, 50%)',
    'red-700': 'hsl(9, 100%, 43%)',
    'red-800': 'hsl(9, 100%, 38%)',
    'red-900': 'hsl(9, 100%, 30%)',
    'red-1000': 'hsl(9, 100%, 20%)',
    'orange-100': '#fffaf0',
    'orange-200': '#feebc8',
    'orange-300': '#fbd38d',
    'orange-400': '#f6ad55',
    'orange-500': '#ed8936',
    'orange-600': '#dd6b20',
    'orange-700': '#c05621',
    'orange-800': '#9c4221',
    'orange-900': '#7b341e',
    'yellow-0': 'hsl(48, 100%, 95%)',
    'yellow-100': 'hsl(48, 100%, 89%)',
    'yellow-200': 'hsl(48, 100%, 83%)',
    'yellow-300': 'hsl(48, 98%, 72%)',
    'yellow-400': 'hsl(48, 94%, 57%)',
    'yellow-500': 'hsl(48, 95%, 48%)',
    'yellow-600': 'hsl(46, 100%, 45%)',
    'yellow-700': 'hsl(43, 100%, 42%)',
    'yellow-800': 'hsl(41, 100%, 36%)',
    'yellow-900': 'hsl(38, 100%, 28%)',
    'yellow-1000': 'hsl(31, 100%, 19%)',
    'green-0': 'hsl(93, 52%, 88%)',
    'green-100': 'hsl(93, 58%, 75%)',
    'green-200': 'hsl(93, 76%, 49%)',
    'green-300': 'hsl(93, 77%, 44%)',
    'green-400': 'hsl(93, 79%, 40%)',
    'green-500': 'hsl(93, 67%, 38%)',
    'green-600': 'hsl(93, 85%, 32%)',
    'green-700': 'hsl(93, 100%, 26%)',
    'green-800': 'hsl(93, 100%, 21%)',
    'green-900': 'hsl(93, 100%, 16%)',
    'green-1000': 'hsl(93, 100%, 13%)',
    'teal-100': '#e6fffa',
    'teal-200': '#b2f5ea',
    'teal-300': '#81e6d9',
    'teal-400': '#4fd1c5',
    'teal-500': '#38b2ac',
    'teal-600': '#319795',
    'teal-700': '#2c7a7b',
    'teal-800': '#285e61',
    'teal-900': '#234e52',
    'blue-0': 'hsl(198, 83%, 94%)',
    'blue-100': 'hsl(198, 81%, 88%)',
    'blue-200': 'hsl(198, 78%, 78%)',
    'blue-300': 'hsl(198, 69%, 69%)',
    'blue-400': 'hsl(198, 66%, 57%)',
    'blue-500': 'hsl(198, 80%, 46%)',
    'blue-600': 'hsl(198, 100%, 32%)',
    'blue-700': 'hsl(198, 100%, 28%)',
    'blue-800': 'hsl(198, 100%, 24%)',
    'blue-900': 'hsl(198, 100%, 21%)',
    'blue-1000': 'hsl(198, 100%, 15%)',
    'indigo-100': '#ebf4ff',
    'indigo-200': '#c3dafe',
    'indigo-300': '#a3bffa',
    'indigo-400': '#7f9cf5',
    'indigo-500': '#667eea',
    'indigo-600': '#5a67d8',
    'indigo-700': '#4c51bf',
    'indigo-800': '#434190',
    'indigo-900': '#3c366b',
    'purple-0': 'hsl(282, 100%, 95%)',
    'purple-100': 'hsl(282, 59%, 87%)',
    'purple-200': 'hsl(282, 51%, 78%)',
    'purple-300': 'hsl(282, 45%, 70%)',
    'purple-400': 'hsl(282, 44%, 62%)',
    'purple-500': 'hsl(282, 43%, 54%)',
    'purple-600': 'hsl(282, 50%, 45%)',
    'purple-700': 'hsl(282, 69%, 37%)',
    'purple-800': 'hsl(282, 100%, 29%)',
    'purple-900': 'hsl(282, 100%, 22%)',
    'purple-1000': 'hsl(282, 100%, 14%)',
    'pink-100': '#fff5f7',
    'pink-200': '#fed7e2',
    'pink-300': '#fbb6ce',
    'pink-400': '#f687b3',
    'pink-500': '#ed64a6',
    'pink-600': '#d53f8c',
    'pink-700': '#b83280',
    'pink-800': '#97266d',
    'pink-900': '#702459',
  },
};

export const clarityTheme = (customTheme: Partial<Theme> = {}): Theme => {
  const clarityTheme = {
    palette: clarityPalette,
    colors: {
      white: 'white',
      lightest: 'gray-100',
      lighter: 'gray-200',
      light: 'gray-400',
      dark: 'gray-600',
      darker: 'gray-700',
      darkest: 'gray-900',
      black: 'black',
      success: 'green-700',
      info: 'blue-500',
      warning: 'yellow-700',
      danger: 'red-700',
      primary: 'blue-600',
      secondary: 'blue-1000',
      blue: 'blue-600',
      red: 'red-600',
      purple: 'purple-600',
      pink: 'pink-600',
      indigo: 'indigo-600',
      teal: 'teal-600',
      orange: 'orange-600',
      yellow: 'yellow-700',
      green: 'green-600',
      lightblue: 'blue-400',
      lightred: 'red-400',
      lightpurple: 'purple-400',
      lightpink: 'pink-400',
      lightindigo: 'indigo-400',
      lightteal: 'teal-400',
      lightorange: 'orange-400',
      lightyellow: 'yellow-400',
      lightgreen: 'green-400',
      background: 'gray-0',
    },

    spacings: {
      none: '0',
      '2xs': '0.1rem',
      xs: '0.2rem',
      sm: '0.4rem',
      md: '0.6rem',
      lg: '0.8rem',
      xl: '1rem',
      '2xl': '1.2rem',
      '3xl': '1.6rem',
      '4xl': '2rem',
      '5xl': '2.4rem',
      '6xl': '3.2rem',
      '7xl': '4rem',
      '8xl': '4.8rem',
      '9xl': '6.4rem',
      '10xl': '8rem',
      '11xl': '9.6rem',
      '12xl': '11.2rem',
      '13xl': '12.8rem',
      px: '1px',
    },

    font: {
      families: {
        sans: '"Clarity City", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
        mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      },
      lineHeights: {
        none: '0.7rem',
        xs: '0.875rem',
        sm: '1rem',
        md: '1.2rem',
        lg: '1.4rem',
        xl: '1.6rem',
        '2xl': '1.8rem',
        '3xl': '2rem',
        '4xl': '2.4rem',
      },
      sizes: {
        '2xs': '.55rem',
        xs: '.65rem',
        sm: '.7rem',
        md: '.8rem',
        lg: '.9rem',
        xl: '1rem',
        '2xl': '1.2rem',
        '3xl': '1.4rem',
        '4xl': '1.6rem',
        '5xl': '1.8rem',
        '6xl': '2rem',
        default: '.7rem',
      },
      spacings: {
        xs: '-0.05em',
        sm: '-0.02em',
        md: 0,
        lg: '0.02em',
        xl: '0.05em',
        '2xl': '0.08em',
        '3xl': '0.12em',
      },
    },
    radius: {
      none: 0,
      '2xs': '0.1rem',
      xs: '0.15rem',
      sm: '0.2rem',
      md: '0.3rem',
      lg: '0.4rem',
      xl: '0.5rem',
      full: '9999px',
    },

    sizes: {
      0: 0,
      1: '0.2rem',
      2: '0.4rem',
      3: '0.6rem',
      4: '0.8rem',
      5: '1rem',
      6: '1.2rem',
      8: '1.6rem',
      10: '2rem',
      12: '2.4rem',
      16: '3.2rem',
      20: '4rem',
      24: '4.8rem',
      32: '6.4rem',
      40: '8rem',
      48: '9.6rem',
      56: '11.2rem',
      64: '12.8rem',
      px: '1px',
      xs: '16rem',
      sm: '20rem',
      md: '24rem',
      lg: '28rem',
      xl: '32rem',
      '2xl': '36rem',
      '3xl': '44rem',
      '4xl': '52rem',
      '5xl': '60rem',
      '6xl': '68rem',
      'screen-sm': '640px',
      'screen-md': '768px',
      'screen-lg': '1024px',
      'screen-xl': '1280px',
    },

    fieldLayout: {
      descriptionColor: 'gray-500',
      descriptionFontSize: 'sm',
    },

    label: {
      fontWeight: 600,
    },

    link: {
      fontWeight: 500,
      fontWeightHover: 500,
    },

    accordion: {
      hoverBgColor: 'lightest',
      activeBgColor: 'inherit',
      activeFontColor: 'primary',
    },

    table: {
      shadow: 'none',
    },

    GlobalStyles,
  };

  clarityTheme.accordion.activeBgColor = lighten(get<any>(clarityTheme.colors, 'primary', ''), 500);



  Object.keys(ColorKeys).forEach((kind) => {
    set<any>(clarityTheme, `buttons.${kind}.fontWeight`, 'medium');
    set<any>(clarityTheme, `buttons.${kind}.hoverBgColor`, lighten(get<any>(clarityTheme.colors, kind, ''), 100));
    set<any>(clarityTheme, `buttons.${kind}.hoverBorderColor`, lighten(get<any>(clarityTheme.colors, kind, ''), 100));
    set<any>(clarityTheme, `buttons.${kind}.textTransform`, 'uppercase');
    set<any>(clarityTheme, `buttons.${kind}.letterSpacingSmall`, '3xl');
    set<any>(clarityTheme, `buttons.${kind}.letterSpacingMedium`, '3xl');
    set<any>(clarityTheme, `buttons.${kind}.letterSpacingLarge`, '3xl');
    set<any>(clarityTheme, `buttons.${kind}.fontSizeSmall`, '2xs');
    set<any>(clarityTheme, `buttons.${kind}.fontSizeMedium`, 'xs');
    set<any>(clarityTheme, `buttons.${kind}.fontSizeLarge`, 'sm');
    set<any>(clarityTheme, `buttons.${kind}.lineHeightSmall`, 'lg');
    set<any>(clarityTheme, `buttons.${kind}.lineHeightMedium`, '2xl');
    set<any>(clarityTheme, `buttons.${kind}.lineHeightLarge`, '4xl');
    set<any>(clarityTheme, `buttons.${kind}.borderRadiusSmall`, 'xs');
    set<any>(clarityTheme, `buttons.${kind}.borderRadiusMedium`, 'xs');
    set<any>(clarityTheme, `buttons.${kind}.borderRadiusLarge`, 'xs');
    set<any>(clarityTheme, `buttons.${kind}.paddingXSmall`, 'sm');
    set<any>(clarityTheme, `buttons.${kind}.paddingXMedium`, 'md');
    set<any>(clarityTheme, `buttons.${kind}.paddingXLarge`, 'lg');
    set<any>(
      clarityTheme,
      `buttons.${kind}.hoverBgColorOutline`,
      lighten(get<any>(clarityTheme.colors, kind, ''), 700),
    );
    set<any>(
      clarityTheme,
      `tooltip.${kind}.color`,
      kind.startsWith('light') || ['white'].includes(kind) ? 'darkest' : 'white',
    );
  });

  return baseTheme(simpleMergeDeep(customTheme, clarityTheme)) as Theme;
};

export const ClarityTheme: FCC<ThemeProps> = (props) => {
  return <BaseTheme theme={clarityTheme(props.theme)} {...props} />;
};
