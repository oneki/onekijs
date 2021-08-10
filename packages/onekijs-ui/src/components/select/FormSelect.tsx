import { useField, useValidation } from 'onekijs-framework';
import React, { FC } from 'react';
import Select from '.';
import FieldLayout from '../field/FieldLayout';
import { extractFieldLayoutProps } from '../field/util';
import { FormSelectProps } from './typings';

const FormSelect: FC<FormSelectProps> = React.memo((props) => {
  const { validators, fieldLayoutProps, name, fieldOptions, fieldProps } = extractFieldLayoutProps(
    Object.assign(
      {
        defaultValue: props.defaultValue === undefined ? (props.multiple ? [] : null) : props.defaultValue,
      },
      props,
    ),
  );
  const { FieldComponent = Select, ...fieldComponentProps } = fieldProps;
  const { value, onFocus, onBlur, onChange } = useField(name, validators, fieldOptions);
  const validation = useValidation(name);

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <FieldComponent
        {...fieldComponentProps}
        name={name}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        status={validation.status}
        size={fieldLayoutProps.size}
      />
    </FieldLayout>
  );
});

FormSelect.displayName = 'FormSelect';
export default FormSelect;
