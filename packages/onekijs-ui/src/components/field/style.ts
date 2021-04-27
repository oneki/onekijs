import { css } from "styled-components";
import { flexDirection } from "../../styles/flex";
import { display } from "../../styles/display";
import { ComponentStyle } from "../../styles/typings";
import { preflight } from "../../utils/style";
import { FieldLayoutProps } from "./typings";

const fieldStyle: ComponentStyle<FieldLayoutProps> = () => {
  return css`
      ${preflight()}
      ${display('flex')}
      ${flexDirection('column')}    

    `;
};

export default fieldStyle;
