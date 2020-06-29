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
import { get, isNull, isNullOrEmpty, set, isObject } from '../utils/object';
import { isFunction } from '../utils/type';
import { useFormAsyncBind, useFormBind } from './bind';
import { FormContext, useFormContext } from './context';
import { useFormRule } from './rule';
import { isInteger } from '../utils/type';
import {
  clearValidation,
  compileValidations,
  defaultValidation,
  ERROR,
  getContainerFieldValidation,
  hasValidation,
  LOADING,
  OK,
  setValidation,
  useValidation,
  validateAll,
  WARNING,
} from './validations';

export const formService = {
  init: function () {
    this.fields = {};
    this.listeners = {
      valueChange: {},
      validationChange: {},
    };
    this.pendingDispatch = [];

    const fieldIndex = {};
    const watchIndex = {};

    const onChange = (type, listener, watchs) => {
      watchs = Array.isArray(watchs) ? watchs : [watchs];

      for (let watch of watchs) {
        this.listeners[type][watch] = this.listeners[type][watch] || [];
        this.listeners[type][watch].push({ listener, watchs });
        if (type === 'valueChange') {
          set(watchIndex, watch, true, false);
        }
      }
    };

    const offChange = (type, listener, watchs) => {
      watchs = Array.isArray(watchs) ? watchs : [watchs];
      for (let watch of watchs) {
        this.listeners[type][watch] = this.listeners[type][watch] || [];
        this.listeners[type][watch] = this.listeners[type][watch].filter(
          x => x.listener !== listener
        );
      }
    };

    this.addField = field => {
      if (!this.fields[field.name]) {
        this.fields[field.name] = field;
        set(fieldIndex, field.name, true, false);
      }
    };

    this.onValueChange = (listener, watchs) =>
      onChange('valueChange', listener, watchs);
    this.offValueChange = (listener, watchs) =>
      offChange('valueChange', listener, watchs);
    this.onValidationChange = (listener, watchs) =>
      onChange('validationChange', listener, watchs);
    this.offValidationChange = (listener, watchs) =>
      offChange('validationChange', listener, watchs);

    this.getSubFieldNames = fieldName => {
      let result = [];
      const index = get(fieldIndex, fieldName);
      if (index) {
        if (Array.isArray(index)) {
          for (let i in index) {
            result = result.concat(this.getSubFieldNames(`${fieldName}.${i}`));
          }
        } else if (isObject(index)) {
          Object.keys(index).forEach(childFieldName => {
            result = result.concat(
              this.getSubFieldNames(`${fieldName}.${childFieldName}`)
            );
          });
        }
        if (this.fields[fieldName]) {
          result.push(fieldName);
        }
      }
      return result;
    };

    this.getSubWatchs = watch => {
      let result = [];

      const index = get(watchIndex, watch);
      if (index) {
        if (Array.isArray(index)) {
          for (let i in index) {
            result = result.concat(this.getSubWatchs(`${watch}.${i}`));
          }
        } else if (isObject(index)) {
          Object.keys(index).forEach(childWatch => {
            result = result.concat(this.getSubWatchs(`${watch}.${childWatch}`));
          });
        }
        result.push(watch);
      }
      return result;
    };
  },
  reducers: {
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

    _setValues: function (state, { values = {}, validations = {} }) {
      Object.keys(values).forEach(key => {
        const field = this.fields[key];
        if (field && field.touchOn === 'change' && !field.touched) {
          field.touched = true;
        }
        set(state, `values.${key}`, values[key]);
        this.pendingDispatch = this.pendingDispatch.concat(
          this.getSubWatchs(key)
        );
      });

      Object.keys(validations).forEach(fieldName => {
        state.validations[fieldName] = validations[fieldName];
        this.pendingDispatch.push(fieldName);
      });
    },

    setValidation: function (state, { id, name, message, level }) {
      const field = this.fields[name];
      setValidation(field, id, level, message);
      compileValidations(state, field);
      this.pendingDispatch.push(name);
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
      const async = yield call([this, validateAll], {
        [name]: value,
      });
      if (async.length > 0) {
        yield call(this.compileValidations, async);
      }
    }),

    setValues: latest(function* (values) {
      const async = yield call([this, validateAll], values);
      if (async.length > 0) {
        yield call(this.compileValidations, async);
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
  const defaultValuesRef = useRef({});
  const formOptionsRef = useRef(formOptions);

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
        if (get(valuesRef.current, name) === undefined) {
          defaultValuesRef.current[name] = fieldOptions.defaultValue;
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
        if (isFunction(formOptionsRef.current.onError)) {
          formOptionsRef.current.onError(fields, valuesRef.current);
        }
        break;
      case WARNING:
        service.submitting = false;
        if (isFunction(formOptionsRef.current.onWarning)) {
          formOptionsRef.current.onWarning(fields, valuesRef.current);
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
      // const keys = Object.keys(initialValue || {});
      // if (keys.length > 0) {
      //   const values = {};
      //   keys.forEach(
      //     k => (values[`${fieldArrayName}.${index}.${k}`] = initialValue[k])
      //   );
      //   service.setValues(values);
      // } else {
      //   console.log('setValue', `${fieldArrayName}.${index}`, {});

      // }
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
      offValidationChange: service.offValidationChange,
      offValueChange: service.offValueChange,
      onValidationChange: service.onValidationChange,
      onValueChange: service.onValueChange,
      remove,
      setError,
      setOK,
      setPendingValidation,
      setValidation: setLevelValidation,
      setValue,
      setValues: service.setValues,
      setWarning,
      submit,
      valuesRef,
      validationsRef,
    };
  }, [
    add,
    clearLevelValidation,
    service.fields,
    init,
    service.offValidationChange,
    service.offValueChange,
    service.onValidationChange,
    service.onValueChange,
    remove,
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
                  }

                  if (type === 'validationChange') {
                    listener.watchs.forEach(w => {
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
                      watchs.push(next);
                    });
                  }
                  if (changed) {
                    listener.listener(...watchs);
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
      add,
      asyncBind: useAsyncBindRef.current,
      bind: useBindRef.current,
      clearValidation: clearLevelValidation,
      field,
      Form,
      getValue,
      getValidation,
      remove,
      rule: useRuleRef.current,
      setError,
      setValidation: setLevelValidation,
      setValue,
      setValues: service.setValues,
      setOK,
      setWarning,
      setPendingValidation,
      submit,
      validations,
      values,
    };
  }, [
    add,
    clearLevelValidation,
    field,
    getValidation,
    getValue,
    Form,
    remove,
    setError,
    setLevelValidation,
    setValue,
    service.setValues,
    setOK,
    setWarning,
    setPendingValidation,
    submit,
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
