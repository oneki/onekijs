import { FormDisplayerProps, FormFieldValueDisplayerProps, useForm } from 'onekijs-framework';
import React from 'react';
import Select from '.';
import { titlelize } from '../../utils/misc';
import FieldDisplayer from '../field/FieldDisplayer';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import { FormSelectProps, SelectItem, SelectProps } from './typings';

const FormSelectValueDisplayer: React.FC<FormFieldValueDisplayerProps> = ({ value }) => {
  if (Array.isArray(value)) {
    return (
      <>
      {value.map((v, index) => <div key={`item-${index}`} className="o-select-displayer-value">{v ?? ''}</div>)}
      </>
    )
  }
  return <span className="o-select-displayer-value">{value ?? ''}</span>;
};



const FormSelect = <T extends any = any, I extends SelectItem<T> = SelectItem<T>>(props: FormSelectProps<T, I>) => {
  const service = props.controller ? props.controller.asService() : undefined;
  const defaultValue = props.defaultValue === undefined ? (props.multiple ? [] : null) : props.defaultValue;
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<SelectProps<T, I>>(
    Object.assign(
      {
        Displayer: (displayerProps: FormDisplayerProps) => {
          const form = useForm();
          let value = form.getValue(displayerProps.name) ?? '';
          const adapter = props.adapter;
          if (value === undefined || value === null) {
            value = '';
          } else if (service) {
            if (Array.isArray(value)) {
              value = value.map((v) => {
                const adaptee = service.adapt(v);
                return adaptee.text ?? `${value}`;
              })
            } else {
              const adaptee = service.adapt(value);
              value = adaptee.text ?? `${value}`;
            }
          } else if (adapter) {
            if (Array.isArray(value)) {
              value = value.map((v) => {
                const adaptee = adapter(v);
                return  adaptee.text ?? `${value}`;
              })
            } else {
              const adaptee = adapter(value);
              value = adaptee.text ?? `${value}`;
            }
          }
          const ValueDisplayer = props.ValueDisplayer ?? FormSelectValueDisplayer;
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
        },
      },
      props,
      {
        defaultValue,
      },
    ),
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
