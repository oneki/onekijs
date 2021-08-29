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

export const fieldStyle: ComponentStyle<FieldLayoutProps> = () => {
  return css`
      ${display('flex')}
      ${marginY('xs')}
      &.o-form-field-vertical {
        ${flexDirection('column')}
      }
      &.o-form-field-horizontal {
        ${flexDirection('row')}
      }  
      .o-helper-icon {
        ${fontSize('xl')}
        ${color('primary')}
        ${marginLeft('sm')}
        ${height('100%')}
        ${display('flex')}
        ${alignItems('center')}
      }    
    `;
};

export const fieldHelpStyle: ComponentStyle<FieldHelpProps> = ({ visible = true }) => {
  return css`
      ${fontSize('xl')}
      ${color('primary')}
      ${marginLeft('sm')}
      ${height('100%')}
      ${display('flex')}
      ${alignItems('center')}  
      .o-tooltip {
        ${cursor(visible ? 'pointer' : 'default')}
      }
    `;
};

export const fieldDescriptionStyle: ComponentStyle<FieldDescriptionProps> = () => {
  return css`
    ${fontSize('sm')}
    ${color('gray-600')}
  `;
};
