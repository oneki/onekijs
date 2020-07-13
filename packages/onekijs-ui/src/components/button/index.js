import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { backgroundColor } from '../../styles/bg';
import { color, fontWeight } from '../../styles/font';
import { paddingX, paddingY } from '../../styles/padding';

export const ButtonComponent = ({ className, children }) => {
  return <button className={className}>{children}</button>;
};

const buttonStyle = ({ kind = 'primary', theme }) => {
  const t = theme.button[kind];
  return css`
    ${backgroundColor(t.backgroundColor, {
      hover: t.hoverBackgroundColor,
    })}
    ${color(t.color)}
    ${fontWeight(t.fontWeight)}
    ${paddingX(t.paddingX)}
    ${paddingY(t.paddingY)}
  `;
};

export const Button = styled(ButtonComponent)`
  ${buttonStyle}
`;

ButtonComponent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.elementType,
};
