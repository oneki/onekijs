import { set, del, get } from '../../utils/object';
import { call, fork } from 'redux-saga/effects';
import { useFormContext } from '../context';
import { useState, useEffect } from 'react';

export const LOADING = 0;
export const ERROR = 1;
export const WARNING = 2;
export const OK = 3;

export const defaultValidation = {
  message: null,
  status: null,
};

export const serializeValidationLevel = level => {
  switch (parseInt(level)) {
    case LOADING:
      return 'loading';
    case ERROR:
      return 'error';
    case WARNING:
      return 'warning';
    case OK:
      return 'ok';
    default:
      return null;
  }
};

export const compileValidations = (state, field) => {
  if (field && field.touched) {
    for (let level in field.validations) {
      for (let id in field.validations[level]) {
        set(state, `validations.${field.name}`, {
          status: serializeValidationLevel(level),
          message: field.validations[level][id],
        });
        return;
      }
    }
    set(state, `validations.${field.name}`, {
      status: 'ok',
      message: null,
    });
  }
};

export const setValidation = (field, id, level, message = null) => {
  set(field, `validations.${level}.${id}`, message);
};

export const clearValidation = (field, id, level) => {
  del(field, `validations.${level}.${id}`);
};

export const hasValidation = (field, id, level, message = null) => {
  if (field) {
    const validation = get(field, `validations.${level}.${id}`);
    if (message === null) {
      return validation !== undefined;
    }
    return validation === message;
  }
  return false;
};

// const hasNonOkValidation = (field, id) => {
//   if (field) {
//     const validations = field["validations"] || [];
//     for (let i in validations) {
//       if (i !== OK && validations[i][id] !== undefined) {
//         return true;
//       }
//     }
//   }
//   return false;
// };

export const validate = function* (field, validatorName, validator, value) {
  yield call(setValidation, field, validatorName, LOADING);
  const result = yield call(validator, value);
  yield call(clearValidation, field, validatorName, LOADING);
  if (result.valid) {
    yield call(clearValidation, field, validatorName, ERROR);
  } else {
    yield call(setValidation, field, validatorName, ERROR, result.message);
  }
};

export const validateAll = function* (fields) {
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
      tasks[field.name].push(
        yield fork(validate, field, validatorName, validator, field.value)
      );
    }
  }
  yield call(this._setValues, values);
  const async = [];
  for (let field of fields) {
    if (tasks[field.name].find(t => t.isRunning())) {
      async.push(field.name);
    }
  }

  return async;
};

export const useValidation = name => {
  const {
    onValidationChange,
    offValidationChange,
    validations,
  } = useFormContext();

  const [validation, setValidation] = useState(
    get(validations, name, defaultValidation)
  );

  useEffect(() => {
    const listener = function (validation) {
      setValidation(validation);
    };
    onValidationChange(listener, [name]);
    return () => {
      offValidationChange(listener, [name]);
    };
    // eslint-disable-next-line
  }, []);

  return validation;
};
