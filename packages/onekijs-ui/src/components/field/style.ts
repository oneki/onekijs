import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { flexDirection } from '../../styles/flex';
import { cursor } from '../../styles/interactivity';
import { height, minHeight, width } from '../../styles/size';
import { marginLeft, marginRight } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize } from '../../styles/typography';
import { FieldDescriptionProps, FieldHelpProps, FieldLayoutProps } from './typings';

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
    ${color(t.helperColor)}
      ${marginLeft(layout === 'horizontal' ? 0 : t.helperMarginLeft)}
      ${marginRight(layout === 'horizontal' ? t.helperMarginRight : 0)}
      ${height('100%')}
      ${display('flex')}
      ${alignItems('center')}
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
