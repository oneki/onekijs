import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderStyle, borderWidth } from '../../styles/border';
import { display } from '../../styles/display';
import { flexGrow } from '../../styles/flex';
import { appearance, boxSizing, outline } from '../../styles/interactivity';
import { width } from '../../styles/size';
import { padding, paddingX, paddingY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color } from '../../styles/typography';
import { InputProps } from './typings';

const inputStyle: ComponentStyle<InputProps> = ({ theme }) => {
  const t = theme.input;
  return css`
    ${boxSizing('border-box')}
    ${width(t.width)} 
    ${backgroundColor(t.bgColor)}
    ${display('flex')}
    ${alignItems('stretch')}
    ${borderWidth(t.borderWidth)}
    ${borderColor(t.borderColor)}
    ${borderRadius(t.borderRadius)}
    ${borderStyle(t.borderStyle)}
    ${padding('1px')}
    &.o-input-focus {
      ${borderColor(t.borderFocusColor)}
      ${borderWidth(t.borderFocusWidth)}
      ${padding(0)}
    }
    .o-input-field {
      ${width('full')}
      ${flexGrow(1)}
      ${paddingX(t.paddingX)}
      ${paddingY(t.paddingY)}
      ${appearance(t.appearance)}
      ${outline(t.outline)}
      ${borderWidth(0)}
      ${backgroundColor('inherit')}
      ${color(t.fontColor, { placeholder: t.placeholderColor })}         
    }      
  `;
};

export default inputStyle;
