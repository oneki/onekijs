import { get, ucfirst } from 'onekijs-framework';
import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderStyle, borderWidth } from '../../styles/border';
import { display } from '../../styles/display';
import { opacity } from '../../styles/effects';
import { cursor, outline } from '../../styles/interactivity';
import { position } from '../../styles/position';
import { marginLeft, marginRight, paddingLeft, paddingX, paddingY } from '../../styles/spacing';
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

const getColor = (key: string, pattern: 'solid' | 'outline' | 'flat'): string => {
  return `${key}${pattern === 'solid' ? '' : ucfirst(pattern)}`;
};

const buttonStyle: ComponentStyle<ButtonProps> = ({
  kind = 'primary',
  pattern = 'solid',
  disabled,
  IconComponent,
  theme,
}) => {
  const t = theme.buttons[kind];
  const bgColor = get(t, getColor('bgColor', pattern)) as string;
  const hoverBgColor = get(t, getColor('hoverBgColor', pattern)) as string;
  const fontColor = get(t, getColor('color', pattern)) as string;
  const hoverFontColor = get(t, getColor('hoverColor', pattern)) as string;
  const bColor = get(t, getColor('borderColor', pattern)) as string;
  const hoverBorderColor = get(t, getColor('hoverBorderColor', pattern)) as string;

  return css`
    ${display('inline-flex')}
    ${alignItems('center')}
    ${backgroundColor(bgColor, {
      hover: disabled ? bgColor : hoverBgColor,
    })}
    ${color(fontColor, {
      hover: disabled ? fontColor : hoverFontColor,
    })}
    ${paddingX(t.paddingX)}
    ${paddingY(t.paddingY)}
    ${borderRadius(t.borderRadius)}
    ${borderStyle(t.borderStyle)}
    ${borderWidth(t.borderWidth)}
    ${borderColor(bColor, {
      hover: disabled ? bColor : hoverBorderColor,
    })}
    ${cursor(disabled ? t.cursorDisabled : t.cursor)}
    button {
      ${cursor(disabled ? t.cursorDisabled : t.cursor)}
      ${backgroundColor('inherit')}
      ${color('inherit')}
      ${fontWeight(t.fontWeight)}
      ${whiteSpace(t.whiteSpace)}
      ${textOverflow(t.textOverflow)}
      ${textTransform(t.textTransform)}
      ${letterSpacing(t.letterSpacing)}
      ${lineHeight(t.lineHeight)}
      ${fontSize(t.fontSize)}
      ${opacity(disabled ? 0.6 : 1)}
      ${marginLeft(IconComponent ? 'xs' : 'none')}
      ${outline('none')}
    }
    .o-icon-loading-container {
      ${marginRight('xs')}
    }
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
    }
    .o-button-dropdown-icon {
      ${paddingLeft('xs')}
      ${display('inline-flex')}
      ${alignItems('center')}
    }
  `;
};

export default buttonStyle;
