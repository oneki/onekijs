import { useEffect } from 'react';
import { FieldOptions, FieldProps, Validator } from './typings';
import useForm from './useForm';
import useValue from './useValue';

const useField = (fieldName: string, validators: Validator[] = [], options: FieldOptions = {}): FieldProps => {
  const form = useForm();
  const field = form.initField(fieldName, validators, options);
  const value = useValue(fieldName);
  field.value = value === undefined ? (options.defaultValue === undefined ? '' : options.defaultValue) : value;

  useEffect(() => {
    if (!form.initializing) {
      field.onChange(field.value);
    }
  }, [field, form]);

  return field;
};

export default useField;
