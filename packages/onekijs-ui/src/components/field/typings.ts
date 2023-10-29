import {
  AnonymousObject,
  ContainerValidation,
  FieldValidation,
  FormFieldProps,
  FormLayout,
  ValidationStatus,
} from 'onekijs-framework';
import React, { ReactNode } from 'react';
import { StylableProps, TshirtSize } from '../../styles/typings';
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

export type FieldDisplayerProps = StylableProps & {
  label: ReactNode;
  value: ReactNode;
  help?: ReactNode;
}

export type FieldDescriptionProps = {
  className?: string;
  content: ReactNode;
  size?: TshirtSize;
  layout?: FormLayout;
};

export type FieldHelpProps = {
  className?: string;
  content?: ReactNode;
  visible?: boolean;
  size?: TshirtSize;
  layout?: FormLayout;
};

export type FieldLayoutProps = {
  className?: string;
  description?: ReactNode;
  disabled?: boolean;
  DescriptionComponent?: React.FC<FieldDescriptionProps>;
  help?: ReactNode;
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
  visible?: boolean;
};

export type UseFieldLayoutProps<T extends AnonymousObject> = T &
  FormFieldProps &
  FieldLayoutProps & {
    defaultValue: T['value'];
    FieldComponent?: React.FC<T>;
  };
