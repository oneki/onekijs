import { useValue } from './index';
import { useFormContext } from './context';

export const useField = (name, validators = [], options = {}) => {
  const { init } = useFormContext();
  const field = init(name, validators, options);
  const value = useValue(name);
  field.value =
    value === undefined
      ? options.defaultValue === undefined
        ? ''
        : options.defaultValue
      : value;

  return field;
};
