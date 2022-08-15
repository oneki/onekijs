import React, { FC } from 'react';
import Checkbox from '.';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import { CheckboxProps, FormCheckboxProps } from './typings';

const FormCheckbox: FC<FormCheckboxProps> = React.memo((props) => {
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<CheckboxProps>(
    Object.assign(
      {
        defaultValue: props.defaultValue === undefined ? false : props.defaultValue,
      },
      props,
    ),
  );
  const Component = props.FieldComponent || Checkbox;

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <Component {...fieldComponentProps} />
    </FieldLayout>
  );
});

FormCheckbox.displayName = 'FormCheckbox';
export default FormCheckbox;
