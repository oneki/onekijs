import PropTypes from 'prop-types';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { backgroundColor } from '../../styles/background';
import { paddingX, paddingY } from '../../styles/spacing';
import { Theme } from '../../styles/typings';
import { color, fontWeight } from '../../styles/typography';

export const ButtonComponent: FC<React.InputHTMLAttributes<HTMLButtonElement>> = ({ className, children }) => {
  return <button className={className}>{children}</button>;
};

const buttonStyle = ({ kind = 'primary', theme }: { kind: string; theme: Theme }) => {
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
