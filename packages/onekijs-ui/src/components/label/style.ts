import { css } from "styled-components";
import { marginBottom, marginLeft, marginRight } from "../../styles/spacing";
import { color, fontSize, fontWeight } from "../../styles/typography";
import { display, visibility } from "../../styles/display";
import { ComponentStyle } from "../../styles/typings";
import { preflight } from "../../utils/style";
import { LabelProps } from "./typings";
import { alignContent, justifyContent } from "../../styles/alignment";
import { width } from "../../styles/size";

const labelStyle: ComponentStyle<LabelProps> = ({width: labelWidth}) => {
    return css`
      ${preflight()}
      ${display('flex')}
      &.o-label {
        ${fontWeight('bold')}
        ${fontSize('sm')}
      }      
      &.o-label-vertical {
        ${marginBottom(2)}
      }
      &.o-label-horizontal {
        ${display('flex')}
        ${justifyContent('flex-end')}
        ${alignContent('center')}
        ${width(`${(100/12) * (labelWidth || 12)}%`)}
      }      
      .o-marker-required, .o-marker-optional {
        ${color('danger')}
        ${fontWeight('bold')}
        ${marginRight(4)}
        ${marginLeft(1)}
      }
      .o-marker-optional {
        ${visibility(false)}
      }
    `;
  };
  
  export default labelStyle;
  