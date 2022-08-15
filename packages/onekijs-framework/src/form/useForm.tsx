import React, { SyntheticEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import useLazyRef from '../core/useLazyRef';
import useService from '../core/useService';
import { FCC } from '../types/core';
import { AnonymousObject } from '../types/object';
import { get } from '../utils/object';
import ContainerValidation from './ContainerValidation';
import FieldValidation, { defaultValidation } from './FieldValidation';
import FormService from './FormService';
import {
  FieldOptions,
  FieldProps,
  FormContext,
  FormListenerType,
  FormOptions,
  FormProps,
  FormState,
  FormSubmitCallback,
  TouchOn,
  UseForm,
  ValidationCode,
  Validator,
} from './typings';
import { DefaultFormContext } from './useFormContext';
/**
 * This callback is used when the user press the submit button
 *
 * @callback submitCallback
 * @param {Object} data - values from the form
 */
/**
 * @param {submitCallback} onSubmit - a submit callback
 * @param {Object} options
 */

const useForm = (onSubmit: FormSubmitCallback, formOptions: FormOptions = {}): UseForm => {
  const initializedRef = useRef(false);

  // onSubmit cannot be changed after initialization but we do not want to force using useCallback
  const onSubmitRef = useRef(onSubmit);

  // formOptions cannot be changed afterwards. Used as initialState for the service
  // we copy initialValues to values to be able to reset the form to its initial state
  // immer will not kept a reference between to two objects. So changing values will not change initialValues
  const formOptionsRef = useRef(formOptions);
  const [state, service] = useService(
    FormService,
    (): FormState => {
      formOptions.touchOn = formOptions.touchOn ?? TouchOn.Blur;
      formOptions.initialValues = formOptions.initialValues ?? {};
      const initialState: FormState = Object.assign({}, formOptions, {
        validations: {},
        submitting: false,
      });
      if (typeof formOptions.initialValues === 'object') {
        initialState.values = initialState.initialValues as AnonymousObject;
        initialState.fetching = false;
      } else {
        initialState.values = {};
        initialState.fetching = true;
      }
      return initialState;
    },
  );

  useEffect(() => {
    if (formOptions.initialValues && typeof formOptions.initialValues !== 'object') {
      service.loadInitialValues(formOptions.initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { values = {}, validations = {}, submitting = false, loading, fetching } = state;
  const defaultValuesRef = useRef<AnonymousObject>({});

  // we put values in a ref object. For some features, we don't need to force a rerender if a value is changed
  // but we need the last value during the render
  const valuesRef = useRef(values);
  valuesRef.current = values;

  // same for validations
  const validationsRef = useRef(validations);
  validationsRef.current = validations;

  // same for submitting
  const submittingRef = useRef(submitting);
  submittingRef.current = submitting;

  /**
   *  this method will register a field and return three listeners
   *   - onChange
   *   - onFocus
   *   - onBlur
   *
   * @param {string} name - the name of the field. Must be related to a key in values
   * @param {Object} validators - a object of validators
   *
   * @return {Object} a list of listeners for the field and its name
   *                    - name
   *                    - onChange
   *                    - onFocus
   *                    - onBlur
   */
  const init = useCallback(
    (name: string, validators: Validator[] = [], fieldOptions: FieldOptions = {}): FieldProps => {
      if (!service.fields[name]) {
        fieldOptions.defaultValue = fieldOptions.defaultValue === undefined ? '' : fieldOptions.defaultValue;
        fieldOptions.touchOn = fieldOptions.touchOn || formOptionsRef.current.touchOn || TouchOn.Blur;
        service.addField(
          Object.assign({}, fieldOptions, {
            name,
            validators,
            validations: [],
            touched: fieldOptions.touchOn === TouchOn.Load,
            touchOn: fieldOptions.touchOn,
            onChange: (value: any): void => {
              if (value && value.nativeEvent && value.nativeEvent instanceof Event) {
                value = value.target.value;
              }
              if (get(valuesRef.current, name) !== value) {
                service.setValue(name, value);
              }
            },
            onFocus: (): void => {
              const field = service.fields[name];
              if (field.touchOn === 'focus' && !field.touched) {
                service.touch(name);
              }
            },
            onBlur: (): void => {
              const field = service.fields[name];
              if (field.touchOn === 'blur' && !field.touched) {
                service.touch(name);
              }
            },
          }),
        );
        if (!initializedRef.current) {
          defaultValuesRef.current[name] = get(valuesRef.current, name, fieldOptions.defaultValue);
        }
      }
      const field = service.fields[name];
      return {
        onChange: field.onChange,
        onFocus: field.onFocus,
        onBlur: field.onBlur,
        name,
      };
    },
    [service],
  );

  /**
   *  this method is an helper to quickly register a field from a component. It will return
   *   - name
   *   - value
   *   - onChange
   *   - onFocus
   *   - onBlur
   *
   * @param {string} name - the name of the field. Must be related to a key in values
   * @param {Object} validators - a object of validators
   *
   * @return {Object} a list of props for the field
   *                    - name
   *                    - value
   *                    - onChange
   *                    - onFocus
   *                    - onBlur
   */
  const field = useCallback(
    (name: string, validators: Validator[] = [], options: AnonymousObject = {}): FieldProps => {
      const field = init(name, validators, options);
      field.value = get(values, name, options.defaultValue === undefined ? '' : options.defaultValue);
      return field;
    },
    [init, values],
  );

  /**
   * this method will just call the submit function passed to useForm with the whole value object
   */
  const submit = useCallback(
    (e?: SyntheticEvent): void => {
      service.setSubmitting(true);
      if (e) {
        e.preventDefault();
      }
    },
    [service],
  );

  const getValidation = useCallback(
    (fieldName?: string, touchedOnly = true): FieldValidation | ContainerValidation => {
      const getFieldValidation = (fieldName: string): any => {
        if (service.fields[fieldName]) {
          if (touchedOnly) {
            return service.fields[fieldName].touched
              ? validationsRef.current[fieldName] || defaultValidation
              : defaultValidation;
          } else {
            return validationsRef.current[fieldName] || defaultValidation;
          }
        } else {
          return service.getContainerFieldValidation(validationsRef.current, service.fields, fieldName, touchedOnly);
        }
      };

      if (fieldName === undefined || fieldName === '') {
        return service.getContainerFieldValidation(validationsRef.current, service.fields, '', touchedOnly);
      }
      // else if (Array.isArray(fieldName)) {
      //   const result: AnonymousObject<Validation> = {};
      //   fieldName.forEach((n) => (result[n] = getFieldValidation(n)));
      //   return result;
      // }
      else {
        return getFieldValidation(fieldName);
      }
    },
    [validationsRef, service],
  );

  const getValue = useCallback(
    (fieldName?: string, defaultValue?: any): any => {
      if (fieldName === undefined || fieldName === '') {
        return valuesRef.current || defaultValue;
      }
      return get(valuesRef.current, fieldName, defaultValue);
    },
    [valuesRef],
  );

  const setLevelValidation = useCallback(
    (fieldName: string, validatorName: string, code: ValidationCode, message = ''): void => {
      service.setValidation(fieldName, validatorName, code, message);
    },
    [service],
  );

  const clearLevelValidation = useCallback(
    (fieldName: string, validatorName: string, code: ValidationCode): void => {
      service.clearValidation(fieldName, validatorName, code);
    },
    [service],
  );

  const setOrClearValidation = useCallback(
    (code: ValidationCode, fieldName: string, validatorName: string, message = '', match?: boolean): boolean => {
      let changed = false;
      if (service.fields[fieldName]) {
        if (service.hasValidation(fieldName, validatorName, ValidationCode.Loading)) {
          service.clearValidation(fieldName, validatorName, ValidationCode.Loading);
          changed = true;
        }
        if (match === undefined || match) {
          if (!service.hasValidation(fieldName, validatorName, code, message)) {
            service.setValidation(fieldName, validatorName, code, message);
            changed = true;
          }
        } else if (service.hasValidation(fieldName, validatorName, code)) {
          service.clearValidation(fieldName, validatorName, code);
          changed = true;
        }
      }
      return changed;
    },
    [service],
  );

  const setError = useCallback(
    (fieldName: string, validatorName: string, message = '', match?: boolean): boolean => {
      return setOrClearValidation(ValidationCode.Error, fieldName, validatorName, message, match);
    },
    [setOrClearValidation],
  );

  const setWarning = useCallback(
    (fieldName: string, validatorName: string, message = '', match?: boolean): boolean => {
      return setOrClearValidation(ValidationCode.Warning, fieldName, validatorName, message, match);
    },
    [setOrClearValidation],
  );

  const setOK = useCallback(
    (fieldName: string, validatorName: string): boolean => {
      return setOrClearValidation(ValidationCode.Ok, fieldName, validatorName, '', true);
    },
    [setOrClearValidation],
  );

  const setValue = useCallback(
    (fieldName: string, value: any): void => {
      if (get(valuesRef.current, fieldName) !== value) {
        service.setValue(fieldName, value);
      }
    },
    [service],
  );

  const setPendingValidation = useCallback(
    (fieldName: string, validatorName: string, pending = true): boolean => {
      return setOrClearValidation(ValidationCode.Loading, fieldName, validatorName, '', pending);
    },
    [setOrClearValidation],
  );

  const add = useCallback(
    (fieldArrayName: string, initialValue = {}): void => {
      // get current value
      const currentArrayValue = get(valuesRef.current, fieldArrayName, []);
      const index = currentArrayValue.length;
      service.setValue(`${fieldArrayName}.${index}`, initialValue || {});
    },
    [service],
  );

  const remove = useCallback(
    (fieldArrayName: string, index: number): void => {
      const currentArrayValue = get(valuesRef.current, fieldArrayName, []);
      if (currentArrayValue.length - 1 >= index) {
        const nextValues: AnonymousObject = {};
        // need to modifiy all values with an index superior to the removed one
        for (let i = index + 1; i < currentArrayValue.length; i++) {
          Object.keys(currentArrayValue[i]).forEach((fieldName) => {
            nextValues[`${fieldArrayName}.${i - 1}.${fieldName}`] = currentArrayValue[i][fieldName];
          });
        }
        nextValues[fieldArrayName] = currentArrayValue.filter((_a: never, i: number): boolean => i !== index);
        service.setValues(nextValues);
      }
    },
    [service],
  );

  const contextRef = useRef({ state, service });
  contextRef.current.state = state;
  contextRef.current.service = service;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const formContextRef = useRef<FormContext>(null!);
  const formContext = useMemo<FormContext>(() => {
    return {
      add,
      clearValidation: clearLevelValidation,
      fields: service.fields,
      fieldSize: formOptionsRef.current.fieldSize,
      init,
      initializedRef: initializedRef,
      getContainerFieldValidation: service.getContainerFieldValidation.bind(service),
      labelWidth: formOptionsRef.current.labelWidth,
      xsLabelWidth: formOptionsRef.current.xsLabelWidth,
      smLabelWidth: formOptionsRef.current.smLabelWidth,
      mdLabelWidth: formOptionsRef.current.mdLabelWidth,
      lgLabelWidth: formOptionsRef.current.lgLabelWidth,
      xlLabelWidth: formOptionsRef.current.xlLabelWidth,
      layout: formOptionsRef.current.layout,
      offSubmittingChange: service.offSubmittingChange.bind(service),
      offValidationChange: service.offValidationChange.bind(service),
      offValueChange: service.offValueChange.bind(service),
      onSubmittingChange: service.onSubmittingChange.bind(service),
      onValidationChange: service.onValidationChange.bind(service),
      onValueChange: service.onValueChange.bind(service),
      remove,
      reset: service.reset.bind(service),
      setError,
      setOK,
      setPendingValidation,
      setValidation: setLevelValidation,
      setValue,
      setValues: service.setValues.bind(service),
      setWarning,
      submit,
      submittingRef,
      valuesRef,
      validationsRef,
    };
  }, [
    add,
    clearLevelValidation,
    init,
    remove,
    setError,
    setLevelValidation,
    setOK,
    setPendingValidation,
    setValue,
    service,
    setWarning,
    submit,
  ]);
  formContextRef.current = formContext;

  const FormRef = useLazyRef<FCC<FormProps>>(
    (): FCC<FormProps> => {
      const Form: FCC<FormProps> = (props) => {
        const prevValuesRef = useRef({});
        const prevValidationsRef = useRef<AnonymousObject<FieldValidation>>({});
        const prevSubmittingRef = useRef(false);

        // eslint-disable-next-line
        useEffect((): void => {
          if (service.state.resetting) {
            service.setResetting(false);
            return;
          }
          for (const prop of service.pendingDispatch) {
            for (const type of Object.keys(service.listeners) as FormListenerType[]) {
              for (const key of Object.keys(service.listeners[type])) {
                if (prop === key) {
                  for (const listener of service.listeners[type][key]) {
                    const watchs = [];
                    let changed = false;
                    if (type === 'valueChange') {
                      listener.watchs.forEach((w: string) => {
                        const prev = get(prevValuesRef.current, w, '');
                        const next = get(service.state.values, w, '');
                        watchs.push(next);
                        if (prev !== next) {
                          changed = true;
                        }
                      });
                    } else if (type === 'validationChange') {
                      listener.watchs.forEach((w: string) => {
                        let prev, next;
                        // check if w is a field or a composition
                        if (!service.fields[w]) {
                          prev = service.getContainerFieldValidation(
                            prevValidationsRef.current,
                            service.fields,
                            w,
                            false,
                          );
                          next = service.getContainerFieldValidation(
                            service.state.validations || {},
                            service.fields,
                            w,
                            false,
                          );
                          if (prev.status !== next.status || prev.message !== next.message) {
                            changed = true;
                          }
                        } else {
                          prev = prevValidationsRef.current[w];
                          const nextValidations = service.state.validations || {};
                          next = nextValidations[w];
                          if (prev !== next) {
                            changed = true;
                          }
                        }
                        watchs.push(next);
                      });
                    } else if (type === 'submittingChange') {
                      changed = prevSubmittingRef.current !== service.state.submitting;
                      watchs.push(service.state.submitting);
                    }

                    if (changed) {
                      if (listener.once) {
                        service.offChange(type, listener.listener, listener.watchs);
                      }
                      listener.listener(...watchs);
                    }
                  }
                }
              }
            }
          }
          service.pendingDispatch.clear();
          prevValuesRef.current = service.state.values || {};
          prevValidationsRef.current = service.state.validations || {};
          prevSubmittingRef.current = service.state.submitting || false;
        });

        return (
          <DefaultFormContext.Provider value={formContextRef.current}>
            {!service.state.resetting && <form {...props} onSubmit={submit} className="o-form" />}
          </DefaultFormContext.Provider>
        );
      };
      return Form;
    },
  );

  const result = useMemo<UseForm>(() => {
    return {
      add,
      clearValidation: clearLevelValidation,
      fetching: fetching || false,
      field,
      Form: FormRef.current,
      getValue,
      getValidation,
      loading: loading || false,
      initialized: initializedRef.current,
      remove,
      reset: service.reset.bind(service),
      setError,
      setValidation: setLevelValidation,
      setValue,
      setValues: service.setValues.bind(service),
      setOK,
      setWarning,
      setPendingValidation,
      submit,
      submitting,
      validations,
      values,
    };
  }, [
    add,
    clearLevelValidation,
    fetching,
    field,
    getValidation,
    getValue,
    loading,
    FormRef,
    remove,
    setError,
    setLevelValidation,
    setValue,
    service,
    setOK,
    setWarning,
    setPendingValidation,
    submit,
    submitting,
    validations,
    values,
  ]);

  useEffect((): void => {
    if (!initializedRef.current) {
      if (Object.keys(defaultValuesRef.current).length > 0) {
        service.setValues(defaultValuesRef.current);
        defaultValuesRef.current = {};
      }
      initializedRef.current = true;
    }
  });

  useEffect((): (() => void) => {
    const submit = () => {
      service.submit(
        valuesRef.current,
        validationsRef.current,
        submit,
        onSubmitRef.current,
        formOptionsRef.current.onError,
        formOptionsRef.current.onWarning,
      );
    };

    const listener = (submitting: boolean) => {
      if (submitting) {
        submit();
      }
    };

    service.onSubmittingChange(listener);

    return (): void => {
      service.offSubmittingChange(listener);
    };
  }, [service]);
  return result;
};

export default useForm;
