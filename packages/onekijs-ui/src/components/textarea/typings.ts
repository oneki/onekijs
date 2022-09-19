import { FormFieldProps, ValidationStatus } from 'onekijs-framework';
import { TshirtSize } from '../../styles/typings';
import { FieldLayoutProps } from '../field/typings';

export type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
  status?: ValidationStatus;
  size?: TshirtSize;
};

export type FormTextareaProps = TextareaProps &
  FormFieldProps &
  FieldLayoutProps & {
    defaultValue?: string;
    FieldComponent?: React.FC<TextareaProps>;
  };
