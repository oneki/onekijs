/* eslint-disable prettier/prettier */
import { css } from 'styled-components';
import { lcfirst } from './string';

const formatValue = (value, formatter, theme) => {
  if (formatter === null || formatter === undefined) {
    return value;
  }
  if (typeof formatter === 'function') {
    return formatter(value);
  }
  return theme[formatter][value];
}

export const cssProperty = (property, formatter, value, variants = {}) => {
  let result = css`
    ${property}: ${props => formatValue(value, formatter, props.theme)};
  `;

  const responsives = {
    all: {},
    sm: {},
    md: {},
    lg: {},
    xl: {},
  };

  Object.keys(variants).forEach(variant => {
    const media = variant.substring(0,2);
    if (responsives[media]) {
      const pseudoClass = lcfirst(variant.substring(2)) || 'all';
      responsives[media][pseudoClass] = variants[variant];
    } else {
      responsives['all'][variant] = variants[variant];
    }
  })

  Object.keys(responsives).forEach(media => {

    if (media !== 'all' && Object.keys(responsives[media]).length > 0) {
      result = result.concat(css`
        ${props => `@media (min-width: ${props.theme.breakpoints[media]}) {`}
    `);      
    }
    Object.keys(responsives[media]).forEach(pseudoClass => {
      if (['hover', 'focus', 'active', 'visited', 'focusWithin'].includes(pseudoClass)) {
        const cssPseudoClass = (pseudoClass === 'focusWithin') ? 'focus-within' : pseudoClass;
        result = result.concat(css`
          &:${cssPseudoClass} {
            ${property}: ${props => formatValue(responsives[media][pseudoClass], formatter, props.theme)};
          }
        `);
      } else if (pseudoClass === 'all') {
        result = result.concat(css`
          ${property}: ${props => formatValue(responsives[media][pseudoClass], formatter, props.theme)};
        `);
      }
    });
    if (media !== 'all' && Object.keys(responsives[media]).length > 0) {
      result = result.concat(['}']);
    }    
  });

  return result;
};