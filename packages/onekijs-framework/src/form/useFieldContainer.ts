import { useEffect, useReducer, useRef } from 'react';
import useLazyRef from '../core/useLazyRef';
import { ValidationStatus } from '../types/form';
import { AnonymousObject } from '../types/object';
import { diffArrays, set } from '../utils/object';
import { generateUniqueId } from '../utils/string';
import ContainerValidation from './ContainerValidation';
import FieldValidation from './FieldValidation';
import FormService from './FormService';
import {
  FieldContainer,
  FieldOptions,
  FieldProps,
  FormListenerProps,
  FormValidationListener,
  FormValueListener,
  ValidationCode,
  Validator,
} from './typings';
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
      form.offValueChange(valueListenersRef.current[fieldName].id);
      form.offValidationChange(validationListenersRef.current[fieldName].id);
      delete valueListenersRef.current[fieldName];
      delete validationListenersRef.current[fieldName];
    });

    diff.added.forEach((fieldName) => {
      const valueListener = (fieldName: string): FormValueListener => {
        return (value) => {
          set(valueRef.current, fieldName, value);
          if (onValueChange) {
            onValueChange(fieldName, value);
          } else {
            forceRender();
          }
        };
      };
      const valueChangeId = generateUniqueId();
      const valueFieldListener = valueListener(fieldName);
      form.onValueChange(valueChangeId, valueFieldListener, [fieldName]);
      valueListenersRef.current[fieldName] = {
        id: valueChangeId,
        listener: valueFieldListener,
      };

      const validationListener = (fieldName: string): FormValidationListener => {
        return (validation) => {
          fieldValidationsRef.current[fieldName] = validation;
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
            onValidationChange(fieldName, validation, touchedValidationRef.current, allValidationRef.current);
          } else {
            forceRender();
          }
        };
      };

      const validationChangeId = generateUniqueId();
      const validationFieldListener = validationListener(fieldName);
      form.onValidationChange(validationChangeId, validationFieldListener, [fieldName]);
      validationListenersRef.current[fieldName] = {
        id: validationChangeId,
        listener: validationFieldListener,
      };
    });
  });

  useEffect(() => {
    return () => {
      // eslint-disable-next-line
      Object.values(valueListenersRef.current).forEach((listener) => form.offValueChange(listener.id));

      // eslint-disable-next-line
      Object.values(validationListenersRef.current).forEach((listener) => form.offValidationChange(listener.id));
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
