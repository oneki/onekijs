import { useField, useFormContext, useTrySetting, useValidation } from 'onekijs-framework';
import { FieldComponentProps, FieldLayoutProps, UseFieldLayoutProps } from '../typings';
import { extractFieldLayoutProps } from '../util';

const useFieldLayout = <T>(props: UseFieldLayoutProps<T>): [FieldLayoutProps, FieldComponentProps<T>] => {
  const { validators, fieldLayoutProps, name, fieldOptions, fieldProps } = extractFieldLayoutProps(props);
  const { FieldComponent, ...fieldComponentProps } = fieldProps;
  const { value, onFocus, onBlur, onChange } = useField(name, validators, fieldOptions);
  const validation = useValidation(name);
  const { fieldSize: contextFieldSize } = useFormContext();
  const settingFieldSize = useTrySetting('form.fieldSize');

  return [
    Object.assign(fieldLayoutProps, { validation: validation }),
    Object.assign(fieldComponentProps, ({
      value,
      onFocus,
      onBlur,
      onChange,
      status: validation.status,
      size: fieldLayoutProps.size || contextFieldSize || settingFieldSize,
    } as unknown) as FieldComponentProps<T>),
  ];
};

export default useFieldLayout;
