import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocalService } from '../service';
import { get, isNull, isNullOrEmpty, set } from '../utils/object';
import { isFunction } from '../utils/type';
import { useFormAsyncBind, useFormBind } from './bind';
import { FormContext, useFormContext } from './context';
import { useFormRule } from './rule';
import {
  defaultValidation,
  ERROR,
  LOADING,
  OK,
  useValidation,
  WARNING,
} from './validations';
import { formService } from './service';
import { useLazyRef } from '../utils/hook';

/**
 * This callback is used when the user press the submit button
 *
 * @callback submitCallback
 * @param {Object} data - values from the form
 */
/**
 * @param {string|submitCallback} onSubmit - an url or a submit callback
 * @param {Object} options
 */
export const useForm = (onSubmit, formOptions = {}) => {
  // onSubmit cannot be changed after initialization but we do not want to force using useCallback
  const onSubmitRef = useRef(onSubmit);

  // formOptions cannot be changed afterwards. Used as initialState for the service
  // we copy initialValues to values to be able to reset the form to its initial state
  // immer will not kept a reference between to two objects. So changing values will not change initialValues
  const formOptionsRef = useRef(formOptions);
  const [state, service] = useLocalService(formService, () => {
    const initialState = Object.assign(
      {
        touchOn: 'blur',
        initialValues: {},
        validations: {},
        submitting: false,
      },
      formOptions
    );
    initialState.values = initialState.initialValues;
    return initialState;
  });
  const { values, validations, submitting } = state;
  const defaultValuesRef = useRef({});

  // we put values in a ref object. For some features, we don't need to force a rerender if a value is changed
  // but we need the last value during the render
  const valuesRef = useRef();
  valuesRef.current = values;

  // same for validations
  const validationsRef = useRef();
  validationsRef.current = validations;

  // same for submitting
  const submittingRef = useRef();
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
    (name, validators = [], fieldOptions = {}) => {
      if (!service.fields[name]) {
        fieldOptions.defaultValue =
          fieldOptions.defaultValue === undefined
            ? ''
            : fieldOptions.defaultValue;
        fieldOptions.touchOn =
          fieldOptions.touchOn || formOptionsRef.current.touchOn || 'blur';

        service.addField(
          Object.assign(fieldOptions, {
            name,
            validators,
            validations: {},
            touched: fieldOptions.touchOn === 'load',
            onChange: value => {
              if (
                value &&
                value.nativeEvent &&
                value.nativeEvent instanceof Event
              ) {
                value = value.target.value;
              }
              if (get(valuesRef.current, name) !== value) {
                service.setValue({ name, value });
              }
            },
            onFocus: () => {
              const field = service.fields[name];
              if (field.touchOn === 'focus' && !field.touched) {
                service.touch(name);
              }
            },
            onBlur: () => {
              const field = service.fields[name];
              if (field.touchOn === 'blur' && !field.touched) {
                service.touch(name);
              }
            },
          })
        );
        defaultValuesRef.current[name] = get(
          valuesRef.current,
          name,
          fieldOptions.defaultValue
        );
      }
      const field = service.fields[name];
      return {
        onChange: field.onChange,
        onFocus: field.onFocus,
        onBlur: field.onBlur,
        name,
      };
    },
    [service]
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
    (name, validators = [], options = {}) => {
      const field = init(name, validators, options);
      field.value = get(
        values,
        name,
        options.defaultValue === undefined ? '' : options.defaultValue
      );
      return field;
    },
    [init, values]
  );

  /**
   * this method will just call the submit function passed to useForm with the whole value object
   */
  const submit = useCallback(
    e => {
      service.submit({
        onSuccess: onSubmitRef.current,
        onError: formOptionsRef.current.onError,
        onWarning: formOptionsRef.current.onWarning,
        resubmit: submit,
        values: valuesRef.current,
        validations: validationsRef.current,
      });
      if (e) {
        e.preventDefault();
      }
    },
    [service]
  );

  const getValidation = useCallback(
    (name, touchedOnly = true) => {
      const getFieldValidation = name => {
        if (service.fields[name]) {
          if (touchedOnly) {
            return service.fields[name].touched
              ? validations[name] || defaultValidation
              : defaultValidation;
          } else {
            return validations[name] || defaultValidation;
          }
        } else {
          return service.getContainerFieldValidation(
            validations,
            service.fields,
            name,
            touchedOnly
          );
        }
      };

      if (isNullOrEmpty(name)) {
        return service.getContainerFieldValidation(
          validations,
          service.fields,
          '',
          touchedOnly
        );
      } else if (Array.isArray(name)) {
        const result = {};
        name.forEach(n => (result[n] = getFieldValidation(n)));
        return result;
      } else {
        return getFieldValidation(name);
      }
    },
    [validations, service]
  );

  const getValue = useCallback(
    (name, defaultValue) => {
      if (isNullOrEmpty(name)) {
        return values || defaultValue;
      } else if (Array.isArray(name)) {
        const result = {};
        name.forEach(n => set(result, n, get(values, n)));
        return result;
      }
      return get(values, name, defaultValue);
    },
    [values]
  );

  const setLevelValidation = useCallback(
    (fieldName, validatorName, level, message) => {
      service.setValidation({
        fieldName,
        validatorName,
        message,
        level,
      });
    },
    [service]
  );

  const clearLevelValidation = useCallback(
    (fieldName, validatorName, level) => {
      service.clearValidation({
        fieldName,
        validatorName,
        level,
      });
    },
    [service]
  );

  const setOrClearValidation = useCallback(
    (level, fieldName, validatorName, message, matcher) => {
      let changed = false;
      if (service.fields[fieldName]) {
        if (
          service.hasValidation({ fieldName, validatorName, level: LOADING })
        ) {
          service.clearValidation({ fieldName, validatorName, level: LOADING });
          changed = true;
        }
        if (isNull(matcher) || matcher) {
          if (
            !service.hasValidation({ fieldName, validatorName, level, message })
          ) {
            service.setValidation({ fieldName, validatorName, level, message });
            changed = true;
          }
        } else if (service.hasValidation({ fieldName, validatorName, level })) {
          service.clearValidation({ fieldName, validatorName, level });
          changed = true;
        }
      }
      return changed;
    },
    [service]
  );

  const setError = useCallback(
    (fieldName, validatorName, message, matcher) => {
      return setOrClearValidation(
        ERROR,
        fieldName,
        validatorName,
        message,
        matcher
      );
    },
    [setOrClearValidation]
  );

  const setWarning = useCallback(
    (fieldName, validatorName, message, matcher) => {
      return setOrClearValidation(
        WARNING,
        fieldName,
        validatorName,
        message,
        matcher
      );
    },
    [setOrClearValidation]
  );

  const setOK = useCallback(
    (fieldName, validatorName) => {
      return setOrClearValidation(OK, fieldName, validatorName, null, true);
    },
    [setOrClearValidation]
  );

  const setValue = useCallback(
    (name, value) => {
      if (get(valuesRef.current, name) !== value) {
        return service.setValue({ name, value });
      }
    },
    [service]
  );

  const setPendingValidation = useCallback(
    (fieldName, validatorName, pending = true) => {
      return setOrClearValidation(
        LOADING,
        fieldName,
        validatorName,
        null,
        pending
      );
    },
    [setOrClearValidation]
  );

  const add = useCallback(
    (fieldArrayName, initialValue) => {
      // get current value
      const currentArrayValue = get(valuesRef.current, fieldArrayName, []);
      const index = currentArrayValue.length;
      service.setValue({
        name: `${fieldArrayName}.${index}`,
        value: initialValue || {},
      });
    },
    [service]
  );

  const remove = useCallback(
    (fieldArrayName, index) => {
      const currentArrayValue = get(valuesRef.current, fieldArrayName, []);
      if (currentArrayValue.length - 1 >= index) {
        const nextValues = {};
        // need to modifiy all values with an index superior to the removed one
        for (let i = index + 1; i < currentArrayValue.length; i++) {
          Object.keys(currentArrayValue[i]).forEach(fieldName => {
            nextValues[`${fieldArrayName}.${i - 1}.${fieldName}`] =
              currentArrayValue[i][fieldName];
          });
        }
        nextValues[fieldArrayName] = currentArrayValue.filter(
          (x, i) => i !== index
        );
        service.setValues(nextValues);
      }
    },
    [service]
  );

  const contextRef = useRef({});
  contextRef.current.state = state;
  contextRef.current.service = service;
  const useRuleRef = useRef(useFormRule.bind(contextRef.current));
  const useBindRef = useRef(useFormBind.bind(contextRef.current));
  const useAsyncBindRef = useRef(useFormAsyncBind.bind(contextRef.current));

  const formContextRef = useRef();
  const formContext = useMemo(() => {
    return {
      add,
      clearValidation: clearLevelValidation,
      fields: service.fields,
      init,
      getContainerFieldValidation: service.getContainerFieldValidation,
      offSubmittingChange: service.offSubmittingChange,
      offValidationChange: service.offValidationChange,
      offValueChange: service.offValueChange,
      onSubmittingChange: service.onSubmittingChange,
      onValidationChange: service.onValidationChange,
      onValueChange: service.onValueChange,
      remove,
      reset: service.reset,
      setError,
      setOK,
      setPendingValidation,
      setValidation: setLevelValidation,
      setValue,
      setValues: service.setValues,
      setWarning,
      submit,
      submittingRef,
      valuesRef,
      validationsRef,
    };
  }, [
    add,
    clearLevelValidation,
    service.fields,
    init,
    service.getContainerFieldValidation,
    service.offSubmittingChange,
    service.offValidationChange,
    service.offValueChange,
    service.onSubmittingChange,
    service.onValidationChange,
    service.onValueChange,
    remove,
    service.reset,
    setError,
    setLevelValidation,
    setOK,
    setPendingValidation,
    setValue,
    service.setValues,
    setWarning,
    submit,
  ]);
  formContextRef.current = formContext;

  const FormRef = useLazyRef(() => {
    const Form = props => {
      const prevValuesRef = useRef(null);
      const prevValidationsRef = useRef(null);
      const prevSubmittingRef = useRef(null);

      // eslint-disable-next-line
      useEffect(() => {
        for (let prop of service.pendingDispatch) {
          for (let type of Object.keys(service.listeners)) {
            for (let key of Object.keys(service.listeners[type])) {
              if (prop.startsWith(key)) {
                for (let listener of service.listeners[type][key]) {
                  let watchs = [];
                  let changed = false;
                  if (type === 'valueChange') {
                    listener.watchs.forEach(w => {
                      const prev = get(prevValuesRef.current, w, '');
                      const next = get(valuesRef.current, w, '');
                      watchs.push(next);
                      if (prev !== next) {
                        changed = true;
                      }
                    });
                  } else if (type === 'validationChange') {
                    listener.watchs.forEach(w => {
                      let prev, next;
                      // check if w is a field or a composition
                      if (!service.fields[w]) {
                        prev = service.getContainerFieldValidation(
                          prevValidationsRef.current,
                          service.fields,
                          w,
                          false
                        );
                        next = service.getContainerFieldValidation(
                          validationsRef.current,
                          service.fields,
                          w,
                          false
                        );
                        if (
                          prev.status !== next.status ||
                          prev.message !== next.message
                        ) {
                          changed = true;
                        }
                      } else {
                        prev = prevValidationsRef.current[w];
                        next = validationsRef.current[w];
                        if (prev !== next) {
                          changed = true;
                        }
                      }
                      watchs.push(next);
                    });
                  } else if (type === 'submittingChange') {
                    changed =
                      prevSubmittingRef.current !== submittingRef.current;
                    watchs.push(submittingRef.current);
                  }

                  if (changed) {
                    if (listener.once) {
                      service.offChange(
                        type,
                        listener.listener,
                        listener.watchs
                      );
                    }
                    listener.listener(...watchs);
                  }
                }
              }
            }
          }
        }
        service.pendingDispatch.clear();
        prevValuesRef.current = valuesRef.current;
        prevValidationsRef.current = validationsRef.current;
        prevSubmittingRef.current = submittingRef.current;
      });

      return (
        <FormContext.Provider value={formContextRef.current}>
          <form {...props} onSubmit={submit} />
        </FormContext.Provider>
      );
    };
    return Form;
  });

  const result = useMemo(() => {
    return {
      add,
      asyncBind: useAsyncBindRef.current,
      bind: useBindRef.current,
      clearValidation: clearLevelValidation,
      field,
      Form: FormRef.current,
      getValue,
      getValidation,
      remove,
      rule: useRuleRef.current,
      reset: service.reset,
      setError,
      setValidation: setLevelValidation,
      setValue,
      setValues: service.setValues,
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
    field,
    getValidation,
    getValue,
    FormRef,
    remove,
    service.reset,
    setError,
    setLevelValidation,
    setValue,
    service.setValues,
    setOK,
    setWarning,
    setPendingValidation,
    submit,
    submitting,
    validations,
    values,
  ]);

  useEffect(() => {
    if (Object.keys(defaultValuesRef.current).length > 0) {
      service.setValues(defaultValuesRef.current);
      defaultValuesRef.current = {};
    }
  });

  return result;
};

export const useValue = name => {
  const { onValueChange, offValueChange, valuesRef } = useFormContext();
  const nameRef = useRef(name);
  const [value, setValue] = useState(() => {
    if (isNullOrEmpty(nameRef.current)) {
      return valuesRef.current;
    }
    return valuesRef.current[nameRef.current];
  });

  useEffect(() => {
    const watch = [nameRef.current || ''];
    const listener = nextValue => setValue(nextValue);
    onValueChange(listener, watch);

    return () => {
      offValueChange(listener, watch);
    };
  }, [onValueChange, offValueChange]);

  return value;
};

export const useFormStatus = () => {
  const result = useValidation('', false);
  return result;
};

export const useSubmit = () => {
  const { status, statusCode, fields } = useFormStatus();
  const {
    submittingRef,
    onSubmittingChange,
    offSubmittingChange,
    submit,
  } = useFormContext();
  const [submitting, setSubmitting] = useState(submittingRef.current);

  useEffect(() => {
    const listener = submitting => setSubmitting(submitting);
    onSubmittingChange(listener);

    return () => {
      offSubmittingChange(listener);
    };
  }, [onSubmittingChange, offSubmittingChange]);
  return {
    submit,
    submitting,
    status,
    statusCode,
    fields,
  };
};
