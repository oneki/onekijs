import React, { FC } from 'react';
import Input from '.';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import { FormInputProps, InputProps } from './typings';

const FormInput: FC<FormInputProps> = React.memo((props) => {
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<InputProps>(
    Object.assign(
      {
        defaultValue: props.defaultValue === undefined ? '' : props.defaultValue,
      },
      props,
      {
        isUndefined: (value: any) => value === undefined || value === null,
      },
    ),
  );
  const Component = props.FieldComponent || Input;

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <Component {...fieldComponentProps} value={!fieldComponentProps.value ? '' : fieldComponentProps.value} />
    </FieldLayout>
  );
});

FormInput.displayName = 'FormInput';
export default FormInput;
