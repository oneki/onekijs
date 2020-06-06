import React, { useRef, useContext } from 'react'
import { useCallback, useMemo } from 'react';
import { call, fork } from "redux-saga/effects";
import { latest } from './saga';
import { useLocalService } from './service';
import { del, get, set } from './utils/object';
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


const setValidation = (field, id, level, message=null) => {
  // clean first
  const validations = field['validations'] || []
  for (let i in validations) {
    delete validations[i][id]
  }
  
  // set the message
  set(field, `validations.${level}.${id}`, message);
}

const clearValidation = (field, id, level) => {
  del(field.validations, `${level}.${id}`);
}

const validate = function* (field, validatorName, validator, value) {
  const result = yield call(validator, value)
  if (result.valid) {
    yield call(setValidation, field, validatorName, OK);
  } else {
    yield call(setValidation, field, validatorName, ERROR, result.message);
  }  
}

const validateAll = function* (field, value) {
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
    this.fields = {};
  },
  reducers: {
    initField: function(state, {name, validators, options}) {
      this.fields[name] = {
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
    },

    _setValue: function(state, {name, value, loading=false}) {
      set(state, `values.${name}`, value);
      if (loading) {
        setValidation(this.fields[name], '__loading', LOADING, null);
      } else {
        clearValidation(this.fields[name], '__loading', LOADING);
      }
      compileValidations(state, this.fields[name])
    },

    setError: function(state, {id, name, message}) {
      setValidation(this.fields[name], id, ERROR, message);
      compileValidations(state, this.fields[name])
    },

    setWarning: function(state, {id, name, message}) {
      setValidation(this.fields[name], id, WARNING, message)
      compileValidations(state, this.fields[name])
    }, 
    
    setOK: function(state, {id, name, message}) {
      setValidation(this.fields[name], id, OK, message)
      compileValidations(state, this.fields[name])
    },  
    
    compileValidations: function(state, name) {
      compileValidations(state, this.fields[name])
    },

    setPendingValidation: function(state, {name, pending}) {
      if (pending) {
        setValidation(this.fields[name], '__loading', LOADING, null);
      } else {
        clearValidation(this.fields[name], '__loading', LOADING);
      }      
      compileValidations(state, this.fields[name])
    },

  },
  sagas: {
    setValue: latest(function*({name, value})  {
      const field = this.fields[name];
      if (field) {
        const hasAsync = yield call([this, validateAll], field, value)
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
    if (!service.fields[name]) {
      service.initField({name, validators, options})
    }
    return Object.assign({value: get(values, name, '') }, service.fields[name]);
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

  const formContextRef = useRef();
  const formContext = useMemo(() => {
    return { 
      field, 
      submit, 
      value,
      values,
      validations, 
      validation,
      setError: service.setError,
      setValue: service.setValue,
      setOK: service.setOK,
      setWarning: service.setWarning,
      setPendingValidation: service.setPendingValidation
    }
  }, [field, submit, value, values, validations, validation, service.setError, service.setValue, service.setOK, service.setWarning, service.setPendingValidation])
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

export const useRule = (rule, watchers=[]) => {
  const watchersRef = useRef(null);
  const resultRef = useRef(null);

  let execute = false;
  if (watchersRef.current === null || watchersRef.current.length !== watchers.length) {
    execute = true;
  } else if (watchers.length !== 0) {
    for (let i in watchers) {
      if (watchers[i] !== watchersRef.current[i]) {
        execute = true;
        break;
      }
    }
  }
  watchersRef.current = watchers;

  let result = resultRef.current;
  if (execute) {
    result = rule.apply(this, watchers);
    resultRef.current = result;
  }
  
  return result;
}