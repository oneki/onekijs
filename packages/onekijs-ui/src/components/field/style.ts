import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { flexDirection } from '../../styles/flex';
import { cursor } from '../../styles/interactivity';
import { height } from '../../styles/size';
import { marginLeft, marginY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontSize } from '../../styles/typography';
import { FieldDescriptionProps, FieldHelpProps, FieldLayoutProps } from './typings';

export const fieldStyle: ComponentStyle<FieldLayoutProps> = ({ theme }) => {
  const t = theme.fieldLayout;
  return css`
    ${display('flex')}
    ${marginY(t.marginY)}
      &.o-form-field-vertical {
      ${flexDirection('column')}
    }
    &.o-form-field-horizontal {
      ${flexDirection('row')}
    }
  `;
};

export const fieldHelpStyle: ComponentStyle<FieldHelpProps> = ({ visible = true, theme }) => {
  const t = theme.fieldLayout;
  return css`
      ${fontSize('xl')}
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
  `;
};
