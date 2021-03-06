import { css } from "styled-components"
import { padding } from "../../styles/spacing";
import { border } from "../../styles/border";
import { display } from "../../styles/display";
import { flexDirection } from "../../styles/flex";
import { ComponentStyle } from "../../styles/typings"
import { preflight } from "../../utils/style"
import { GridProps } from "./typings";

export const gridStyle: ComponentStyle<GridProps<any>> = () => {
  return css`
      ${preflight()}
      ${display('flex')}
      ${flexDirection('column')}
      .o-grid-body-row {
        ${display('flex')}
        ${flexDirection('row')}
        .o-grid-body-cell {
          ${border('1px solid black')}
          ${padding(1)}
        }
      }
    `;
}