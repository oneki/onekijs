import { css } from 'styled-components';
import { backgroundColor } from '../../styles/background';
import { paddingX, paddingY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontWeight } from '../../styles/typography';
import { ButtonProps } from './typings';

const buttonStyle: ComponentStyle<ButtonProps> = ({ kind = 'primary', theme }) => {
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

export default buttonStyle;
