import { LabelProps } from "../label/typings";
import React from "react";
import { GridSize } from "styles/typings";
import { FormLayout } from "onekijs-core";

export type FieldLayoutProps = {
  className?: string;
  description?: string;
  DescriptionComponent?: React.FC<DescriptionProps>;
  help?: string;
  id?: string|number;
  label?: string;
  LabelComponent?: React.FC<LabelProps>;
  labelWidth?: GridSize;
  layout?: FormLayout;
  required?: boolean;
}

export type DescriptionProps = {
  className?: string;
  text: string;
}