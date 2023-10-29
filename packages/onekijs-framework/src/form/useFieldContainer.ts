import { useCallback, useEffect, useReducer, useRef } from 'react';
import useLazyRef from '../core/useLazyRef';
import { ValidationStatus } from '../types/form';
import { AnonymousObject } from '../types/object';
import { clone, diffArrays, get, set } from '../utils/object';
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
  container,
  onValueChange,
  onValidationChange,
}: {
  container?: string;
  onValueChange?: (value: any) => void;
  onValidationChange?: (touchedValidation: ContainerValidation, allValidation: ContainerValidation) => void;
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
        if (prop === 'initField') {
          return (
            name: string,
            validators: AnonymousObject<Validator> = {},
            options: FieldOptions = {},
          ): FieldProps => {
            if (container) {
              const containers = options.containers || [];
              containers.unshift(container);
              options.containers = containers;
            }
            const field = form.initField(name, validators, options);
            field.value = form.getValue(name, '');
            if (!fieldsRef.current.includes(name)) {
              fieldsRef.current.push(name);
              set(valueRef.current, name, clone(field.value));
            }
            return field;
          };
        } else if (prop === 'remove') {
          return (fieldArrayName: string, index: number): void => {
            const currentArrayValue = get(valueRef.current, fieldArrayName, []);
            if (currentArrayValue.length - 1 >= index) {
              fieldsRef.current = fieldsRef.current.filter(
                (name) => !name.startsWith(`${fieldArrayName}.${currentArrayValue.length - 1}`),
              );
              Object.keys(fieldValidationsRef.current).forEach((key) => {
                if (key.startsWith(`${fieldArrayName}.${currentArrayValue.length - 1}`)) {
                  delete fieldValidationsRef.current[key];
                }
              });
            }
            form.remove(fieldArrayName, index);
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
      touchedValidationRef.current = form.getContainerFieldValidation(
        fieldValidationsRef.current,
        form.fields,
        '',
        true,
      );
      allValidationRef.current = form.getContainerFieldValidation(fieldValidationsRef.current, form.fields, '', false);
    });

    diff.added.forEach((fieldName) => {
      const valueListener = (fieldName: string): FormValueListener => {
        return (value) => {
          set(valueRef.current, fieldName, clone(value));
          if (onValueChange) {
            onValueChange(valueRef.current);
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
        watchs: [fieldName],
      };

      const validationListener = (fieldName: string): FormValidationListener => {
        return (validation) => {
          fieldValidationsRef.current[fieldName] = validation;
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
            onValidationChange(touchedValidationRef.current, allValidationRef.current);
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
        watchs: [fieldName],
      };
    });
    if (diff.added.length > 0 || diff.removed.length > 0) {
      if (onValidationChange) {
        onValidationChange(touchedValidationRef.current, allValidationRef.current);
      }
      if (onValueChange) {
        onValueChange(valueRef.current);
      }
      forceRender();
    }
  });

  useEffect(() => {
    return () => {
      // eslint-disable-next-line
      Object.values(valueListenersRef.current).forEach((listener) => form.offValueChange(listener.id));

      // eslint-disable-next-line
      Object.values(validationListenersRef.current).forEach((listener) => form.offValidationChange(listener.id));
    };
  }, [form]);

  const touchAllFields = useCallback(() => {
    fieldsRef.current.forEach((field) => form.touch(field));
  }, [form]);

  const hide = useCallback(() => {
    fieldsRef.current.forEach((field) => form.disableValidator(field, 'required'));
  }, [form]);

  const show = useCallback(() => {
    fieldsRef.current.forEach((field) => form.enableValidator(field, 'required'));
  }, [form]);

  const disable = useCallback(() => {
    fieldsRef.current.forEach((field) => form.disableValidator(field, 'required'));
  }, [form]);

  const enable = useCallback(() => {
    fieldsRef.current.forEach((field) => form.enableValidator(field, 'required'));
  }, [form]);

  return {
    context: containerContextRef.current,
    value: valueRef.current,
    touchedValidation: touchedValidationRef.current,
    allValidation: allValidationRef.current,
    touchAllFields,
    enable,
    disable,
    hide,
    show,
  };
};

export default useFieldContainer;
