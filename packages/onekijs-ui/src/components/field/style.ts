import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderBottomColor, borderBottomStyle, borderBottomWidth } from '../../styles/border';
import { display } from '../../styles/display';
import { flexDirection } from '../../styles/flex';
import { cursor } from '../../styles/interactivity';
import { height, minHeight, width } from '../../styles/size';
import { marginLeft, marginRight, paddingRight, paddingX, paddingY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontFamily, fontSize, fontWeight, letterSpacing } from '../../styles/typography';
import { FieldDescriptionProps, FieldDisplayerProps, FieldHelpProps, FieldLayoutProps } from './typings';

export const fieldStyle: ComponentStyle<FieldLayoutProps> = () => {
  return css`
    &.o-form-field {
      ${display('flex')}
    }
    &.o-form-field-vertical {
      ${flexDirection('column')}
    }
    &.o-form-field-horizontal {
      ${flexDirection('row')}
      .o-form-field-content {
        ${display('flex')}
      }
    }
  `;
};

export const fieldHelpStyle: ComponentStyle<FieldHelpProps> = ({ visible = true, theme, layout }) => {
  const t = theme.fieldLayout;
  return css`
    ${fontSize('2xl')}
    ${marginLeft(layout === 'horizontal' ? 0 : t.helperMarginLeft)}
    ${marginRight(layout === 'horizontal' ? t.helperMarginRight : 0)}
    ${height('100%')}
    ${display('flex')}
    ${alignItems('center')}
    ${color(t.helperColor)}
    .o-tooltip {
      ${cursor(visible ? 'pointer' : 'default')}
    }
    &.o-helper-icon-small {
      .o-tooltip {
        ${width(5)}
      }
    }
    &.o-helper-icon-large {
      .o-tooltip {
        ${width(8)}
      }
    }
  `;
};

export const fieldDescriptionStyle: ComponentStyle<FieldDescriptionProps> = ({ theme, layout }) => {
  const t = theme.fieldLayout;
  return css`
    ${fontSize(t.descriptionFontSize)}
    ${color(t.descriptionColor)}
    ${minHeight(layout === 'table' ? 0 : '14px')}
    &.o-field-description-error {
      ${color('danger')}
    }
    &.o-field-description-warning {
      ${color('warning')}
    }
    &.o-field-description-success {
      ${color('success')}
    }
  `;
};

export const fieldDisplayerStyle: ComponentStyle<FieldDisplayerProps> = ({ theme, last }) => {
  const t = theme.label;
  return css`
    ${display('flex')}
    ${alignItems('stretch')}
    &.o-field-displayer-form-summary {
      ${borderBottomWidth(!last ? '1px' : 0)}
      ${borderBottomColor('lighter')}
      ${borderBottomStyle('solid')}
    }
    .o-field-displayer-form-summary-label-container {
      ${display('start')}
      ${alignItems('stretch')}
      ${paddingX('md')}
      ${paddingY('xs')}
      ${backgroundColor('lightest')}
    }
    .o-field-displayer-form-summary-label {
      ${display('flex')}
      ${alignItems('center')}
      ${fontWeight(t.fontWeight)}
      ${color(t.fontColor)}
      ${fontSize(t.fontSize)}
      ${letterSpacing(t.letterSpacing)}
    }

    .o-field-displayer-form-summary-value {
      ${paddingY('xs')}
      ${paddingX('md')}
      ${fontFamily('Consolas, Monaco, Courier, monospace')}
    }

    .o-field-displayer-form-summary-table-label {
      ${display('flex')}
      ${fontWeight(t.fontWeight)}
      ${paddingRight('xs')}
    }

    .o-helper-icon {
      ${fontSize('xl')}
      ${marginLeft(t.helperMarginLeft)}
    }
  `;
};
