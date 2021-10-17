import { css } from 'styled-components';
import { backgroundColor } from '../../styles/background';
import { borderRadius, borderStyle } from '../../styles/border';
import { cursor } from '../../styles/interactivity';
import { paddingX, paddingY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontWeight } from '../../styles/typography';
import { ButtonProps } from './typings';

const buttonStyle: ComponentStyle<ButtonProps> = ({ kind = 'primary', theme }) => {
  const t = theme.buttons[kind];

  return css`
    ${backgroundColor(t.bgColor, {
      hover: t.hoverBgColor,
    })}
    ${color(t.color)}
    ${fontWeight(t.fontWeight)}
    ${paddingX(t.paddingX)}
    ${paddingY(t.paddingY)}
    ${borderRadius(t.radius)}
    ${borderStyle('none')}
    ${cursor('pointer')}
  `;
};

export default buttonStyle;
