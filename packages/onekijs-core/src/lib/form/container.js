import { useEffect, useReducer, useRef } from 'react';
import { useLazyRef } from '../utils/hook';
import { diffArrays, get, set } from '../utils/object';
import { useFormContext } from './context';
import { getContainerFieldValidation, NONE } from './validations';

export const useFieldContainer = () => {
  const fieldsRef = useRef([]);
  const fieldValidationsRef = useRef({});
  const validationRef = useRef({
    message: null,
    statusCode: NONE,
    status: null,
    fields: {},
  });
  const valueRef = useRef({});
  const valueListenersRef = useRef({});
  const validationListenersRef = useRef({});
  const context = useFormContext();
  const [, forceRender] = useReducer(s => s + 1, 0);

  const containerContextRef = useLazyRef(() => {
    const result = Object.assign({}, context);
    result.init = (name, validators = [], options = {}) => {
      const field = context.init(name, validators, options);
      field.value = get(context.values, name, '');
      if (!fieldsRef.current.includes(name)) {
        fieldsRef.current.push(name);
        set(valueRef.current, name, field.value);
      }
      return field;
    };
    return result;
  }, [context]);

  useEffect(() => {
    const diff = diffArrays(
      Object.keys(valueListenersRef.current),
      fieldsRef.current
    );
    diff.removed.forEach(fieldName => {
      context.offValueChange(
        valueListenersRef.current[fieldName].listener,
        valueListenersRef.current[fieldName].watch
      );
      context.offValidationChange(
        validationListenersRef.current[fieldName].listener,
        validationListenersRef.current[fieldName].watch
      );
      delete valueListenersRef.current[fieldName];
      delete validationListenersRef.current[fieldName];
    });

    diff.added.forEach(fieldName => {
      const valueListener = fieldName => {
        return fieldValue => {
          set(valueRef.current, fieldName, fieldValue);
          forceRender();
        };
      };
      context.onValueChange(valueListener, [fieldName]);
      valueListenersRef.current[fieldName] = {
        listener: valueListener,
        watch: [fieldName],
      };

      const validationListener = fieldName => {
        return fieldValidation => {
          fieldValidationsRef.current[fieldName] = fieldValidation;
          validationRef.current = getContainerFieldValidation(
            fieldValidationsRef.current,
            context.fields,
            '',
            true
          );
          forceRender();
        };
      };
      context.onValidationChange(validationListener, [fieldName]);
      validationListenersRef.current[fieldName] = {
        listener: validationListener,
        watch: [fieldName],
      };
    });
  });

  useEffect(() => {
    return () => {
      // eslint-disable-next-line
      Object.values(valueListenersRef.current).forEach(listener =>
        context.offValueChange(listener.listener, listener.watch)
      );

      // eslint-disable-next-line
      Object.values(validationListenersRef.current).forEach(listener =>
        context.offValidationChange(listener.listener, listener.watch)
      );
    };
  }, [context]);

  return {
    context: containerContextRef.current,
    value: valueRef.current,
    validation: validationRef.current,
  };
};
