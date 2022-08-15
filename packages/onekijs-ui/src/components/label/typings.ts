import React from 'react';
import { FormLayout } from 'onekijs-framework';
import { FieldDescriptionProps, FieldHelpProps, FieldSize } from '../field/typings';
import { GridSize } from '../grid/typings';

export interface LabelProps {
  className?: string;
  description?: string | JSX.Element;
  DescriptionComponent?: React.FC<FieldDescriptionProps>;
  htmlFor?: string | number;
  help?: string | JSX.Element;
  HelpComponent?: React.FC<FieldHelpProps>;
  layout?: FormLayout;
  required?: boolean;
  text: string;
  width?: GridSize;
  size?: FieldSize;
}
