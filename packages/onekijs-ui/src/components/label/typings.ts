import { FieldDescriptionProps, FieldHelpProps, FieldSize } from "components/field/typings";
import { FormLayout } from "onekijs-core";
import React from "react";
import { GridSize } from "../../styles/typings";

export interface LabelProps {
  className?: string;
  description?: string|JSX.Element;
  DescriptionComponent?: React.FC<FieldDescriptionProps>;
  htmlFor?: string|number;
  help?: string|JSX.Element;
  HelpComponent?: React.FC<FieldHelpProps>
  layout?: FormLayout;
  required?: boolean;
  text: string;
  width?: GridSize;
  size?: FieldSize;
}