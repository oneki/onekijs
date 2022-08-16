import {
  AnonymousObject,
  ContainerValidation,
  FieldValidation,
  FormFieldProps,
  FormLayout,
  ValidationStatus,
} from 'onekijs-framework';
import React from 'react';
import { TshirtSize } from '../../styles/typings';
import { GridSize } from '../grid/typings';
import { LabelProps } from '../label/typings';

export type FieldComponentProps<T extends AnonymousObject> = T & {
  name: string;
  value?: T['value'];
  onFocus?: T['onFocus'];
  onBlur?: T['onBlur'];
  onChange?: T['onChange'];
  status?: ValidationStatus;
  size?: T['size'];
};

export type FieldDescriptionProps = {
  className?: string;
  content: string | JSX.Element;
  size?: TshirtSize;
};

export type FieldHelpProps = {
  className?: string;
  content?: string | JSX.Element;
  visible?: boolean;
  size?: TshirtSize;
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
  xsLabelWidth?: GridSize;
  smLabelWidth?: GridSize;
  mdLabelWidth?: GridSize;
  lgLabelWidth?: GridSize;
  xlLabelWidth?: GridSize;
  layout?: FormLayout;
  required?: boolean;
  size?: TshirtSize;
  validation?: FieldValidation | ContainerValidation;
};

export type UseFieldLayoutProps<T extends AnonymousObject> = T &
  FormFieldProps &
  FieldLayoutProps & {
    defaultValue: T['value'];
    FieldComponent?: React.FC<T>;
  };
