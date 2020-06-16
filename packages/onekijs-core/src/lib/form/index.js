import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { call } from 'redux-saga/effects';
import { latest } from '../saga';
import { useLocalService } from '../service';
import { get, isNull, set } from '../utils/object';
import { defaultValidation, ERROR, LOADING, OK, WARNING } from './validations';
import {
  compileValidations,
  setValidation,
  clearValidation,
  validateAll,
  hasValidation,
} from './validations';
import { useFormRule } from './rule';
import { useFormBind, useFormAsyncBind } from './bind';
import { FormContext, useFormContext } from './context';

export const formService = {
  init: function () {
    this.fields = {};
    this.listeners = {
      valueChange: {},
      validationChange: {},
      fieldChange: {},
    };
    this.pendingDispatch = [];

    const onChange = (type, listener, watchers) => {
      for (let watcher of watchers) {
        this.listeners[type][watcher] = this.listeners[type][watcher] || [];
        this.listeners[type][watcher].unshift({ listener, watchers });
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
    this.onFieldChange = (listener, watchers) =>
      onChange('fieldChange', listener, watchers);
    this.offFieldChange = (listener, watchers) =>
      offChange('fieldChange', listener, watchers);
  },
  reducers: {
    _setValues: function (state, values = {}) {
      Object.keys(values).forEach(name => {
        set(state, `values.${name}`, values[name]);
        compileValidations(state, this.fields[name]);
        this.pendingDispatch.push(name);
      });
    },

    setValidation: function (state, { id, name, message, level }) {
      const field = this.fields[name];
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
      this.fields[name].touched = true;
      compileValidations(state, this.fields[name]);
      this.pendingDispatch.push(name);
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
export const useForm = (onSubmit, options = {}) => {
  // options cannot be changed afterwards. Used as initialState for the service
  // we copy initialValues to values to be able to reset the form to its initial state
  // immer will not kept a reference between to two objects. So changing values will not change initialValues
  options.initialValues = options.initialValues || {};
  options.validations = options.validations || {};
  options.values = options.initialValues;
  const [state, service] = useLocalService(formService, options);
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
   *  this method will register a field and return some two listeners
   *   - onChange
   *   - onBlur
   *
   * @param {string} name - the name of the field. Must be related to a key in values
   * @param {Object} validators - a object of validators
   *
   * @return {Object} a list of listeners for the field and its name
   *                    - name
   *                    - onChange
   *                    - onBlur
   */
  const init = useCallback(
    (name, validators = [], options = {}) => {
      if (!service.fields[name]) {
        options.defaultValue =
          options.defaultValue === undefined ? '' : options.defaultValue;
        service.fields[name] = {
          name,
          validators,
          validations: {},
          options,
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
          onBlur: () => {
            if (!service.fields[name].touched) {
              service.touch(name);
            }
          },
        };
        if (get(valuesRef.current, name) === undefined) {
          if (createRef.current) {
            // queue all default values to trigger a unique change
            defaultValuesRef.current[name] = options.defaultValue;
          } else {
            // execute immediately the change
            service.setValue({ name, value: options.defaultValue });
          }
        }
      }
      const field = service.fields[name];
      return {
        onChange: field.onChange,
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
   *   - onBlur
   *
   * @param {string} name - the name of the field. Must be related to a key in values
   * @param {Object} validators - a object of validators
   *
   * @return {Object} a list of props for the field
   *                    - name
   *                    - value
   *                    - onChange
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
    onSubmit(valuesRef.current);
    e.preventDefault();
    // eslint-disable-next-line
  }, []);

  const getValidation = useCallback(
    name => {
      return get(validations, name, defaultValidation);
    },
    [validations]
  );

  const getValue = useCallback(
    (name, defaultValue) => {
      return get(values, name, defaultValue);
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
      offFieldChange: service.offFieldChange,
      offValidationChange: service.offValidationChange,
      offValueChange: service.offValueChange,
      onFieldChange: service.onFieldChange,
      onValidationChange: service.onValidationChange,
      onValueChange: service.onValueChange,
      setError,
      setValidation: setLevelValidation,
      setValue,
      setOK,
      setWarning,
      setPendingValidation,
      submit,
      values: valuesRef.current,
      validations: validationsRef.current,
    };
  }, [
    clearLevelValidation,
    init,
    service.offFieldChange,
    service.offValidationChange,
    service.offValueChange,
    service.onFieldChange,
    service.onValidationChange,
    service.onValueChange,
    setError,
    setLevelValidation,
    setValue,
    setOK,
    setPendingValidation,
    setWarning,
    submit,
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
              if (key.startsWith(prop)) {
                for (let rule of service.listeners[type][key]) {
                  let watchers = [];
                  let changed = false;
                  if (type === 'valueChange' || type === 'fieldChange') {
                    rule.watchers.forEach(w => {
                      const prev = get(prevValuesRef.current, w, '');
                      const next = get(valuesRef.current, w, '');
                      watchers.push(next);
                      if (prev !== next) {
                        changed = true;
                      }
                    });
                  }

                  if (type === 'validationChange' || type === 'fieldChange') {
                    rule.watchers.forEach(w => {
                      const prev = get(prevValidationsRef.current, w);
                      const next = get(validationsRef.current, w);
                      watchers.push(next);
                      if (prev !== next) {
                        changed = true;
                      }
                    });
                  }
                  if (changed) {
                    if (type === 'fieldChange') {
                      watchers = rule.watchers.map(w => {
                        return {
                          value: get(valuesRef.current, w, ''),
                          validation: get(
                            validationsRef.current,
                            w,
                            defaultValidation
                          ),
                        };
                      });
                    }
                    rule.listener.apply(undefined, watchers);
                  }
                }
              }
            }
          }
        }
        service.pendingDispatch = [];
        prevValuesRef.current = valuesRef.current;
        prevValidationsRef.current = validationsRef.current;
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

export const useValue = (name, options = {}) => {
  const { onValueChange, offValueChange, values } = useFormContext();

  const [value, setValue] = useState(
    get(
      values,
      name,
      options.defaultValue === undefined ? '' : options.defaultValue
    )
  );

  useEffect(() => {
    const listener = function (value) {
      setValue(value);
    };
    onValueChange(listener, [name]);
    return () => {
      offValueChange(listener, [name]);
    };
    // eslint-disable-next-line
  }, []);

  return value;
};
