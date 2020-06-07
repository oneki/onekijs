import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { call, fork } from "redux-saga/effects";
import { latest } from './saga';
import { useLocalService } from './service';
import { del, get, isNull, set } from './utils/object';
import { ERROR, LOADING, OK, WARNING } from './validation';

export const FormContext = React.createContext();
export const useFormContext = () => {
  return useContext(FormContext);
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
  for (let key of Object.keys(this._listeners)) {
    if (key.startsWith(field.name)) {
      for (let rule of this._listeners[key]) {
        yield call(this.triggerRule, rule);
      }
    }
  }  
  
  return hasAsync
}

export const formService = {
  init: function() {
    this._fields = {};
    this._listeners = {};

    this.listen = (listener, watchers) => {
      for (let watcher of watchers) {
        this._listeners[watcher] = this._listeners[watcher] || [];
        this._listeners[watcher].push({ listener, watchers });
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
      set(state, `values.${name}`, value);
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
    }

  },
  sagas: {
    setValue: latest(function*({name, value}, { store })  {
      const field = this._fields[name];
      if (field) {
        const hasAsync = yield call([this, validateAll], field, value, store.getState().values)
        if (hasAsync) {
          yield call(this.setPendingValidation, {name, pending: false})
        }
      }
    }), 
  
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

  /**
   *  this method will built 4 props for any named field.
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
    const field = service.initField(name, validators, options);
    return {
      value: get(values, name, ''),
      onChange: field.onChange,
      onBlur: field.onBlur,
      name: field.name
    }
  }, [service, values])

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


  const setError = useCallback((fieldName, validatorName, message, matcher) => {
    if (isNull(matcher) || matcher) {
      return service.setError({
        id: validatorName,
        name: fieldName,
        message
      })
    } else {
      return service.setOK({
        id: validatorName,
        name: fieldName
      })
    }
  }, [service]);

  const setOK = useCallback((fieldName, validatorName) => {
    service.setOK({
      id: validatorName,
      name: fieldName
    })
  }, [service]);
  
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
  const useRuleRef = useRef(useRule.bind(contextRef.current));


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
      useRule: useRuleRef.current,
      validation, 
      validations, 
      value,
      values,           
    }
  }, [field, setError, setValue, setOK, setWarning, setPendingValidation, submit, validation, validations, value, values])
  formContextRef.current = formContext;

  const Form = useMemo(() => {
    return (props) => {
      const formContext = formContextRef.current;
      return (
        <FormContext.Provider value={formContext}>
          <form {...props} onSubmit={formContext.submit}/>
        </FormContext.Provider>
      )
    }
  }, [formContextRef])

  const result = useMemo(() => {
    return Object.assign({}, {Form}, formContext);
  }, [formContext, Form])

  return result;

}

export const useField = (name, validators=[], options={}) => {
  const { field } = useFormContext();
  const result = field(name, validators, options);
  return result;
}

const useRule = function (rule, watchers=[]) {
  // initial call
  const initialValue = useMemo(() => {
    const values = this.state.values;
    return rule.apply(this, watchers.map(w => get(values, w)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    const listener = function() {
      const value = rule.apply(this, arguments);
      setValue(value);
    }
    this.service.listen(listener, watchers);
    return () => {
      this.service.unlisten(listener, watchers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return value;
}

