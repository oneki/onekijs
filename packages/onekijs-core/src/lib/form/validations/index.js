import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { call, fork } from 'redux-saga/effects';
import { useLazyRef } from '../../utils/hook';
import { del, get, isNullOrEmpty, set } from '../../utils/object';
import { useFormContext } from '../context';

export const LOADING = 0;
export const ERROR = 1;
export const WARNING = 2;
export const OK = 3;
export const NONE = 4;

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

export const getContainerFieldValidation = (
  validations,
  fields,
  name = '',
  touchedOnly = true
) => {
  // compile the validations to get the status
  const messages = [];
  let result = {
    status: null,
    statusCode: NONE,
    fields: {},
    message: null,
  };

  for (let fieldName of Object.keys(validations).filter(k =>
    k.startsWith(name)
  )) {
    if (!touchedOnly || fields[fieldName].touched) {
      const validation = validations[fieldName];
      if (
        validation.statusCode <= result.statusCode &&
        validation.statusCode < NONE
      ) {
        if (validation.statusCode < result.statusCode) {
          result.status = validation.status;
          result.statusCode = validation.statusCode;
          result.fields = {};
        }
        result.fields[fieldName] = validation.message;
        if (validation.message) {
          messages.push(`<${fieldName}>: ${validation.message}`);
        }
      }
    }
  }
  if (messages.length > 0) {
    result.message = messages.join('\n');
  }
  return result;
};

export const compileValidations = (state, field) => {
  if (field) {
    for (let level in field.validations) {
      for (let id in field.validations[level]) {
        const validation = {
          status: serializeValidationLevel(level),
          statusCode: parseInt(level),
          message: field.validations[level][id],
        };
        state.validations[field.name] = validation;
        return;
      }
    }
    state.validations[field.name] = defaultValidation;
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

export const useValidation = (name = '', touchedOnly = true) => {
  const {
    onValidationChange,
    offValidationChange,
    validationsRef,
    fields,
  } = useFormContext();
  const argsRef = useRef({ name, touchedOnly });

  const getFieldValidation = useCallback(
    (name, touchedOnly) => {
      if (fields[name]) {
        if (touchedOnly) {
          return fields[name].touched
            ? validationsRef.current[name] || defaultValidation
            : defaultValidation;
        } else {
          return validationsRef.current[name] || defaultValidation;
        }
      } else {
        return getContainerFieldValidation(
          validationsRef.current,
          fields,
          name,
          touchedOnly
        );
      }
    },
    [fields, validationsRef]
  );

  const [validation, setValidation] = useState(() => {
    if (isNullOrEmpty(argsRef.current.name)) {
      return getContainerFieldValidation(
        validationsRef.current,
        fields,
        '',
        argsRef.current.touchedOnly
      );
    } else {
      return getFieldValidation(
        argsRef.current.name,
        argsRef.current.touchedOnly
      );
    }
  });

  useEffect(() => {
    const { name, touchedOnly } = argsRef.current;
    const listener = nextValidation => {
      if (isNullOrEmpty(name)) {
        setValidation(
          getContainerFieldValidation(
            validationsRef.current,
            fields,
            '',
            touchedOnly
          )
        );
      } else {
        if (!touchedOnly || fields[name].touched) {
          setValidation(nextValidation);
        }
      }
    };
    onValidationChange(listener, [name]);
    return () => {
      offValidationChange(listener, [name]);
    };
  }, [onValidationChange, offValidationChange, fields, validationsRef]);

  return validation;
};
