import { useEffect, useRef } from 'react';
import { AnonymousObject, NestedKeyOf } from '../types/object';
import { FieldOptions, FieldProps, Validator } from './typings';
import useForm from './useForm';
import useValue from './useValue';

const defaultIsUndefined = (value: any) => value === undefined;

const useField = <T extends object = any>(
  fieldName: NestedKeyOf<T>,
  validators: AnonymousObject<Validator> = {},
  options: FieldOptions = {},
): FieldProps => {
  const form = useForm<T>();
  const field = form.initField(fieldName, validators, options);
  const value = useValue(fieldName);
  const isUndefined = options.isUndefined ?? defaultIsUndefined;
  field.value = isUndefined(value) ? (options.defaultValue === undefined ? '' : options.defaultValue) : value;
  const optionsRef = useRef<FieldOptions>(options);
  const nameRef = useRef<string>(fieldName);

  useEffect(() => {
    if (!form.initializing) {
      field.onChange(field.value);
      const disabled = form.config.reconfigure && !optionsRef.current.editable ? true : optionsRef.current.disabled;
      if (disabled) {
        form.setMetadata(nameRef.current, 'disabled', disabled, false);
      }
      if (optionsRef.current.visible === false) {
        form.setMetadata(nameRef.current, 'visible', optionsRef.current.visible, false);
      }
    }
  }, [form]);

  return field;
};

export default useField;
