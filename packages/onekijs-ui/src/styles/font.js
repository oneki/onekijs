import { css } from 'styled-components';

export const color = (color, variants = {}) => {
  return css`
    color: ${props => props.theme.colors[color]};
  `;
};

export const fontWeight = (weight, variants = {}) => {
  return css`
    font-weight: ${props => props.theme.weights[weight]};
  `;
};
