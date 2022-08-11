import { get, ucfirst } from 'onekijs-framework';
import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderStyle, borderWidth } from '../../styles/border';
import { display } from '../../styles/display';
import { opacity } from '../../styles/effects';
import { cursor } from '../../styles/interactivity';
import { position } from '../../styles/position';
import { marginLeft, paddingLeft, paddingTop, paddingX, paddingY } from '../../styles/spacing';
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
  const bgColor = get(t, getColor('bgColor', pattern));
  const hoverBgColor = get(t, getColor('hoverBgColor', pattern));
  const fontColor = get(t, getColor('color', pattern));
  const hoverFontColor = get(t, getColor('hoverColor', pattern));
  const bColor = get(t, getColor('borderColor', pattern));
  const hoverBorderColor = get(t, getColor('hoverBorderColor', pattern));

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
    }
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
