import React, { ReactNode } from 'react';
import { FormLayout } from 'onekijs-framework';
import { FieldDescriptionProps, FieldHelpProps } from '../field/typings';
import { TshirtSize } from '../../styles/typings';

export interface LabelProps {
  className?: string;
  description?: ReactNode;
  DescriptionComponent?: React.FC<FieldDescriptionProps>;
  htmlFor?: string | number;
  help?: ReactNode;
  HelpComponent?: React.FC<FieldHelpProps>;
  layout?: FormLayout;
  required?: boolean;
  text: string;
  size?: TshirtSize;
}
