import { FormDisplayerProps, FormFieldValueDisplayerProps, isNull, useForm } from 'onekijs-framework';
import React, { FC } from 'react';
import Input from '.';
import { titlelize } from '../../utils/misc';
import FieldDisplayer from '../field/FieldDisplayer';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import Password from '../password/Password';
import { FormInputProps, InputProps } from './typings';

const FormInputValueDisplayer: React.FC<FormFieldValueDisplayerProps> = ({ value }) => {
  return <span className="o-input-displayer-value">{value ?? ''}</span>;
};

/**
 * `<FormInput/>` is a Input component designed to be managed by a Form.
 * It must therefore be a nested component of a Form
 *
 * This component displays standard HTML input (and therefore supports all the HTML properties of an input component), but some properties are handled entirely by a form controller.
 *   * value
 *   * onChange
 *   * onFocus
 *   * onBlur
 *   * validations
 *   * visibility
 *   * disabled
 * The value is synchronized in both directions (it can be modified manually by the user or by the controller).
 *
 * @group FormInput
 * @category Components
 */
const FormInput: FC<FormInputProps> = React.memo((props) => {
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<InputProps>(
    Object.assign({}, props, {
      defaultValue: props.defaultValue === undefined ? '' : props.defaultValue,
      isUndefined:
        props.isUndefined === undefined ? (value: any) => value === undefined || value === null : props.isUndefined,
      protected: props.protected === undefined ? props.type === 'password' : props.protected,
      Displayer:
        props.Displayer === undefined
          ? (displayerProps: FormDisplayerProps) => {
              const form = useForm();
              let value = form.getValue(displayerProps.name) ?? '';
              if (props.type === 'password' && value !== '') {
                value = <Password value={value} />;
              }
              const ValueDisplayer = props.ValueDisplayer ?? FormInputValueDisplayer;
              return (
                <FieldDisplayer
                  label={displayerProps.label ?? titlelize(displayerProps.name)}
                  help={props.help}
                  first={displayerProps.first}
                  last={displayerProps.last}
                  value={<ValueDisplayer value={value} />}
                  format={displayerProps.format}
                />
              );
            }
          : props.Displayer,
    }),
  );
  const Component = props.FieldComponent || Input;

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <Component {...fieldComponentProps} value={isNull(fieldComponentProps.value) ? '' : fieldComponentProps.value} />
    </FieldLayout>
  );
});

FormInput.displayName = 'FormInput';
export default FormInput;
