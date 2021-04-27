import { FormLayout } from "onekijs-core";
import { GridSize } from "../../styles/typings";

export interface LabelProps {
  className?: string;
  description?: string;
  htmlFor?: string|number;
  help?: string;
  layout?: FormLayout;
  required?: boolean;
  text: string;
  width?: GridSize;
}