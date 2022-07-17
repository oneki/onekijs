import { get, ucfirst } from 'onekijs-framework';
import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderStyle, borderWidth } from '../../styles/border';
import { display } from '../../styles/display';
import { cursor } from '../../styles/interactivity';
import { position } from '../../styles/position';
import { paddingLeft, paddingTop, paddingX, paddingY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import {
  color,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textOverflow,
  textTransform,
  whiteSpace,
} from '../../styles/typography';
import { ButtonProps } from './typings';

const getColor = (key: string, pattern: 'solid' | 'outline' | 'flat', disabled?: boolean): string => {
  return `${key}${pattern === 'solid' ? '' : ucfirst(pattern)}${disabled ? 'Disabled' : ''}`;
};

const buttonStyle: ComponentStyle<ButtonProps> = ({ kind = 'primary', pattern = 'solid', disabled, theme }) => {
  const t = theme.buttons[kind];
  const bgColor = get(t, getColor('bgColor', pattern, disabled));
  const hoverBgColor = get(t, getColor('hoverBgColor', pattern, disabled));
  const fontColor = get(t, getColor('color', pattern, disabled));
  const hoverFontColor = get(t, getColor('hoverColor', pattern, disabled));
  const bColor = get(t, getColor('borderColor', pattern, disabled));
  const hoverBorderColor = get(t, getColor('hoverBorderColor', pattern, disabled));

  return css`
    ${backgroundColor(bgColor, {
      hover: hoverBgColor,
    })}
    ${color(fontColor, {
      hover: hoverFontColor,
    })}
    ${fontWeight(t.fontWeight)}
    ${paddingX(t.paddingX)}
    ${paddingY(t.paddingY)}
    ${borderRadius(t.borderRadius)}
    ${borderStyle(t.borderStyle)}
    ${borderWidth(t.borderWidth)}
    ${borderColor(bColor, {
      hover: hoverBorderColor,
    })}
    ${cursor(disabled ? t.cursorDisabled : t.cursor)}
    ${whiteSpace(t.whiteSpace)}
    ${textOverflow(t.textOverflow)}
    ${textTransform(t.textTransform)}
    ${letterSpacing(t.letterSpacing)}
    ${lineHeight(t.lineHeight)}
    ${fontSize(t.fontSize)}
  `;
};

export const dropdownButtonStyle: ComponentStyle<ButtonProps> = () => {
  return css`
    ${cursor('pointer')}
    ${display('inline-flex')}
    ${position('relative')}
    ${alignItems('center')}
    .o-button-dropdown-icon {
      ${paddingLeft('xs')}
      ${paddingTop('xs')}
    }
  `;
};

export default buttonStyle;
