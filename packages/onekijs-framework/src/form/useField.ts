import { useEffect, useRef } from 'react';
import { AnonymousObject } from '../types/object';
import { FieldOptions, FieldProps, Validator } from './typings';
import useForm from './useForm';
import useValue from './useValue';

const useField = (
  fieldName: string,
  validators: AnonymousObject<Validator> = {},
  options: FieldOptions = {},
): FieldProps => {
  const form = useForm();
  const field = form.initField(fieldName, validators, options);
  const value = useValue(fieldName);
  field.value = value === undefined ? (options.defaultValue === undefined ? '' : options.defaultValue) : value;
  const optionsRef = useRef<FieldOptions>(options);
  const nameRef = useRef<string>(fieldName);

  useEffect(() => {
    if (!form.initializing) {
      field.onChange(field.value);
      const disabled = form.config.reconfigure && !optionsRef.current.editable ? true : optionsRef.current.disabled;
      if (disabled) {
        form.setMetadata(nameRef.current, 'disabled', disabled);
      }
      if (optionsRef.current.visible === false) {
        form.setMetadata(nameRef.current, 'visible', optionsRef.current.visible);
      }
    }
  }, [field, form]);

  return field;
};

export default useField;
