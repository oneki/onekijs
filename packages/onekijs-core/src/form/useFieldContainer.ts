import { useEffect, useReducer, useRef } from 'react';
import useLazyRef from '../core/useLazyRef';
import { AnonymousObject } from '../typings/object';
import { diffArrays, get, set } from '../utils/object';
import ContainerValidation from './ContainerValidation';
import FieldValidation from './FieldValidation';
import { FieldContainer, FormContext, FormListenerProps, ValidationCode, ValidationStatus } from './typings';
import useFormContext from './useFormContext';

const useFieldContainer = (): FieldContainer => {
  const fieldsRef = useRef<string[]>([]);
  const fieldValidationsRef = useRef<AnonymousObject<FieldValidation>>({});
  const validationRef = useRef<ContainerValidation>(
    new ContainerValidation('', ValidationStatus.None, ValidationCode.None, {}),
  );
  const valueRef = useRef<AnonymousObject<any>>({});
  const valueListenersRef = useRef<AnonymousObject<FormListenerProps>>({});
  const validationListenersRef = useRef<AnonymousObject<FormListenerProps>>({});
  const context = useFormContext();
  const [, forceRender] = useReducer((s) => s + 1, 0);

  const containerContextRef = useLazyRef<FormContext>(() => {
    const result = Object.assign({}, context);
    result.init = (name, validators = [], options = {}) => {
      const field = context.init(name, validators, options);
      field.value = get(context.valuesRef.current, name, '');
      if (!fieldsRef.current.includes(name)) {
        fieldsRef.current.push(name);
        set(valueRef.current, name, field.value);
      }
      return field;
    };
    return result;
  });

  useEffect(() => {
    const diff = diffArrays(Object.keys(valueListenersRef.current), fieldsRef.current);
    diff.removed.forEach((fieldName) => {
      context.offValueChange(
        valueListenersRef.current[fieldName].listener,
        valueListenersRef.current[fieldName].watchs,
      );
      context.offValidationChange(
        validationListenersRef.current[fieldName].listener,
        validationListenersRef.current[fieldName].watchs,
      );
      delete valueListenersRef.current[fieldName];
      delete validationListenersRef.current[fieldName];
    });

    diff.added.forEach((fieldName) => {
      const valueListener = (fieldName: string) => {
        return (fieldValue: any) => {
          set(valueRef.current, fieldName, fieldValue);
          forceRender();
        };
      };
      context.onValueChange(valueListener, [fieldName]);
      valueListenersRef.current[fieldName] = {
        listener: valueListener,
        watchs: [fieldName],
      };

      const validationListener = (fieldName: string) => {
        return (fieldValidation: FieldValidation) => {
          fieldValidationsRef.current[fieldName] = fieldValidation;
          validationRef.current = context.getContainerFieldValidation(
            fieldValidationsRef.current,
            context.fields,
            '',
            true,
          );
          forceRender();
        };
      };
      context.onValidationChange(validationListener, [fieldName]);
      validationListenersRef.current[fieldName] = {
        listener: validationListener,
        watchs: [fieldName],
      };
    });
  });

  useEffect(() => {
    return () => {
      // eslint-disable-next-line
      Object.values(valueListenersRef.current).forEach((listener) =>
        context.offValueChange(listener.listener, listener.watchs),
      );

      // eslint-disable-next-line
      Object.values(validationListenersRef.current).forEach((listener) =>
        context.offValidationChange(listener.listener, listener.watchs),
      );
    };
  }, [context]);

  return {
    context: containerContextRef.current,
    value: valueRef.current,
    validation: validationRef.current,
  };
};

export default useFieldContainer;
