import { useEffect, useReducer, useRef } from 'react';
import useLazyRef from '../core/useLazyRef';
import { ValidationStatus } from '../types/form';
import { AnonymousObject } from '../types/object';
import { diffArrays, get, set } from '../utils/object';
import ContainerValidation from './ContainerValidation';
import FieldValidation from './FieldValidation';
import { FieldContainer, FormContext, FormListenerProps, ValidationCode } from './typings';
import useFormContext from './useFormContext';

const useFieldContainer = ({
  onValueChange,
  onValidationChange,
}: {
  onValueChange?: (field: string, value: any) => void;
  onValidationChange?: (
    field: string,
    validation: FieldValidation,
    touchedValidation: ContainerValidation,
    allValidation: ContainerValidation,
  ) => void;
}): FieldContainer => {
  const fieldsRef = useRef<string[]>([]);
  const fieldValidationsRef = useRef<AnonymousObject<FieldValidation>>({});
  const touchedValidationRef = useRef<ContainerValidation>(
    new ContainerValidation('', ValidationStatus.None, ValidationCode.None, {}),
  );
  const allValidationRef = useRef<ContainerValidation>(
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
          if (onValueChange) {
            onValueChange(fieldName, fieldValue);
          } else {
            forceRender();
          }
        };
      };
      const valueFieldListener = valueListener(fieldName);
      context.onValueChange(valueFieldListener, [fieldName]);
      valueListenersRef.current[fieldName] = {
        listener: valueFieldListener,
        watchs: [fieldName],
      };

      const validationListener = (fieldName: string) => {
        return (fieldValidation: FieldValidation) => {
          fieldValidationsRef.current[fieldName] = fieldValidation;
          console.log(fieldValidationsRef.current, context.fields);
          touchedValidationRef.current = context.getContainerFieldValidation(
            fieldValidationsRef.current,
            context.fields,
            '',
            true,
          );
          allValidationRef.current = context.getContainerFieldValidation(
            fieldValidationsRef.current,
            context.fields,
            '',
            false,
          );
          if (onValidationChange) {
            onValidationChange(fieldName, fieldValidation, touchedValidationRef.current, allValidationRef.current);
          } else {
            forceRender();
          }
        };
      };

      const validationFieldListener = validationListener(fieldName);
      context.onValidationChange(validationFieldListener, [fieldName]);
      validationListenersRef.current[fieldName] = {
        listener: validationFieldListener,
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
    touchedValidation: touchedValidationRef.current,
    allValidation: allValidationRef.current,
  };
};

export default useFieldContainer;
