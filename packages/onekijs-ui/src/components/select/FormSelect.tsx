import React, { useRef } from 'react';
import Select from '.';
import FieldLayout from '../field/FieldLayout';
import useFieldLayout from '../field/hooks/useFieldLayout';
import { FormSelectProps, SelectItem, SelectProps } from './typings';

const FormSelect = <T extends any = any, I extends SelectItem<T> = SelectItem<T>>(props: FormSelectProps<T, I>) => {
  const ref = useRef<any>()
  if (ref.current !== undefined) {
    console.log("---------------")
    Object.keys(props).forEach((k) => {
      if ((ref.current as any)[k] !== (props as any)[k]) {
        console.log(props.name, k);
      }
    })
  }
  ref.current = props;

  const defaultValue = props.defaultValue === undefined ? (props.multiple ? [] : null) : props.defaultValue;
  const [fieldLayoutProps, fieldComponentProps] = useFieldLayout<SelectProps<T, I>>(
    Object.assign({}, props, {
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
