import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderStyle, borderWidth } from '../../styles/border';
import { display } from '../../styles/display';
import { flexGrow } from '../../styles/flex';
import { appearance, boxSizing, cursor, outline } from '../../styles/interactivity';
import { width } from '../../styles/size';
import { padding, paddingX, paddingY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize } from '../../styles/typography';
import { TextareaProps } from './typings';

const textareaStyle: ComponentStyle<TextareaProps> = ({ theme, disabled }) => {
  const t = theme.textarea;
  return css`
    ${boxSizing('border-box')}
    ${width(t.width)}
    ${backgroundColor(disabled ? 'lighter' : t.bgColor)}
    ${display('flex')}
    ${alignItems('center')}
    ${borderWidth(t.borderWidth)}
    ${borderColor(t.borderColor)}
    ${borderRadius(t.borderRadius)}
    ${borderStyle(t.borderStyle)}
    ${padding('1px')}
    ${cursor(disabled ? 'not-allowed' : 'auto')}
    textarea {
      ${cursor(disabled ? 'not-allowed' : 'auto')}
    }
    &.o-textarea-focus {
      ${borderColor(t.borderFocusColor)}
      ${borderWidth(t.borderFocusWidth)}
      ${padding(0)}
    }
    .o-textarea-field {
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

    &.o-textarea-size-xsmall textarea {
      ${paddingY(0)}
      ${fontSize('sm')}
    }
    &.o-textarea-size-small textarea {
      ${paddingY('xs')}
      ${fontSize('sm')}
    }
    &.o-textarea-size-medium textarea {
      ${paddingY('sm')}
      ${fontSize('default')}
    }

    &.o-textarea-size-large textarea {
      ${paddingY('md')}
      ${fontSize('default')}
    }

    &.o-textarea-size-xlarge textarea {
      ${paddingY('lg')}
      ${fontSize('lg')}
    }

    &.o-textarea-status-error {
      ${borderColor('danger')}
    }

    &.o-textarea-status-warning {
      ${borderColor('warning')}
    }

    &.o-textarea-status-success {
      ${borderColor('success')}
    }
  `;
};

export default textareaStyle;
