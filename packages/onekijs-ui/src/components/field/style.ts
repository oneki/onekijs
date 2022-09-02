import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { flexDirection } from '../../styles/flex';
import { cursor } from '../../styles/interactivity';
import { height, minHeight } from '../../styles/size';
import { marginLeft } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize } from '../../styles/typography';
import { FieldDescriptionProps, FieldHelpProps, FieldLayoutProps } from './typings';

export const fieldStyle: ComponentStyle<FieldLayoutProps> = () => {
  return css`
    ${display('flex')}
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

export const fieldHelpStyle: ComponentStyle<FieldHelpProps> = ({ visible = true, theme }) => {
  const t = theme.fieldLayout;
  return css`
    ${fontSize('2xl')}
    ${color(t.helperColor)}
      ${marginLeft(t.helperMarginLeft)}
      ${height('100%')}
      ${display('flex')}
      ${alignItems('center')}
      .o-tooltip {
      ${cursor(visible ? 'pointer' : 'default')}
    }
  `;
};

export const fieldDescriptionStyle: ComponentStyle<FieldDescriptionProps> = ({ theme }) => {
  const t = theme.fieldLayout;
  return css`
    ${fontSize(t.descriptionFontSize)}
    ${color(t.descriptionColor)}
    ${minHeight('14px')}
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
