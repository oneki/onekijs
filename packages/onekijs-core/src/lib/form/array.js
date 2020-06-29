import { useRef, useReducer } from 'react';
import { useFormContext } from './context';
import { useLazyRef } from '../utils/hook';
import { NONE } from './validations';
import { get, set } from '../utils/object';

export const useFieldArray = (name, validators = [], options = {}) => {
  const context = useFormContext();

  const arrayContextRef = useLazyRef(() => {
    const result = Object.assign({}, context);
    result.init = (fieldName, index, validators = [], options = {}) => {
      const fullName = `${name}.${index}.${fieldName}`;
      const field = context.init(fullName, validators, options);
      field.value = get(context.values, fullName, '');
      return field;
    };
    return result;
  }, [context]);
};
