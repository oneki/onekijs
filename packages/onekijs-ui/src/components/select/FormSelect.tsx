import React from 'react';
import Select from '.';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import { FormSelectProps, SelectItem, SelectProps } from './typings';
import { FormDisplayerProps, FormFieldValueDisplayerProps, useForm } from 'onekijs-framework';
import FieldDisplayer from '../field/FieldDisplayer';
import { titlelize } from '../../utils/misc';

const FormSelectValueDisplayer: React.FC<FormFieldValueDisplayerProps> = ({ value }) => {
  return <span className="o-field-displayer-value o-select-displayer-value">{value ?? ''}</span>
};

const FormSelect = <T extends any = any, I extends SelectItem<T> = SelectItem<T>>(props: FormSelectProps<T, I>) => {
  const service = props.controller ? props.controller.asService() : undefined;
  const defaultValue = props.defaultValue === undefined ? (props.multiple ? [] : null) : props.defaultValue;
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<SelectProps<T, I>>(
    Object.assign({
      Displayer: (displayerProps: FormDisplayerProps) => {
        const form = useForm();
        let value = form.getValue(displayerProps.name) ?? '';
        if (value === undefined || value === null) {
          value = '';
        } else if (service) {
          const adaptee = service.adapt(value);
          return adaptee.text ?? `${value}`;
        } else if(props.adapter) {
          const adaptee = props.adapter(value);
          return adaptee.text ?? `${value}`;
        }
        const ValueDisplayer = props.ValueDisplayer ?? FormSelectValueDisplayer;
        return (
          <FieldDisplayer label={props.label ?? titlelize(displayerProps.name)} help={props.help} value={<ValueDisplayer value={value} />} />
        );
      },
    }, props, {
      defaultValue,
    }),
  );
  const Component = props.FieldComponent || Select;

  return (
    <FieldLayout {...fieldLayoutProps} required={props.required}>
      <Component {...fieldComponentProps} required={props.required} defaultValue={defaultValue} />
    </FieldLayout>
  );
};

FormSelect.displayName = 'FormSelect';
export default React.memo(FormSelect) as typeof FormSelect;
