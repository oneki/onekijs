import { css } from "styled-components";
import { cursor } from "../../styles/interactivity";
import { alignItems } from "../../styles/alignment";
import { display } from "../../styles/display";
import { flexDirection } from "../../styles/flex";
import { height } from "../../styles/size";
import { marginLeft, marginY } from "../../styles/spacing";
import { ComponentStyle } from "../../styles/typings";
import { color, fontSize } from "../../styles/typography";
import { preflight } from "../../utils/style";
import { FieldDescriptionProps, FieldHelpProps, FieldLayoutProps } from "./typings";

export const fieldStyle: ComponentStyle<FieldLayoutProps> = () => {
  return css`
      ${preflight()}
      ${display('flex')}
      ${marginY(1)}
      &.o-form-field-vertical {
        ${flexDirection('column')}
      }
      &.o-form-field-horizontal {
        ${flexDirection('row')}
      }  
      .o-helper-icon {
        ${fontSize('xl')}
        ${color('primary')}
        ${marginLeft(2)}
        ${height('100%')}
        ${display('flex')}
        ${alignItems('center')}
      }    
    `;
};

export const fieldHelpStyle: ComponentStyle<FieldHelpProps> = ({ visible = true }) => {
  return css`
      ${preflight()}
      ${fontSize('xl')}
      ${color('primary')}
      ${marginLeft(2)}
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
      ${preflight()}
      ${fontSize('sm')}
      ${color('gray-600')}
    `;
};