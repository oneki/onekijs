import { useEffect, useReducer, useRef } from 'react';
import useLazyRef from '../core/useLazyRef';
import { ValidationStatus } from '../types/form';
import { AnonymousObject } from '../types/object';
import { diffArrays, set } from '../utils/object';
import ContainerValidation from './ContainerValidation';
import FieldValidation from './FieldValidation';
import FormService from './FormService';
import { FieldContainer, FieldOptions, FieldProps, FormListenerProps, ValidationCode, Validator } from './typings';
import useForm from './useForm';

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
  const form = useForm();
  const [, forceRender] = useReducer((s) => s + 1, 0);

  const containerContextRef = useLazyRef<FormService>(() => {
    const handler = {
      get: function (target: FormService, prop: string | number | symbol, receiver?: FormService): any {
        if (prop === 'init') {
          return (name: string, validators: Validator[] = [], options: FieldOptions = {}): FieldProps => {
            const field = form.initField(name, validators, options);
            field.value = form.getValue(name, '');
            if (!fieldsRef.current.includes(name)) {
              fieldsRef.current.push(name);
              set(valueRef.current, name, field.value);
            }
            return field;
          };
        } else {
          return Reflect.get(target, prop, receiver);
        }
      },
    };
    return new Proxy(form, handler);
  });

  useEffect(() => {
    const diff = diffArrays(Object.keys(valueListenersRef.current), fieldsRef.current);
    diff.removed.forEach((fieldName) => {
      form.offValueChange(valueListenersRef.current[fieldName].listener, valueListenersRef.current[fieldName].watchs);
      form.offValidationChange(
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
      form.onValueChange(valueFieldListener, [fieldName]);
      valueListenersRef.current[fieldName] = {
        listener: valueFieldListener,
        watchs: [fieldName],
      };

      const validationListener = (fieldName: string) => {
        return (fieldValidation: FieldValidation) => {
          fieldValidationsRef.current[fieldName] = fieldValidation;
          console.log(fieldValidationsRef.current, form.fields);
          touchedValidationRef.current = form.getContainerFieldValidation(
            fieldValidationsRef.current,
            form.fields,
            '',
            true,
          );
          allValidationRef.current = form.getContainerFieldValidation(
            fieldValidationsRef.current,
            form.fields,
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
      form.onValidationChange(validationFieldListener, [fieldName]);
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
        form.offValueChange(listener.listener, listener.watchs),
      );

      // eslint-disable-next-line
      Object.values(validationListenersRef.current).forEach((listener) =>
        form.offValidationChange(listener.listener, listener.watchs),
      );
    };
  }, [form]);

  return {
    context: containerContextRef.current,
    value: valueRef.current,
    touchedValidation: touchedValidationRef.current,
    allValidation: allValidationRef.current,
  };
};

export default useFieldContainer;
