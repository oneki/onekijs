import { FormFieldProps, ValidationStatus } from 'onekijs-framework';
import { TshirtSize } from '../../styles/typings';
import { FieldDisplayerProps, FieldLayoutProps } from '../field/typings';
import React from 'react';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  PrefixComponent?: React.FC<InputProps>;
  SuffixComponent?: React.FC<InputProps>;
  status?: ValidationStatus;
  size?: TshirtSize;
};

export type FormInputProps = InputProps &
  FormFieldProps &
  FieldLayoutProps & {
    defaultValue?: string;
    FieldComponent?: React.FC<InputProps>;
    FieldDisplayer?: React.FC<FieldDisplayerProps>;
  };
