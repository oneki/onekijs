import { FormDisplayerProps, FormFieldValueDisplayerProps, useForm } from 'onekijs-framework';
import React, { FC } from 'react';
import Input from '.';
import { titlelize } from '../../utils/misc';
import FieldDisplayer from '../field/FieldDisplayer';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import { FormInputProps, InputProps } from './typings';
import Password from '../password/Password';

const FormInputValueDisplayer: React.FC<FormFieldValueDisplayerProps> = ({ value }) => {
  return <span className="o-field-displayer-value o-input-displayer-value">{value ?? ''}</span>
};

const FormInput: FC<FormInputProps> = React.memo((props) => {
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<InputProps>(
    Object.assign(
      {
        isUndefined: (value: any) => value === undefined || value === null,
        protected: props.type === 'password',
        Displayer: (displayerProps: FormDisplayerProps) => {
          const form = useForm();
          let value = form.getValue(displayerProps.name) ?? '';
          if (props.type === 'password' && value !== '') {
            value = <Password value={value} />
          }
          const ValueDisplayer = props.ValueDisplayer ?? FormInputValueDisplayer;
          return (
            <FieldDisplayer label={props.label ?? titlelize(displayerProps.name)} help={props.help} value={<ValueDisplayer value={value} />} />
          );
        },
      },
      props,
      {
        defaultValue: props.defaultValue === undefined ? '' : props.defaultValue,
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
