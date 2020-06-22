import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useReducer,
} from 'react';
import { call } from 'redux-saga/effects';
import { latest } from '../saga';
import { useLocalService } from '../service';
import { get, isNull, isNullOrEmpty, set } from '../utils/object';
import { isFunction } from '../utils/type';
import { useFormAsyncBind, useFormBind } from './bind';
import { FormContext, useFormContext } from './context';
import { useFormRule } from './rule';
import {
  clearValidation,
  compileValidations,
  defaultValidation,
  ERROR,
  hasValidation,
  LOADING,
  OK,
  setValidation,
  validateAll,
  WARNING,
  useValidation,
  getContainerFieldValidation,
} from './validations';
import produce from 'immer';
import { useLazyRef } from '../utils/hook';

export const formService = {
  init: function () {
    this.fields = {};
    this.listeners = {
      valueChange: {},
      validationChange: {},
    };
    this.pendingDispatch = [];

    const onChange = (type, listener, watchers) => {
      for (let watcher of watchers) {
        this.listeners[type][watcher] = this.listeners[type][watcher] || [];
        this.listeners[type][watcher].push({ listener, watchers });
      }
    };

    const offChange = (type, listener, watchers) => {
      for (let watcher of watchers) {
        this.listeners[type][watcher] = this.listeners[type][watcher] || [];
        this.listeners[type][watcher] = this.listeners[type][watcher].filter(
          x => x.listener !== listener
        );
      }
    };

    this.onValueChange = (listener, watchers) =>
      onChange('valueChange', listener, watchers);
    this.offValueChange = (listener, watchers) =>
      offChange('valueChange', listener, watchers);
    this.onValidationChange = (listener, watchers) =>
      onChange('validationChange', listener, watchers);
    this.offValidationChange = (listener, watchers) =>
      offChange('validationChange', listener, watchers);
  },
  reducers: {
    _setValues: function (state, values = {}) {
      Object.keys(values).forEach(name => {
        const field = this.fields[name];
        if (field.touchOn === 'change' && !field.touched) {
          field.touched = true;
        }
        set(state, `values.${name}`, values[name]);
        compileValidations(state, this.fields[name]);
        this.pendingDispatch.push(name);
      });
    },

    setValidation: function (state, { id, name, message, level }) {
      const field = this.fields[name];
      setValidation(field, id, level, message);
      compileValidations(state, field);
      this.pendingDispatch.push(name);
    },

    clearValidation: function (state, { id, name, level }) {
      const field = this.fields[name];
      clearValidation(field, id, level);
      compileValidations(state, field);
      this.pendingDispatch.push(name);
    },

    compileValidations: function (state, name) {
      if (!Array.isArray(name)) {
        name = [name];
      }
      name.forEach(n => {
        compileValidations(state, this.fields[n]);
        this.pendingDispatch.push(n);
      });
    },

    touch: function (state, name) {
      if (!this.fields[name].touched) {
        this.fields[name].touched = true;
        compileValidations(state, this.fields[name]);
        this.pendingDispatch.push(name);
      }
    },

    touchAll: function (state) {
      Object.keys(this.fields).forEach(name => {
        if (!this.fields[name].touched) {
          this.fields[name].touched = true;
          compileValidations(state, this.fields[name]);
          this.pendingDispatch.push(name);
        }
      });
    },
  },
  sagas: {
    setValue: latest(function* ({ name, value }) {
      const field = this.fields[name];
      if (field) {
        const toValidate = Object.assign({}, field, { value });
        const async = yield call([this, validateAll], [toValidate]);
        if (async.length > 0) {
          yield call(this.compileValidations, name);
        }
      }
    }),

    setValues: latest(function* (values) {
      const toValidate = [];
      Object.keys(values).forEach(name => {
        const field = this.fields[name];
        if (field) {
          toValidate.push(Object.assign({}, field, { value: values[name] }));
        }
      });

      if (toValidate.length > 0) {
        const async = yield call([this, validateAll], toValidate);
        if (async.length > 0) {
          yield call(this.compileValidations, async);
        }
      }
    }),
  },
};

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
  // formOptions cannot be changed afterwards. Used as initialState for the service
  // we copy initialValues to values to be able to reset the form to its initial state
  // immer will not kept a reference between to two objects. So changing values will not change initialValues
  const [state, service] = useLocalService(formService, () => {
    const initialState = Object.assign(
      {
        touchOn: 'blur',
        initialValues: {},
        validations: {},
      },
      formOptions
    );
    initialState.values = initialState.initialValues;
    return initialState;
  });
  const { values, validations } = state;
  const createRef = useRef(true);
  const defaultValuesRef = useRef({});

  // we put values in a ref object. For some features, we don't need to force a rerender if a value is changed
  // but we need the last value during the render
  const valuesRef = useRef();
  valuesRef.current = values;

  const validationsRef = useRef();
  validationsRef.current = validations;

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
          fieldOptions.touchOn || formOptions.touchOn || 'blur';

        service.fields[name] = Object.assign(fieldOptions, {
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
        });
        if (get(valuesRef.current, name) === undefined) {
          if (createRef.current) {
            // queue all default values to trigger a unique change
            defaultValuesRef.current[name] = fieldOptions.defaultValue;
          } else {
            // execute immediately the change
            service.setValue({ name, value: fieldOptions.defaultValue });
          }
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
  const submit = useCallback(e => {
    // compile the validations to get the status
    const { statusCode, fields } = getContainerFieldValidation(
      validationsRef.current,
      service.fields,
      '',
      false
    );
    service.touchAll();

    switch (statusCode) {
      case LOADING:
        service.submitting = true;
        break;
      case ERROR:
        service.submitting = false;
        if (isFunction(formOptions.onError)) {
          formOptions.onError(fields, valuesRef.current);
        }
        break;
      case WARNING:
        service.submitting = false;
        if (isFunction(formOptions.onWarning)) {
          formOptions.onWarning(fields, valuesRef.current);
        } else {
          onSubmit(valuesRef.current);
        }
        break;
      default:
        onSubmit(valuesRef.current);
        break;
    }
    e.preventDefault();
    // eslint-disable-next-line
  }, []);

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
          return getContainerFieldValidation(
            validations,
            service.fields,
            name,
            touchedOnly
          );
        }
      };

      if (isNullOrEmpty(name)) {
        return getContainerFieldValidation(
          validations,
          service.fields,
          '',
          touchedOnly
        );
        // if (!touchedOnly) {
        //   return validations;
        // } else {
        //   const result = {};
        //   Object.keys(service.fields).forEach(fieldName => {
        //     result[fieldName] = getFieldValidation(fieldName);
        //   });
        //   return result;
        // }
      } else if (Array.isArray(name)) {
        const result = {};
        name.forEach(n => (result[n] = getFieldValidation(n)));
        return result;
      } else {
        return getFieldValidation(name);
      }
    },
    [validations, service.fields]
  );

  const getValue = useCallback(
    name => {
      if (isNullOrEmpty(name)) {
        return values;
      } else if (Array.isArray(name)) {
        const result = {};
        name.forEach(n => set(result, n, get(values, n)));
        return result;
      }
      return get(values, name);
    },
    [values]
  );

  const setLevelValidation = useCallback(
    (fieldName, validatorName, level, message) => {
      service.setValidation({
        id: validatorName,
        name: fieldName,
        message,
        level,
      });
    },
    [service]
  );

  const clearLevelValidation = useCallback(
    (fieldName, validatorName, level) => {
      service.clearValidation({
        id: validatorName,
        name: fieldName,
        level,
      });
    },
    [service]
  );

  const setOrClearValidation = useCallback(
    (level, fieldName, validatorName, message, matcher) => {
      const field = service.fields[fieldName];
      let changed = false;
      if (field) {
        if (hasValidation(field, validatorName, LOADING)) {
          clearValidation(field, validatorName, LOADING);
          changed = true;
        }
        if (isNull(matcher) || matcher) {
          if (!hasValidation(field, validatorName, level, message)) {
            setValidation(field, validatorName, level, message);
            changed = true;
          }
        } else if (hasValidation(field, validatorName, level)) {
          clearValidation(field, validatorName, level);
          changed = true;
        }
        if (changed) {
          service.compileValidations(fieldName);
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
      const field = service.fields[name];
      if (field && get(valuesRef.current, name) !== value) {
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

  const contextRef = useRef({});
  contextRef.current.state = state;
  contextRef.current.service = service;
  const useRuleRef = useRef(useFormRule.bind(contextRef.current));
  const useBindRef = useRef(useFormBind.bind(contextRef.current));
  const useAsyncBindRef = useRef(useFormAsyncBind.bind(contextRef.current));

  const formContextRef = useRef();
  const formContext = useMemo(() => {
    return {
      clearValidation: clearLevelValidation,
      init,
      offValidationChange: service.offValidationChange,
      offValueChange: service.offValueChange,
      onValidationChange: service.onValidationChange,
      onValueChange: service.onValueChange,
      setError,
      setValidation: setLevelValidation,
      setValue,
      setOK,
      setWarning,
      setPendingValidation,
      submit,
      valuesRef,
      validationsRef,
      fields: service.fields,
    };
  }, [
    clearLevelValidation,
    init,
    service.offValidationChange,
    service.offValueChange,
    service.onValidationChange,
    service.onValueChange,
    setError,
    setLevelValidation,
    setValue,
    setOK,
    setPendingValidation,
    setWarning,
    submit,
    service.fields,
  ]);
  formContextRef.current = formContext;

  const Form = useMemo(() => {
    const Form = props => {
      // eslint-disable-next-line
      const prevValuesRef = useRef(null);
      // eslint-disable-next-line
      const prevValidationsRef = useRef(null);

      // eslint-disable-next-line
      useEffect(() => {
        for (let prop of service.pendingDispatch) {
          for (let type of Object.keys(service.listeners)) {
            for (let key of Object.keys(service.listeners[type])) {
              if (prop.startsWith(key)) {
                for (let rule of service.listeners[type][key]) {
                  let watchers = [];
                  let changed = false;
                  if (type === 'valueChange') {
                    rule.watchers.forEach(w => {
                      const prev = get(prevValuesRef.current, w, '');
                      const next = get(valuesRef.current, w, '');
                      watchers.push(next);
                      if (prev !== next) {
                        changed = true;
                      }
                    });
                  }
                  if (type === 'validationChange') {
                    rule.watchers.forEach(w => {
                      let prev, next;
                      // check if w is a field or a composition
                      if (!service.fields[w]) {
                        prev = getContainerFieldValidation(
                          prevValidationsRef.current,
                          service.fields,
                          w,
                          false
                        );
                        next = getContainerFieldValidation(
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
                      watchers.push(next);
                    });
                  }
                  if (changed) {
                    rule.listener(...watchers);
                  }
                }
              }
            }
          }
        }
        service.pendingDispatch = [];
        prevValuesRef.current = valuesRef.current;
        prevValidationsRef.current = validationsRef.current;
        if (service.submitting) {
          submit();
        }
      });

      return (
        <FormContext.Provider value={formContextRef.current}>
          <form {...props} onSubmit={submit} />
        </FormContext.Provider>
      );
    };
    return Form;
  }, [formContextRef, service, submit]);

  const result = useMemo(() => {
    return {
      asyncBind: useAsyncBindRef.current,
      bind: useBindRef.current,
      clearValidation: clearLevelValidation,
      field,
      Form,
      getValue,
      getValidation,
      rule: useRuleRef.current,
      setError,
      setValidation: setLevelValidation,
      setValue,
      setOK,
      setWarning,
      setPendingValidation,
      submit,
      validations,
      values,
    };
  }, [
    clearLevelValidation,
    field,
    Form,
    setError,
    setLevelValidation,
    setValue,
    setOK,
    setWarning,
    setPendingValidation,
    submit,
    getValidation,
    validations,
    getValue,
    values,
  ]);

  useEffect(() => {
    if (Object.keys(defaultValuesRef.current).length > 0) {
      service.setValues(defaultValuesRef.current);
    }
    createRef.current = false;
  }, [service]);

  return result;
};

export const useValue = name => {
  const [, forceRender] = useReducer(s => s + 1, 0);
  const { onValueChange, offValueChange, valuesRef } = useFormContext();
  const nameRef = useRef(name);
  const valueRef = useLazyRef(() => {
    if (isNullOrEmpty(nameRef.current)) {
      return valuesRef.current;
    }
    if (Array.isArray(nameRef.current)) {
      return name.map(n => get(valuesRef.current, n));
    }
    return valuesRef.current[nameRef.current];
  });

  useEffect(() => {
    const watchers = Array.isArray(nameRef.current)
      ? nameRef.current
      : [nameRef.current || ''];
    const listeners = watchers.map((w, i) => {
      const listener = value => {
        if (Array.isArray(nameRef.current)) {
          valueRef.current = produce(valueRef.current, draftValue => {
            draftValue[i] = value;
          });
        } else {
          valueRef.current = value;
        }
        forceRender();
      };

      onValueChange(listener, [w]);
      return {
        fct: listener,
        watch: [w],
      };
    });

    return () => {
      listeners.forEach(l => offValueChange(l.fct, l.watch));
    };
  }, [onValueChange, offValueChange, valueRef]);

  return valueRef.current;
};

export const useFormStatus = () => {
  return useValidation('', false);
};
