import { css } from 'styled-components';

export const backgroundColor = (color, variants = {}) => {
  let result = css`
    background-color: ${props => props.theme.colors[color]};
  `;
  if (variants.hover) {
    result = result.concat(css`
      &:hover {
        background-color: ${props => props.theme.colors[variants.hover]};
      }
    `);
  }
  return result;
};
