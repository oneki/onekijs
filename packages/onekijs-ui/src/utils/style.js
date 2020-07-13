/* eslint-disable prettier/prettier */
import { css } from 'styled-components';
import { lcfirst } from './string';

const mediaMinWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}

export const cssProperty = (property, category, value, variants = {}) => {
  let result = css`
    ${property}: ${props => props.theme[category][value]};
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
      result = result.concat(['@media (min-width: ' + mediaMinWidth[media] + ') {']);
    }
    Object.keys(responsives[media]).forEach(pseudoClass => {
      if (['hover', 'focus', 'active', 'visited', 'focusWithin'].includes(pseudoClass)) {
        const cssPseudoClass = (pseudoClass === 'focusWithin') ? 'focus-within' : pseudoClass;
        result = result.concat(css`
          &:${cssPseudoClass} {
            ${property}: ${props => props.theme[category][responsives[media][pseudoClass]]};
          }
        `);
      } else if (pseudoClass === 'all') {
        result = result.concat(css`
          ${property}: ${props => props.theme[category][responsives[media][pseudoClass]]};
        `);
      }
    });
    if (media !== 'all' && Object.keys(responsives[media]).length > 0) {
      result = result.concat(['}']);
    }    
  });

  return result;
};