import { FormFieldProps, ValidationStatus } from 'onekijs-framework';
import { FieldLayoutProps } from '../field/typings';

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'onChange' | 'value' | 'checked' | 'defaultValue'
  > {
  label?: string;
  onChange?: (checked: boolean) => void;
  value?: boolean;
  bordered?: boolean;
  status?: ValidationStatus;
}

export type FormCheckboxProps = CheckboxProps &
  FormFieldProps &
  FieldLayoutProps & {
    defaultValue?: boolean;
    FieldComponent?: React.FC<CheckboxProps>;
  };
