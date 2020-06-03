import { useCallback } from 'react';
import { call } from "redux-saga/effects";
import { latest } from './saga';
import { useLocalService } from './service';
import { get, isNull, set } from './utils/object';
import { isFunction, isPromise } from './utils/type';
import { ERROR, LOADING, OK, validators, WARNING } from './validation';

const serializeCode = (code) => {
  switch(code) {
    case LOADING: return 'loading';
    case ERROR: return 'error';
    case WARNING: return 'warning';
    case OK: return 'ok';
    default: return null;
  }
}

const compileValidations = (validations, id)=> {
  for (let i in validations) {
    if (!isNull(validations[i][id])) {
      return {
        status: serializeCode(parseInt(i)),
        message: validations[i][id]
      }
    }
  }
  return {
    status: 'ok',
    message: null
  }
}

const setValidation = (state, field, id, level, message) => {
  // clean first
  const validations = field['validations'] || []
  for (let i in validations) {
    delete validations[i][id]
  }
  
  // set the message
  set(field, `validations.${level}.${id}`, message);
  
  // compile and update the state
  set(state, `validations.${field.name}`, compileValidations(field.validations, id))
}

export const formService = {
  init: function() {
    this.fields = {};
  },
  reducers: {
    _setValue: function(state, {name, value}) {
      set(state, `values.${name}`, value);
    },

    setError: function(state, {id, name, message}) {
      setValidation(state, this.fields[name], id, ERROR, message)
    },

    setWarning: function(state, {id, name, message}) {
      setValidation(state, this.fields[name], id, WARNING, message)
    }, 
    
    setOK: function(state, {id, name, message}) {
      setValidation(state, this.fields[name], id, OK, message)
    },     

    setLoading: function(state, {id, name, message}) {
      setValidation(state, this.fields[name], id, LOADING, message)
    },

  },
  sagas: {
    setValue: latest(function*({name, value})  {
      yield call(this._setValue, {name, value})
      // validate data
      for (let validatorName in this.fields[name].validators) {
        let validator = this.fields[name].validators[validatorName]
        let config = {};
        if (!isFunction(validator)) {
          config = validator;
          validator = validators[validatorName]
        }
        if (isPromise(validator)) {
          yield call(this.setLoading, {id: validatorName, name});
        }

        const result = yield call(validator, value, config);
        if (result.valid) {
          yield call(this.setOK, {id: validatorName, name});
        } else {
          yield call(this.setError, {id: validatorName, name, message: result.message});
        }

      }
    })
  }
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
  options.initialValues = options.intialValues || {};
  options.values = options.initialValues
  const [state, service] = useLocalService(formService, options)
  const { values={}, validations={} } = state;

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
  const field = useCallback((name, validators={}, options={}) => {
    if (!service.fields[name]) {
      service.fields[name] = {
        name,
        validators,
        options,
        onChange: (value) => {
          if (value && value.nativeEvent && value.nativeEvent instanceof Event) {
            value = value.target.value;
          }          
          service.setValue({name, value})
        },
        onBlur: () => {
          // mark the field as touched
        }
      }
    }
    return Object.assign({value: get(values, name, '') }, service.fields[name]);
  }, [service, values])

  const submit = useCallback(() => {
    console.log(values);
  }, [values])

  return { field, submit, values, validations }

}