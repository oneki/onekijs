import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderRadius, borderStyle } from '../../styles/border';
import { display } from '../../styles/display';
import { cursor } from '../../styles/interactivity';
import { position } from '../../styles/position';
import { paddingLeft, paddingX, paddingY } from '../../styles/spacing';
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

export const dropdownButtonStyle: ComponentStyle<ButtonProps> = () => {
  return css`
    ${cursor('pointer')}
    ${display('inline-flex')}
    ${position('relative')}
    ${alignItems('center')}
    button {
      ${display('inline-flex')}
      ${alignItems('center')}
      .o-button-dropdown-icon {
        ${paddingLeft('xs')}
      }
    }
  `;
};

export default buttonStyle;
