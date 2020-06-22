import produce from 'immer';
import { useEffect, useMemo, useRef, useState, useReducer } from 'react';
import { diffArrays, get, set } from '../utils/object';
import { useFormContext } from './context';
import { getContainerFieldValidation } from './validations';

export const useFieldContainer = () => {
  const fieldsRef = useRef([]);
  const fieldValidationsRef = useRef({});
  const validationRef = useRef({
    message: null,
    statusCode: null,
    status: null,
    fields: {},
  });
  const valueRef = useRef({});
  const valueListenersRef = useRef({});
  const validationListenersRef = useRef({});
  const context = useFormContext();
  const [, forceRender] = useReducer(s => s + 1, 0);

  const containerContext = useMemo(() => {
    const result = Object.assign({}, context);
    result.init = (name, validators = [], options = {}) => {
      fieldsRef.current.push(name);
      const field = context.init(name, validators, options);
      field.value = get(context.values, name, '');
      valueRef.current = produce(valueRef.current, draft => {
        set(draft, name, field.value);
      });
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
        valueListenersRef.current[fieldName].fct,
        valueListenersRef.current[fieldName].watch
      );
      context.offValidationChange(
        validationListenersRef.current[fieldName].fct,
        validationListenersRef.current[fieldName].watch
      );
      delete valueListenersRef.current[fieldName];
      delete validationListenersRef.current[fieldName];
    });

    diff.added.forEach(fieldName => {
      const valueListener = fieldValue => {
        const prev = valueRef.current;
        const next = produce(valueRef.current, draft => {
          draft[fieldName] = fieldValue;
        });
        if (prev !== next) {
          valueRef.current = next;
          forceRender();
        }
      };
      const watch = [fieldName];
      context.onValueChange(valueListener, watch);
      valueListenersRef.current[fieldName] = {
        fct: valueListener,
        watch,
      };

      const validationListener = fieldValidation => {
        const prev = fieldValidationsRef.current;
        const next = produce(fieldValidationsRef.current, draft => {
          draft[fieldName] = fieldValidation;
        });
        if (prev !== next) {
          fieldValidationsRef.current = next;
          validationRef.current = getContainerFieldValidation(next);
          forceRender();
        }
      };
      context.onValidationChange(validationListener, watch);
      validationListenersRef.current[fieldName] = {
        fct: validationListener,
        watch,
      };
    });
  });

  useEffect(() => {
    return () => {
      // eslint-disable-next-line
      Object.values(valueListenersRef.current).forEach(l =>
        context.offValueChange(l.fct, l.watch)
      );

      // eslint-disable-next-line
      Object.values(validationListenersRef.current).forEach(l =>
        context.offValidationChange(l.fct, l.watch)
      );
    };
  }, [context]);

  return {
    context: containerContext,
    value: valueRef.current,
    validation: validationRef.current,
  };
};
