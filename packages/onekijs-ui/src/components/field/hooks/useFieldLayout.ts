import { useField, useForm, useFormMetadata, useTrySetting, useValidation } from 'onekijs-framework';
import { useId } from 'react';
import { FieldComponentProps, FieldLayoutProps, UseFieldLayoutProps } from '../typings';
import { extractFieldLayoutProps } from '../util';

const useFieldLayout = <T>(props: UseFieldLayoutProps<T>): [FieldLayoutProps, FieldComponentProps<T>] => {
  const { validators, fieldLayoutProps, name, fieldOptions, fieldProps } = extractFieldLayoutProps(props);
  const { FieldComponent, ...fieldComponentProps } = fieldProps;
  const { value, onFocus, onBlur, onChange } = useField(name, validators, fieldOptions);
  const validation = useValidation(name);
  const metadata = useFormMetadata(name);
  const form = useForm();
  const settingFieldSize = useTrySetting('form.fieldSize');
  const id = useId();

  return [
    Object.assign({ id }, fieldLayoutProps, {
      validation: validation,
      visible: metadata.visible,
      disabled: metadata.disabled,
    }),
    Object.assign({ id }, fieldComponentProps, {
      value,
      onFocus,
      onBlur,
      onChange,
      status: validation.status,
      size: fieldLayoutProps.size || form.config.fieldSize || settingFieldSize,
      disabled: metadata.disabled,
    } as unknown as FieldComponentProps<T>),
  ];
};

export default useFieldLayout;
