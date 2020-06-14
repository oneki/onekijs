import { useFormContext } from './context';
import { useState, useEffect } from 'react';
import { get } from '../utils/object';
import { defaultValidation } from './validations';

export const useField = (name, validators = [], options = {}) => {
  const {
    init,
    onFieldChange,
    offFieldChange,
    validations,
    values,
  } = useFormContext();
  const field = init(name, validators, options);
  const [value, setValue] = useState(
    get(
      values,
      name,
      options.defaultValue === undefined ? '' : options.defaultValue
    )
  );
  const [validation, setValidation] = useState(
    get(validations, name, defaultValidation)
  );
  field.value = value;
  field.validation = validation;

  useEffect(() => {
    const listener = function (field) {
      //setImmediate(() => setValue(value));
      setValue(field.value);
      setValidation(field.validation);
    };
    onFieldChange(listener, [name]);
    return () => {
      offFieldChange(listener, [name]);
    };
    // eslint-disable-next-line
  }, []);

  return field;
};
