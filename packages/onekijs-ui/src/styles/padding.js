import { css } from 'styled-components';

export const padding = (spacing, variants = {}) => {
  return css`
    padding: ${props => props.theme.spacings[spacing]};
  `;
};

export const paddingY = (spacing, variants = {}) => {
  return css`
    padding-top: ${props => props.theme.spacings[spacing]};
    padding-bottom: ${props => props.theme.spacings[spacing]};
  `;
};

export const paddingX = (spacing, variants = {}) => {
  return css`
    padding-left: ${props => props.theme.spacings[spacing]};
    padding-right: ${props => props.theme.spacings[spacing]};
  `;
};

export const paddingLeft = (spacing, variants = {}) => {
  return css`
    padding-left: ${props => props.theme.spacings[spacing]};
  `;
};

export const paddingRight = (spacing, variants = {}) => {
  return css`
    padding-right: ${props => props.theme.spacings[spacing]};
  `;
};

export const paddingTop = (spacing, variants = {}) => {
  return css`
    padding-top: ${props => props.theme.spacings[spacing]};
  `;
};

export const paddingBottom = (spacing, variants = {}) => {
  return css`
    padding-bottom: ${props => props.theme.spacings[spacing]};
  `;
};
