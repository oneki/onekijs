import React, { useCallback, useContext, useEffect, useMemo, useRef, useState, useReducer } from 'react';
import { call, fork, apply } from "redux-saga/effects";
import { latest } from './saga';
import { useLocalService } from './service';
import { del, get, isNull, set } from './utils/object';
import { ERROR, LOADING, OK, WARNING } from './validation';
import { useIsomorphicLayoutEffect } from './utils/hook';

export const FormContext = React.createContext();
export const useFormContext = () => {
  return useContext(FormContext);
}

export const StaticFormContext = React.createContext();
export const useStaticFormContext = () => {
  return useContext(StaticFormContext);
}

const serializeLevel = (level) => {
  switch(parseInt(level)) {
    case LOADING: return 'loading';
    case ERROR: return 'error';
    case WARNING: return 'warning';
    case OK: return 'ok';
    default: return null;
  }
}

const compileValidations = (state, field)=> {
  if (field) {
    for (let level in field.validations) {
      for (let id in field.validations[level]) {
        set(state, `validations.${field.name}`, {
          status: serializeLevel(level),
          message: field.validations[level][id]
        })
        return;
      }
    }
    set(state, `validations.${field.name}`, {
      status: 'ok',
      message: null
    });
  }

}

const hasValidation = (field, id, level, message=null) => {
  if (field) {
    const validation = get(field, `validations.${level}.${id}`);
    return validation === message;
  }
  return false;
}

const hasNonOkValidation = (field, id) => {
  if (field) {
    const validations = field['validations'] || []
    for (let i in validations) {
      if (i !== OK && validations[i][id] !== undefined) {
        return true;
      }
    }
  }
  return false;
}

const setValidation = (field, id, level, message=null) => {
  // clean first
  if (field) {
    const validations = field['validations'] || []
    for (let i in validations) {
      delete validations[i][id]
    }
    
    // set the message
    set(field, `validations.${level}.${id}`, message);
  }

}

const clearValidation = (field, id, level) => {
  if (field) {
    del(field.validations, `${level}.${id}`);
  }
}

const validate = function* (field, validatorName, validator, value) {
  const result = yield call(validator, value)
  if (result.valid) {
    yield call(setValidation, field, validatorName, OK);
  } else {
    yield call(setValidation, field, validatorName, ERROR, result.message);
  }  
}

const validateAll = function* (field, value, values) {
  const validators = field.validators;
        
  // do all validations
  const tasks = []
  for (let i in validators) {
    const validatorName = `__validator_${i}`
    const validator = validators[i];
    tasks.push(yield fork(validate, field, validatorName, validator, value))
  }

  const hasAsync = tasks.find(t => t.isRunning());
  yield call(this._setValue, {name: field.name, value, loading: hasAsync !== undefined})
  return hasAsync
}

export const formService = {
  init: function() {
    this._fields = {};
    this._listeners = {};
    this._pendingTrigger = [];

    this.listen = (listener, watchers) => {
      for (let watcher of watchers) {
        this._listeners[watcher] = this._listeners[watcher] || [];
        this._listeners[watcher].unshift({ listener, watchers });
      }
    }
    this.unlisten = (listener, watchers) => {
      for (let watcher of watchers) {
        this._listeners[watcher] = this._listeners[watcher] || [];
        this._listeners[watcher] = this._listeners[watcher].filter(x => x.listener !== listener);
      }
    }

    this.initField = (name, validators, options) => {
      if (!this._fields[name]) {
        this._fields[name] = {
          name,
          validators,
          validations: {},
          options,
          onChange: (value) => {
            if (value && value.nativeEvent && value.nativeEvent instanceof Event) {
              value = value.target.value;
            }        
            this.setValue({name, value})
          },
          onBlur: () => {
            // mark the field as touched
          }
        };
      }
      return this._fields[name]
    }  
  },
  reducers: {
    _setValue: function(state, {name, value, loading=false}) {
      this._pendingTrigger.push(name);     
      set(state, `values.${name}`, value);
      this._values = state.values;
      if (loading) {
        setValidation(this._fields[name], '__loading', LOADING, null);
      } else {
        clearValidation(this._fields[name], '__loading', LOADING);
      }
      compileValidations(state, this._fields[name])
    },

    setError: function(state, {id, name, message}) {
      setValidation(this._fields[name], id, ERROR, message);
      compileValidations(state, this._fields[name])
    },

    setWarning: function(state, {id, name, message}) {
      setValidation(this._fields[name], id, WARNING, message)
      compileValidations(state, this._fields[name])
    }, 
    
    setOK: function(state, {id, name, message}) {
      setValidation(this._fields[name], id, OK, message)
      compileValidations(state, this._fields[name])
    },  
    
    compileValidations: function(state, name) {
      compileValidations(state, this._fields[name])
    },

    setPendingValidation: function(state, {name, pending}) {
      if (pending) {
        setValidation(this._fields[name], '__loading', LOADING, null);
      } else {
        clearValidation(this._fields[name], '__loading', LOADING);
      }      
      compileValidations(state, this._fields[name])
    },

    triggerRule: function(state, rule) {
      const watchers = rule.watchers.map(w => get(state, `values.${w}`));
      rule.listener.apply(undefined, watchers);
    },

    setStateValue: function( state, {name, value}) {
      set(state, `values.${name}`, value)
      for (let key of Object.keys(this._listeners)) {
        if (key.startsWith(name)) {
          for (let rule of this._listeners[key]) {
            const watchers = rule.watchers.map(w => get(state, `values.${w}`));
            rule.listener.apply(undefined, watchers);
          }
        }
      }
    }

  },
  sagas: {
    setValue: latest(function*({name, value})  {
      const field = this._fields[name];
      if (field) {
        const hasAsync = yield call([this, validateAll], field, value)
        if (hasAsync) {
          yield call(this.setPendingValidation, {name, pending: false})
        }
      }
    })
  
  },
}

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
export const useForm = (onSubmit, options={}) => {
  // options cannot be changed afterwards. Used as initialState for the service
  // we copy initialValues to values to be able to reset the form to its initial state
  // immer will not kept a reference between to two objects. So changing values will not change initialValues
  options.initialValues = options.initialValues || {};
  options.validations = options.validations || {};
  options.values = options.initialValues
  const [state, service] = useLocalService(formService, options)
  const { values, validations } = state;

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
  const init = useCallback((name, validators=[], options={}) => {
    const field = service.initField(name, validators, options);
    return {
      onChange: field.onChange,
      onBlur: field.onBlur,
      name
    }
  }, [service])

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
  const field = useCallback((name, validators=[], options={}) => {
    const field = init(name, validators, options);
    field.value =  get(values, name, options.defaultValue === undefined ? '' : options.defaultValue);
    return field
  }, [init, values])

  /**
   * this method will just call the submit function passed to useForm with the whole value object
   */
  const submit = useCallback((e) => {
    console.log(values);
    //onSubmit(values);
    e.preventDefault();
  }, [onSubmit, values])

  const defaultValidation = useMemo(() => {
    return {
      message: null,
      status: null
    }
  }, [])

  const validation = useCallback((name) => {
    return get(validations, name, defaultValidation)
  }, [validations, defaultValidation]);

  const value = useCallback((name, defaultValue) => {
    return get(values, name, defaultValue)
  }, [values]);

  const setOK = useCallback((fieldName, validatorName) => {
    if (!hasValidation(field, validatorName, OK) && hasNonOkValidation(field, validatorName)) {
      service.setOK({
        id: validatorName,
        name: fieldName
      })      
    }
  }, [service, defaultValidation]);
  
  const setError = useCallback((fieldName, validatorName, message, matcher) => {
    const field = service._fields[fieldName];
    if (field) {
      if (isNull(matcher) || matcher) {
        if (!hasValidation(field, validatorName, ERROR, message)) {
          console.log('setError')
          service.setError({
            id: validatorName,
            name: fieldName,
            message
          })
        }
      } else {
        setOK(fieldName, validatorName);
      }
    }

  }, [service, defaultValidation, setOK]);


  
  const setWarning = useCallback((fieldName, validatorName, message, matcher) => {
    if (isNull(matcher) || matcher) {
      return service.setWarning({
        id: validatorName,
        name: fieldName,
        message
      })
    } else {
      return service.setWarning({
        id: validatorName,
        name: fieldName
      })
    }
  }, [service]);  

  const setValue = useCallback((name, value) => {
    return service.setValue({name, value})
  }, [service]);

  const setPendingValidation = useCallback((name, pending) => {
    return service.setPendingValidation({name, pending})
  }, [service])

  const contextRef = useRef({});
  contextRef.current.state = state;
  contextRef.current.service = service;
  const useRuleRef = useRef(useFormRule.bind(contextRef.current));
  const useBindRef = useRef(useFormBind.bind(contextRef.current));

  const formContextRef = useRef();
  const formContext = useMemo(() => {
    return { 
      field, 
      setError,
      setValue,
      setOK,
      setWarning,
      setPendingValidation,
      submit, 
      validation, 
      validations, 
      value,
      values,           
    }
  }, [field, service.listen, setError, setValue, setOK, setWarning, setPendingValidation, submit, service.unlisten, validation, validations, value, values])
  formContextRef.current = formContext;

  // The static context should never force a rerender of a component.
  // A field will use the listen method to get notified when its value is changed
  const staticFormContextRef = useRef();
  const staticFormContext = useMemo(() => {
    return {
      init,
      listen: service.listen,
      unlisten: service.unlisten,
      values: valuesRef.current,
      validations: validationsRef.current
    }

  }, [init, service.listen, service.unlisten])
  staticFormContextRef.current = staticFormContext;

  const Form = useMemo(() => {
    return (props) => {
      useIsomorphicLayoutEffect(() => {
        for (let prop of service._pendingTrigger) {
          for (let key of Object.keys(service._listeners)) {
            if (key.startsWith(prop)) {
              for (let rule of service._listeners[key]) {
                //const watchers = rule.watchers.map(w => get(this._state, `values.${w}`));     
                //yield apply(this, rule.listener, watchers);
                //yield call(this.triggerRule, rule);
                const watchers = rule.watchers.map(w => get(valuesRef.current, w, ''));
                rule.listener.apply(undefined, watchers);            
              }
            }
          } 
        }
        service._pendingTrigger = [];  
      })
    
      return (
        <FormContext.Provider value={formContextRef.current}>
          <StaticFormContext.Provider value={staticFormContextRef.current}>
            <form {...props} onSubmit={staticFormContextRef.current.submit}/>
          </StaticFormContext.Provider>
        </FormContext.Provider>
      )
    }
  }, [formContextRef, staticFormContextRef, service])

  const result = useMemo(() => {
    return Object.assign({}, formContext, {
      Form,
      bind: useBindRef.current,
      rule: useRuleRef.current,
    });
  }, [formContext, Form])

  return result;

}

export const useField = (name, validators=[], options={}) => {
  const { init, listen, unlisten, values } = useStaticFormContext();
  const field = init(name, validators, options);
  const [value, setValue] = useState(get(values, name, options.defaultValue === undefined ? '' : options.defaultValue));
  field.value = value;
  
  useEffect(() => {
    const listener = function(value) {
      //setImmediate(() => setValue(value)); 
      setValue(value)
    }
    listen(listener, [name]);
    return () => {
      unlisten(listener, [name]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return field;
}

const useFormRule = function (rule, watchers=[]) {
  const values = watchers.map(w => get(this.state.values, w));
  
  useMemo(() => {
    rule.apply(undefined, values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, values)
  
}

export const useRule = (rule, watchers=[]) => {
  const {listen, unlisten} = useStaticFormContext();
  useIsomorphicLayoutEffect(() => {
    const listener = function() {
      rule.apply(this, arguments);
    }
    listen(listener, watchers);
    return () => {
      unlisten(listener, watchers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// useFormBind does not interact with valueChange via a listener as it should be defined at the same level as useForm
const useFormBind = function (rule, watchers=[]) {
  return rule.apply(this, watchers.map(w => get(this.state.values, w)));
}

export const useBind = (rule, watchers=[]) => {
  // initial call
  const {values, listen, unlisten} = useStaticFormContext();
  
  const initialValue = useMemo(() => {
    return rule.apply(this, watchers.map(w => get(values, w)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [value, setValue] = useState(initialValue);

  useIsomorphicLayoutEffect(() => {
    const listener = function() {
      setValue(rule.apply(this, arguments))
    }
    listen(listener, watchers);
    return () => {
      unlisten(listener, watchers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return value;
}


