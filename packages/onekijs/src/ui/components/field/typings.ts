import React from 'react';
import { FormLayout } from '../../../types/form';
import { GridSize } from '../../styles/typings';
import { LabelProps } from '../label/typings';

export type FieldDescriptionProps = {
  className?: string;
  content: string | JSX.Element;
};

export type FieldHelpProps = {
  className?: string;
  content?: string | JSX.Element;
  visible?: boolean;
};

export type FieldLayoutProps = {
  className?: string;
  description?: string | JSX.Element;
  DescriptionComponent?: React.FC<FieldDescriptionProps>;
  help?: string | JSX.Element;
  HelpComponent?: React.FC<FieldHelpProps>;
  id?: string | number;
  label?: string;
  LabelComponent?: React.FC<LabelProps>;
  labelWidth?: GridSize;
  layout?: FormLayout;
  required?: boolean;
  size?: FieldSize;
};

export type FieldSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
