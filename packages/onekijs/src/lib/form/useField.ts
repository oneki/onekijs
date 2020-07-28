import useValue from './useValue';
import useFormContext from './useFormContext';
import { FieldOptions, Validator, FieldProps } from './typings';

const useField = (fieldName: string, validators: Validator[] = [], options: FieldOptions = {}): FieldProps => {
  const { init } = useFormContext();
  const field = init(fieldName, validators, options);
  const value = useValue(fieldName);
  field.value = value === undefined ? (options.defaultValue === undefined ? '' : options.defaultValue) : value;

  return field;
};

export default useField;
