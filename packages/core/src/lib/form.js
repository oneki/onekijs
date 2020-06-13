import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  createRef
} from "react";
import { call, fork } from "redux-saga/effects";
import { latest } from "./saga";
import { useLocalService } from "./service";
import { useIsomorphicLayoutEffect } from "./utils/hook";
import { del, get, isNull, set } from "./utils/object";
import { defaultValidation, ERROR, LOADING, OK, WARNING } from "./validation";

export const FormContext = React.createContext();
export const useFormContext = () => {
  return useContext(FormContext);
};

const serializeLevel = (level) => {
  switch (parseInt(level)) {
    case LOADING:
      return "loading";
    case ERROR:
      return "error";
    case WARNING:
      return "warning";
    case OK:
      return "ok";
    default:
      return null;
  }
};

const compileValidations = (state, field) => {
  if (field && field.touched) {
    for (let level in field.validations) {
      for (let id in field.validations[level]) {
        set(state, `validations.${field.name}`, {
          status: serializeLevel(level),
          message: field.validations[level][id],
        });
        return;
      }
    }
    set(state, `validations.${field.name}`, {
      status: "ok",
      message: null,
    });
  }
};

const setValidation = (field, id, level, message=null) => {
  set(field, `validations.${level}.${id}`, message);
}

const clearValidation = (field, id, level) => {
  del(field, `validations.${level}.${id}`);
}

const hasValidation = (field, id, level, message = null) => {
  if (field) {
    const validation = get(field, `validations.${level}.${id}`);
    if (message === null) {
      return validation !== undefined;
    }
    return validation === message;
  }
  return false;
};

const hasNonOkValidation = (field, id) => {
  if (field) {
    const validations = field["validations"] || [];
    for (let i in validations) {
      if (i !== OK && validations[i][id] !== undefined) {
        return true;
      }
    }
  }
  return false;
};


const validate = function* (field, validatorName, validator, value) {
  yield call(setValidation, field, validatorName, LOADING);
  const result = yield call(validator, value);
  yield call(clearValidation, field, validatorName, LOADING);
  if (result.valid) {
    yield call(clearValidation, field, validatorName, ERROR);
  } else {
    yield call(setValidation, field, validatorName, ERROR, result.message);
  }
};


const validateAll = function* (fields) {
  

  // do all validations
  const tasks = {};
  const values = {};
  for (let field of fields) {
    const validators = field.validators;
    tasks[field.name] = [];
    values[field.name] = field.value;
    for (let i in validators) {
      const validatorName = `__validator_${i}`;
      const validator = validators[i];
      tasks[field.name].push(yield fork(validate, field, validatorName, validator, field.value));
    }
  }
  yield call(this._setValues, values);
  const async = [];
  for (let field of fields) {
    if (tasks[field.name].find((t) => t.isRunning())) {
      async.push(field.name);
    }
  }

  return async;
};

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
          (x) => x.listener !== listener
        );
      }
    };

    this.onValueChange = (listener, watchers) =>
      onChange("valueChange", listener, watchers);
    this.offValueChange = (listener, watchers) =>
      offChange("valueChange", listener, watchers);
    this.onValidationChange = (listener, watchers) =>
      onChange("validationChange", listener, watchers);
    this.offValidationChange = (listener, watchers) =>
      offChange("validationChange", listener, watchers);
    this.onFieldChange = (listener, watchers) =>
      onChange("fieldChange", listener, watchers);
    this.offFieldChange = (listener, watchers) =>
      offChange("fieldChange", listener, watchers);

  },
  reducers: {
    _setValues: function (state, values={}) {
      Object.keys(values).forEach(name => {
        set(state, `values.${name}`, values[name]);
        compileValidations(state, this.fields[name]);
        this.pendingDispatch.push(name);
      });
    },

    setValidation: function (state, { id, name, message, level }) {
      const field = this.fields[name];
      setValidation(field, id, level, message)
      compileValidations(state, field);
      this.pendingDispatch.push(name);
    },

    clearValidation: function (state, { id, name, level }) {
      const field = this.fields[name];
      clearValidation(field, id, level)
      compileValidations(state, field);
      this.pendingDispatch.push(name);
    },

    compileValidations: function (state, name) {
      if (!Array.isArray(name)){
        name = [name]
      }
      name.forEach(n => {
        compileValidations(state, this.fields[n]);
        this.pendingDispatch.concat(name)
      });
    },

    touch: function(state, name) {
      this.fields[name].touched = true;
      compileValidations(state, this.fields[name]);
      this.pendingDispatch.push(name);
    }
  },
  sagas: {
    setValue: latest(function* ({ name, value }) {
      const field = this.fields[name];
      if (field) {
        const toValidate = Object.assign({}, field, {value})
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
          toValidate.push(Object.assign({}, field, {value: values[name]}))
        }        
      })
      
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
        options.defaultValue = options.defaultValue === undefined ? "" : options.defaultValue
        service.fields[name] = {
          name,
          validators,
          validations: {},
          options,
          onChange: (value) => {
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
        if (get(values, name) === undefined) {
          if (createRef.current) {
            // queue all default values to trigger a unique change
            defaultValuesRef.current[name] = options.defaultValue;
          } else {
            // execute immediately the change
            service.setValue({ name, value: options.defaultValue })
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
        options.defaultValue === undefined ? "" : options.defaultValue
      );
      return field;
    },
    [init, values]
  );

  /**
   * this method will just call the submit function passed to useForm with the whole value object
   */
  const submit = useCallback((e) => {
    console.log(valuesRef.current);
    //onSubmit(valuesRef.current);
    e.preventDefault();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validation = useCallback(
    (name) => {
      return get(validations, name, defaultValidation);
    },
    [validations, defaultValidation]
  );

  const value = useCallback(
    (name, defaultValue) => {
      return get(values, name, defaultValue);
    },
    [values]
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
      return setOrClearValidation(ERROR, fieldName, validatorName, message, matcher)
    }, 
    [setOrClearValidation]
  );

  const setWarning = useCallback(
    (fieldName, validatorName, message, matcher) => {
      return setOrClearValidation(WARNING, fieldName, validatorName, message, matcher)
    }, 
    [setOrClearValidation]
  );  

  const setOK = useCallback(
    (fieldName, validatorName) => {
      return setOrClearValidation(OK, fieldName, validatorName, null, true)
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
    (fieldName, validatorName, pending) => {
      return setOrClearValidation(LOADING, fieldName, validatorName, null, pending );
    },
    [setOrClearValidation]
  );

  const contextRef = useRef({});
  contextRef.current.state = state;
  contextRef.current.service = service;
  const useRuleRef = useRef(useFormRule.bind(contextRef.current));
  const useBindRef = useRef(useFormBind.bind(contextRef.current));

  const formContextRef = useRef();
  const formContext = useMemo(() => {
    return {
      clearValidation: service.clearValidation,
      init,
      offFieldChange: service.offFieldChange,
      offValidationChange: service.offValidationChange,
      offValueChange: service.offValueChange,
      onFieldChange: service.onFieldChange,
      onValidationChange: service.onValidationChange,
      onValueChange: service.onValueChange,
      setError,
      setValidation: service.setValidation,
      setValue,
      setOK,
      setWarning,
      submit,
      values: valuesRef.current,
      validations: validationsRef.current,
    };
  }, [
    service.clearValidation,
    init,
    service.offFieldChange,
    service.offValidationChange,
    service.offValueChange,
    service.onFieldChange,
    service.onValidationChange,
    service.onValueChange,
    service.offFieldChange,
    setError,
    service.setValidation,
    setValue,
    setOK,
    setWarning,
    setPendingValidation,
    submit,
  ]);
  formContextRef.current = formContext;

  const Form = useMemo(() => {
    return (props) => {
      const prevValuesRef = useRef(null);
      const prevValidationsRef = useRef(null);
      
      useEffect(() => {
        for (let prop of service.pendingDispatch) {
          for (let type of Object.keys(service.listeners)) {
            for (let key of Object.keys(service.listeners[type])) {
              if (key.startsWith(prop)) {
                for (let rule of service.listeners[type][key]) {
                  let watchers = [];
                  const changed = false;
                  if (type === "valueChange" || type === "fieldChange") {
                    rule.watchers.forEach((w) => {
                      const prev = get(prevValuesRef.current, w, "");
                      const next = get(valuesRef.current, w, "");
                      watchers.push(next);
                      if (prev !== next) {
                        changed = true;
                      }
                    });
                  }
                  
                  if (type === "validationChange" || type === "fieldChange") {
                    rule.watchers.forEach((w) => {
                      const prev = get(prevValidationsRef.current, w);
                      const next = get(validationsRef.current, w);
                      watchers.push(next);
                      if (prev !== next) {
                        changed = true;
                      }
                    });
                  }
                  if (changed) {
                    if (type === "fieldChange") {
                      watchers = rule.watchers.map((w) => {
                        return {
                          value: get(valuesRef.current, w, ""),
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
  }, [formContextRef, service, submit]);

  const result = useMemo(() => {
    return Object.assign({}, formContext, {
      bind: useBindRef.current,
      field,
      Form,
      rule: useRuleRef.current,
      validation,
      validations,
      value,
      values,
    });
  }, [formContext, field, Form, validation, validations, value, values]);

  useEffect(() => {
    if (Object.keys(defaultValuesRef.current).length > 0) {
      service.setValues(defaultValuesRef.current)
    }
    createRef.current = false;
  },[service]);

  return result;
};

export const useField = (name, validators = [], options = {}) => {
  const { init, onFieldChange, offFieldChange, validations, values } = useFormContext();
  const field = init(name, validators, options);
  const [value, setValue] = useState(
    get(
      values,
      name,
      options.defaultValue === undefined ? "" : options.defaultValue
    )
  );
  const [validation, setValidation] = useState(
    get(
      validations,
      name,
      defaultValidation
    )
  );  
  field.value = value;
  field.validation = validation;

  useEffect(() => {
    const listener = function (field) {
      //setImmediate(() => setValue(value));
      setValue(field.value);
      setValidation(field.validation);
    };
    onFieldChange(listener, [name]);
    return () => {
      offFieldChange(listener, [name]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return field;
};

const useFormRule = function (rule, watchers = []) {
  const values = watchers.map((w) => get(this.state.values, w));

  useMemo(() => {
    rule.apply(undefined, values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, values);
};

export const useRule = (rule, watchers = []) => {
  const { onValueChange, offValueChange } = useFormContext();
  useIsomorphicLayoutEffect(() => {
    const listener = function () {
      rule.apply(this, arguments);
    };
    onValueChange(listener, watchers);
    return () => {
      offValueChange(listener, watchers);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// useFormBind does not interact with valueChange via a listener as it should be defined at the same level as useForm
const useFormBind = function (rule, watchers = []) {
  return rule.apply(
    this,
    watchers.map((w) => get(this.state.values, w))
  );
};

export const useBind = (rule, watchers = []) => {
  // initial call
  const { values,  onValueChange, offValueChange } = useFormContext();

  const initialValue = useMemo(() => {
    return rule.apply(
      this,
      watchers.map((w) => get(values, w))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [value, setValue] = useState(initialValue);

  useIsomorphicLayoutEffect(() => {
    const listener = function () {
      setValue(rule.apply(this, arguments));
    };
    onValueChange(listener, watchers);
    return () => {
      offValueChange(listener, watchers);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value;
};
