/* eslint-disable prettier/prettier */
import { AnonymousObject, Collection, lcfirst, toKebabCase } from 'onekijs';
import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { Formatter, Theme, CssProperty } from '../styles/typings';

const formatValue = <T>(value: T, theme: Theme, formatter?: Formatter<T>): string => {
  if (formatter) {
    return formatter(value, theme);
  }
  return String(value);
};

const isPseudoClass = (candidate: string): boolean => {
  return [
    'active',
    'any-link',
    'checked',
    'blank',
    'default',
    'defined',
    'dir',
    'disabled',
    'empty',
    'enabled',
    'first',
    'first-child',
    'first-of-type',
    'fullscreen',
    'focus',
    'focus-visible',
    'focus-within',
    'has',
    'host',
    'host-context',
    'hover',
    'indeterminate',
    'in-range',
    'invalid',
    'is',
    'matches',
    'any',
    'lang',
    'last-child',
    'last-of-type',
    'left',
    'link',
    'not',
    'nth-child',
    'nth-last-child',
    'nth-last-of-type',
    'nth-of-type',
    'only-child',
    'only-of-type',
    'optional',
    'out-of-range',
    'placeholder-shown',
    'read-only',
    'read-write',
    'required',
    'right',
    'root',
    'scope',
    'target',
    'valid',
    'visited',
    'where',
  ].includes(candidate);
};

const isPseudoElement = (candidate: string): boolean => {
  return [
    'after',
    'backdrop',
    'before',
    'cue',
    'cue-region',
    'first-letter',
    'first-line',
    'grammar-error',
    'marker',
    'part',
    'placeholder',
    'selection',
    'slotted',
    'spelling-error',
  ].includes(candidate);
};

export const toCss = <T>(
  property: string | null,
  formatter: Formatter<T> | undefined,
  value: T,
  variants: Collection<any>,
): FlattenInterpolation<ThemeProps<any>> => {
  let result = css`
  ${property === null ? '' : property + ': '}${(props) => formatValue(value, props.theme, formatter)};
`;

  const responsives: AnonymousObject = {
    all: {},
    sm: {},
    md: {},
    lg: {},
    xl: {},
  };

  Object.keys(variants).forEach((variant) => {
    const media = variant.substring(0, 2);
    if (responsives[media]) {
      const pseudo = lcfirst(variant.substring(2)) || 'all';
      responsives[media][pseudo] = variants[variant];
    } else {
      responsives['all'][variant] = variants[variant];
    }
  });

  Object.keys(responsives).forEach((media) => {
    if (media !== 'all' && Object.keys(responsives[media]).length > 0) {
      result = result.concat(css`
        ${(props) => `@media (min-width: ${props.theme.breakpoints[media]}) {`}
      `);
    }
    Object.keys(responsives[media]).forEach((pseudo) => {
      pseudo = toKebabCase(pseudo);
      if (isPseudoClass(pseudo)) {
        result = result.concat(css`
        &:${pseudo} {
          ${property === null ? '' : property + ': '}${(props) =>
          formatValue(responsives[media][pseudo], props.theme, formatter)};
        }
      `);
      } else if (isPseudoElement(pseudo)) {
        result = result.concat(css`
        &::${pseudo} {
          ${property === null ? '' : property + ': '}${(props) =>
          formatValue(responsives[media][pseudo], props.theme, formatter)};
        }
      `);
      } else if (pseudo === 'all') {
        result = result.concat(css`
      ${property === null ? '' : property + ': '}${(props) =>
          formatValue(responsives[media][pseudo], props.theme, formatter)};;
      `);
      }
    });
    if (media !== 'all' && Object.keys(responsives[media]).length > 0) {
      result = result.concat(['}']);
    }
  });

  return result;
};

export const cssProperty = <T>(property: string | null, formatter?: Formatter<T>): CssProperty<T> => {
  return (value: T, variants: Collection<any> = {}): FlattenInterpolation<ThemeProps<any>> => {
    return toCss(property, formatter, value, variants);
  };
};
