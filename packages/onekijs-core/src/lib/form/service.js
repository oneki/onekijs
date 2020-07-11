import { fork } from 'redux-saga/effects';
import { get, del, set, isObject } from '../utils/object';
import {
  LOADING,
  ERROR,
  defaultValidation,
  WARNING,
  OK,
  NONE,
} from './validations';
import { reducer } from '../reducer';
import { latest, leading } from '../saga';
import { isFunction } from '../utils/type';

export const formService = {
  init: function () {
    this.fields = {};
    this.listeners = {
      valueChange: {},
      validationChange: {},
      submittingChange: {},
    };
    this.pendingDispatch = new Set();
    this.fieldIndex = {};
    this.watchIndex = {};
  },

  addField: function (field) {
    if (!this.fields[field.name]) {
      this.fields[field.name] = field;
      set(this.fieldIndex, field.name, true, false);
    }
  },

  clearValidation: reducer(function (
    { fieldName, validatorName, level, compile = true },
    state
  ) {
    del(this.fields[fieldName], `validations.${level}.${validatorName}`);
    if (compile) {
      this.compileValidations(fieldName, state);
    }
  }),

  compileValidations: reducer(function (fieldNames, state) {
    if (!Array.isArray(fieldNames)) {
      fieldNames = [fieldNames];
    }
    fieldNames.forEach(fieldName => {
      if (this.fields[fieldName]) {
        state.validations[fieldName] = this.getValidation(fieldName);
        this.pendingDispatch.add(fieldName);
      }
    });
  }),

  getContainerFieldValidation: function (
    validations,
    fields,
    prefix = '',
    touchedOnly = true
  ) {
    // compile the validations to get the status
    const messages = [];
    let result = {
      status: null,
      statusCode: NONE,
      fields: {},
      message: null,
    };

    for (let fieldName of Object.keys(validations).filter(k =>
      k.startsWith(prefix)
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
  },

  _getSubFieldNames: function (fieldName) {
    let result = [];
    const index = get(this.fieldIndex, fieldName);
    if (index) {
      if (Array.isArray(index)) {
        for (let i in index) {
          result = result.concat(this._getSubFieldNames(`${fieldName}.${i}`));
        }
      } else if (isObject(index)) {
        Object.keys(index).forEach(childFieldName => {
          result = result.concat(
            this._getSubFieldNames(`${fieldName}.${childFieldName}`)
          );
        });
      }
      if (this.fields[fieldName]) {
        result.push(fieldName);
      }
    }
    return result;
  },

  _getSubWatchs: function (watch) {
    let result = [];

    const index = get(this.watchIndex, watch);
    if (index) {
      if (Array.isArray(index)) {
        for (let i in index) {
          result = result.concat(this._getSubWatchs(`${watch}.${i}`));
        }
      } else if (isObject(index)) {
        Object.keys(index).forEach(childWatch => {
          result = result.concat(this._getSubWatchs(`${watch}.${childWatch}`));
        });
      }
      result.push(watch);
    }
    return result;
  },

  getValidation: function (fieldName) {
    if (this.fields[fieldName]) {
      const field = this.fields[fieldName];
      for (let level in field.validations) {
        for (let id in field.validations[level]) {
          const validation = {
            status: this.serializeValidationLevel(level),
            statusCode: parseInt(level),
            message: field.validations[level][id],
          };
          return validation;
        }
      }
      return defaultValidation;
    }
    return null;
  },

  hasValidation: function (fieldName, validatorName, level, message = null) {
    const field = this.fields[fieldName];
    if (field) {
      const validation = get(field, `validations.${level}.${validatorName}`);
      if (message === null) {
        return validation !== undefined;
      }
      return validation === message;
    }
    return false;
  },

  offChange: function (type, listener, watchs) {
    watchs = Array.isArray(watchs) ? watchs : [watchs];
    for (let watch of watchs) {
      this.listeners[type][watch] = this.listeners[type][watch] || [];
      this.listeners[type][watch] = this.listeners[type][watch].filter(
        x => x.listener !== listener
      );
    }
  },

  onChange: function (type, listener, watchs, once) {
    watchs = Array.isArray(watchs) ? watchs : [watchs];

    for (let watch of watchs) {
      this.listeners[type][watch] = this.listeners[type][watch] || [];
      this.listeners[type][watch].push({ listener, watchs, once });
      if (type === 'valueChange') {
        set(this.watchIndex, watch, true, false);
      }
    }
  },

  offSubmittingChange: function (listener) {
    this.offChange('submittingChange', listener, '');
  },

  onSubmittingChange: function (listener, once = false) {
    this.onChange('submittingChange', listener, '', once);
  },

  offValidationChange: function (listener, watchs) {
    this.offChange('validationChange', listener, watchs);
  },

  onValidationChange: function (listener, watchs, once = false) {
    this.onChange('validationChange', listener, watchs, once);
  },

  offValueChange: function (listener, watchs) {
    this.offChange('valueChange', listener, watchs);
  },

  onValueChange: function (listener, watchs, once = false) {
    this.onChange('valueChange', listener, watchs, once);
  },

  reset: reducer(function (payload, state) {
    state.values = state.initialValues;
    state.validations = {};
    this.init();
  }),

  serializeValidationLevel: function (level) {
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
  },

  setSubmitting: reducer(function (submitting, state) {
    state.submitting = submitting;
  }),

  setValidation: reducer(function (
    { fieldName, validatorName, message, level, compile = true },
    state
  ) {
    if (this.fields[fieldName]) {
      set(
        this.fields[fieldName],
        `validations.${level}.${validatorName}`,
        message
      );
    }
    if (compile) {
      this.compileValidations(fieldName, state);
    }
  }),

  _setValues: reducer(function ({ values = {}, validations = {} }, state) {
    Object.keys(values).forEach(key => {
      const field = this.fields[key];
      if (field && field.touchOn === 'change' && !field.touched) {
        field.touched = true;
      }
      set(state, `values.${key}`, values[key]);
      this._getSubWatchs(key).forEach(key => this.pendingDispatch.add(key));
    });

    Object.keys(validations).forEach(fieldName => {
      state.validations[fieldName] = validations[fieldName];
      this.compileValidations(fieldName, state);
    });
  }),

  setValue: latest(function* ({ name, value }) {
    const async = yield this.validateAll({
      [name]: value,
    });
    if (async.length > 0) {
      yield this.compileValidations(async);
    }
  }),

  setValues: latest(function* (values) {
    const async = yield this.validateAll(values);
    if (async.length > 0) {
      yield this.compileValidations(async);
    }
  }),

  submit: leading(function* ({
    resubmit,
    onSuccess,
    onError,
    onWarning,
    values,
    validations,
  }) {
    // compile the validations to get the status
    const { statusCode, fields } = yield this.getContainerFieldValidation(
      validations,
      this.fields,
      '',
      false
    );
    yield this.touchAll();
    yield this.setSubmitting(true);

    switch (statusCode) {
      case LOADING:
        this.onValidationChange(() => resubmit(), '', true);
        break;
      case ERROR:
        if (isFunction(onError)) {
          yield onError(fields, values);
        }
        yield this.setSubmitting(false);
        break;
      case WARNING:
        if (isFunction(onWarning)) {
          yield onWarning(fields, values);
        } else {
          yield onSuccess(values);
        }
        yield this.setSubmitting(false);
        break;
      default:
        yield onSuccess(values);
        yield this.setSubmitting(false);
        break;
    }
  }),

  touch: reducer(function (fieldName, state) {
    if (!this.fields[fieldName].touched) {
      this.fields[fieldName].touched = true;
      this.compileValidations(fieldName, state);
    }
  }),

  touchAll: reducer(function (payload, state) {
    Object.keys(this.fields).forEach(fieldName => {
      this.touch(fieldName, state);
    });
  }),

  validate: function* (fieldName, validatorName, validator, value) {
    yield this.setValidation({
      fieldName,
      validatorName,
      level: LOADING,
      compile: false,
    });
    const result = yield validator(value);
    yield this.clearValidation({
      fieldName,
      validatorName,
      level: LOADING,
      compile: false,
    });
    if (result.valid) {
      yield this.clearValidation({
        fieldName,
        validatorName,
        level: ERROR,
        compile: false,
      });
    } else {
      yield this.setValidation({
        fieldName,
        validatorName,
        level: ERROR,
        message: result.message,
        compile: false,
      });
    }
  },

  validateAll: function* (values) {
    // do all validations
    const tasks = {};
    const validations = {};
    const keys = Object.keys(values);
    for (let key of keys) {
      // we need to find all sub fields (if any) and do the validations for these fields
      const fieldNames = this._getSubFieldNames(key);
      for (let fieldName of fieldNames) {
        const field = this.fields[fieldName];
        const validators = field.validators;
        tasks[fieldName] = [];
        for (let i in validators) {
          const validatorName = `__validator_${i}`;
          const validator = validators[i];
          tasks[fieldName].push(
            yield fork(
              this.validate,
              fieldName,
              validatorName,
              validator,
              get(values[key], fieldName.substr(key.length + 1))
            )
          );
        }
      }
    }
    const async = [];
    Object.keys(tasks).forEach(fieldName => {
      validations[fieldName] = this.getValidation(fieldName);
      if (tasks[fieldName].find(t => t.isRunning())) {
        async.push(fieldName);
      }
    });
    yield this._setValues({ values, validations });
    return async;
  },
};
