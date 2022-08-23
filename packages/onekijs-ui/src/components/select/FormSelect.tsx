import React, { FC } from 'react';
import Select from '.';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import { FormSelectProps, SelectProps } from './typings';

const FormSelect: FC<FormSelectProps> = React.memo((props) => {
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<SelectProps>(
    Object.assign(
      {
        defaultValue: props.defaultValue === undefined ? (props.multiple ? [] : null) : props.defaultValue,
      },
      props,
    ),
  );
  const Component = props.FieldComponent || Select;

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <Component {...fieldComponentProps} />
    </FieldLayout>
  );
});

FormSelect.displayName = 'FormSelect';
export default FormSelect;
