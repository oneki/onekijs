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
  size = 'medium',
  disabled,
  IconComponent,
  theme,
}) => {
  const uSize = ucfirst(size);
  const t = theme.buttons[kind];
  const bgColor = get<any>(t, getColor('bgColor', pattern)) as string;
  const hoverBgColor = get<any>(t, getColor('hoverBgColor', pattern)) as string;
  const fontColor = get<any>(t, getColor('color', pattern)) as string;
  const hoverFontColor = get<any>(t, getColor('hoverColor', pattern)) as string;
  const bColor = get<any>(t, getColor('borderColor', pattern)) as string;
  const hoverBorderColor = get<any>(t, getColor('hoverBorderColor', pattern)) as string;
  const tPaddingX = get<any>(t, `paddingX${uSize}`) as string;
  const tPaddingY = get<any>(t, `paddingY${uSize}`) as string;
  const tBorderRadius = get<any>(t, `borderRadius${uSize}`) as string;
  const tBorderWidth = get<any>(t, `borderWidth${uSize}`) as string;
  const tLineHeight = get<any>(t, `lineHeight${uSize}`) as string;
  const tFontSize = get<any>(t, `fontSize${uSize}`) as string;
  const tLetterSpacing = get<any>(t, `letterSpacing${uSize}`) as string;

  return css`
    ${display('inline-flex')}
    ${alignItems('center')}
    ${backgroundColor(bgColor, {
      hover: disabled ? bgColor : hoverBgColor,
    })}
    ${color(fontColor, {
      hover: disabled ? fontColor : hoverFontColor,
    })}
    ${paddingX(tPaddingX)}
    ${paddingY(tPaddingY)}
    ${borderRadius(tBorderRadius)}
    ${borderStyle(t.borderStyle)}
    ${borderWidth(tBorderWidth)}
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
      ${letterSpacing(tLetterSpacing)}
      ${lineHeight(tLineHeight)}
      ${fontSize(tFontSize)}
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
