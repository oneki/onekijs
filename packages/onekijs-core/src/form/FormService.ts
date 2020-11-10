import { Task } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { AnonymousObject, SagaEffect } from '../core/typings';
import {
  Field,
  FormErrorCallback,
  FormListener,
  FormListenerProps,
  FormListenerType,
  FormState,
  FormSubmitCallback,
  FormWarningCallback,
  ValidationCode,
  ValidationResult,
  ValidationStatus,
  Validator,
} from './typings';
import FieldValidation, { defaultValidation } from './FieldValidation';
import ContainerValidation from './ContainerValidation';
import { get, set, del, isObject } from '../core/utils/object';
import { service, reducer, saga } from '../core/annotations';
import LocalService from '../core/LocalService';

@service
export default class FormService extends LocalService<FormState> {
  public fields: AnonymousObject<Field>;
  public listeners: {
    [k in FormListenerType]: AnonymousObject<FormListenerProps[]>;
  };
  public pendingDispatch: Set<string>;
  protected fieldIndex: {
    [fieldName: string]: boolean;
  };
  protected watchIndex: {
    [fieldName: string]: boolean;
  };

  constructor() {
    super();
    this.fields = {};
    this.listeners = {
      valueChange: {},
      validationChange: {},
      submittingChange: {},
    };
    this.pendingDispatch = new Set<string>();
    this.fieldIndex = {};
    this.watchIndex = {};
  }

  addField(field: Field): void {
    if (!this.fields[field.name]) {
      this.fields[field.name] = field;
      set(this.fieldIndex, field.name, true, false);
    }
  }

  @reducer
  clearValidation(fieldName: string, validatorName: string, code: ValidationCode, compile = true): void {
    del(this.fields[fieldName], `validations.${code}.${validatorName}`);
    if (compile) {
      this.compileValidations(fieldName);
    }
  }

  @reducer
  compileValidations(fieldNames: string[] | string, force = false): void {
    if (!Array.isArray(fieldNames)) {
      fieldNames = [fieldNames];
    }
    fieldNames.forEach((fieldName) => {
      if (this.fields[fieldName]) {
        const previousValidation = get(this.state, `validations.${fieldName}`);
        const nextValidation = this.getValidation(fieldName);
        if (force || !nextValidation.equals(previousValidation)) {
          set(this.state, `validations.${fieldName}`, nextValidation);
          this.pendingDispatch.add(fieldName);
        }
      }
    });
  }

  getContainerFieldValidation(
    validations: AnonymousObject<FieldValidation>,
    fields: AnonymousObject<Field>,
    prefix = '',
    touchedOnly = true,
  ): ContainerValidation {
    // compile the validations to get the status
    const messages = [];
    const result = new ContainerValidation('', ValidationStatus.None, ValidationCode.None, {});

    for (const fieldName of Object.keys(validations).filter((k) => k.startsWith(prefix))) {
      if (!touchedOnly || fields[fieldName].touched) {
        const validation = validations[fieldName];
        if (validation.code <= result.code && validation.code < ValidationCode.None) {
          if (validation.code < result.code) {
            result.status = validation.status;
            result.code = validation.code;
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
  }

  protected _getSubFieldNames(fieldName: string): string[] {
    let result: string[] = [];
    const index = get(this.fieldIndex, fieldName);
    if (index) {
      if (Array.isArray(index)) {
        for (const i in index) {
          result = result.concat(this._getSubFieldNames(`${fieldName}.${i}`));
        }
      } else if (isObject(index)) {
        Object.keys(index).forEach((childFieldName) => {
          result = result.concat(this._getSubFieldNames(`${fieldName}.${childFieldName}`));
        });
      }
      if (this.fields[fieldName]) {
        result.push(fieldName);
      }
    }
    return result;
  }

  protected _getSubWatchs(watch: string): string[] {
    let result: string[] = [];

    const index = get(this.watchIndex, watch);
    if (index) {
      if (Array.isArray(index)) {
        for (const i in index) {
          result = result.concat(this._getSubWatchs(`${watch}.${i}`));
        }
      } else if (isObject(index)) {
        Object.keys(index).forEach((childWatch) => {
          result = result.concat(this._getSubWatchs(`${watch}.${childWatch}`));
        });
      }
      result.push(watch);
    }
    return result;
  }

  getValidation(fieldName: string): FieldValidation {
    if (this.fields[fieldName]) {
      const field = this.fields[fieldName];
      for (const code in field.validations) {
        const iCode = parseInt(code);
        for (const id in field.validations[iCode]) {
          return new FieldValidation(field.validations[iCode][id], this.serializeValidationCode(iCode), iCode);
        }
      }
      return defaultValidation;
    }
    return defaultValidation;
  }

  hasValidation(fieldName: string, validatorName: string, code: ValidationCode, message?: string): boolean {
    const field = this.fields[fieldName];
    if (field) {
      const validation = get(field, `validations.${code}.${validatorName}`);
      if (!message) {
        return validation !== undefined;
      }
      return validation === message;
    }
    return false;
  }

  offChange(type: FormListenerType, listener: FormListener, watchs: string[] | string): void {
    watchs = Array.isArray(watchs) ? watchs : [watchs];
    for (const watch of watchs) {
      this.listeners[type][watch] = this.listeners[type][watch] || [];
      this.listeners[type][watch] = this.listeners[type][watch].filter((x) => x.listener !== listener);
    }
  }

  onChange(type: FormListenerType, listener: FormListener, watchs: string[] | string, once: boolean): void {
    watchs = Array.isArray(watchs) ? watchs : [watchs];

    for (const watch of watchs) {
      this.listeners[type][watch] = this.listeners[type][watch] || [];
      this.listeners[type][watch].push({ listener, watchs, once });
      if (type === 'valueChange') {
        set(this.watchIndex, watch, true, false);
      }
    }
  }

  offSubmittingChange(listener: FormListener): void {
    this.offChange('submittingChange', listener, '');
  }

  onSubmittingChange(listener: FormListener, once = false): void {
    this.onChange('submittingChange', listener, '', once);
  }

  offValidationChange(listener: FormListener, watchs: string[] | string): void {
    this.offChange('validationChange', listener, watchs);
  }

  onValidationChange(listener: FormListener, watchs: string[] | string, once = false): void {
    this.onChange('validationChange', listener, watchs, once);
  }

  offValueChange(listener: FormListener, watchs: string[] | string): void {
    this.offChange('valueChange', listener, watchs);
  }

  onValueChange(listener: FormListener, watchs: string[] | string, once = false): void {
    this.onChange('valueChange', listener, watchs, once);
  }

  @reducer
  reset(): void {
    const props = Object.getOwnPropertyNames(this.fields);
    for (let i = 0; i < props.length; i++) {
      delete this.fields[props[i]];
    }
    this.listeners = {
      valueChange: {},
      validationChange: {},
      submittingChange: {},
    };
    this.pendingDispatch = new Set<string>();
    this.fieldIndex = {};
    this.watchIndex = {};
    this.state.values = this.state.initialValues;
    this.state.validations = {};
    this.setResetting(true);
  }

  @reducer
  setResetting(resetting: boolean): void {
    this.state.resetting = resetting;
  }

  serializeValidationCode(code: ValidationCode): ValidationStatus {
    switch (code) {
      case ValidationCode.Loading:
        return ValidationStatus.Loading;
      case ValidationCode.Error:
        return ValidationStatus.Error;
      case ValidationCode.Warning:
        return ValidationStatus.Warning;
      case ValidationCode.Ok:
        return ValidationStatus.Ok;
      default:
        return ValidationStatus.None;
    }
  }

  @reducer
  setSubmitting(submitting: boolean): void {
    this.state.submitting = submitting;
    this.pendingDispatch.add('__submit__');
  }

  @reducer
  setValidation(fieldName: string, validatorName: string, code: ValidationCode, message = '', compile = true): void {
    if (this.fields[fieldName]) {
      set(this.fields[fieldName], `validations.${code}.${validatorName}`, message);
    }
    if (compile) {
      this.compileValidations(fieldName);
    }
  }

  @reducer
  private _setValues(values: AnonymousObject = {}, validations: AnonymousObject<FieldValidation> = {}): void {
    Object.keys(values).forEach((key) => {
      const field = this.fields[key];
      if (field && field.touchOn === 'change' && !field.touched) {
        field.touched = true;
      }
      set(this.state, `values.${key}`, values[key]);
      this._getSubWatchs(key).forEach((key) => this.pendingDispatch.add(key));
    });
    Object.keys(validations).forEach((fieldName) => {
      set(this.state, `validations.${fieldName}`, validations[fieldName]);
      this.compileValidations(fieldName);
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *setValue(fieldName: string, value: any) {
    const async = yield this.validateAll({
      [fieldName]: value,
    });
    if (async.length > 0) {
      yield this.compileValidations(async);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *setValues(values: AnonymousObject<any>) {
    const async = yield this.validateAll(values);
    if (async.length > 0) {
      yield this.compileValidations(async);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Leading)
  *submit(
    values: AnonymousObject,
    validations: AnonymousObject<FieldValidation>,
    resubmit: () => void,
    onSuccess: FormSubmitCallback,
    onError?: FormErrorCallback,
    onWarning?: FormWarningCallback,
  ) {
    // compile the validations to get the status
    const { code, fields } = yield this.getContainerFieldValidation(validations, this.fields, '', false);
    yield this.touchAll();
    if (!this.state.submitting) {
      yield this.setSubmitting(true);
    }
    switch (code) {
      case ValidationCode.Loading:
        this.onValidationChange(() => resubmit(), '', true);
        break;
      case ValidationCode.Error:
        if (typeof onError === 'function') {
          yield onError(fields, values);
        }
        yield this.setSubmitting(false);
        break;
      case ValidationCode.Warning:
        if (typeof onWarning === 'function') {
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
  }

  @reducer
  touch(fieldName: string): void {
    if (!this.fields[fieldName].touched) {
      this.fields[fieldName].touched = true;
      this.compileValidations(fieldName, true);
    }
  }

  @reducer
  touchAll(): void {
    Object.keys(this.fields).forEach((fieldName) => {
      this.touch(fieldName);
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *validate(
    fieldName: string,
    validatorName: string,
    validator: Validator,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    value: any,
  ) {
    yield this.setValidation(fieldName, validatorName, ValidationCode.Loading, '', false);
    const result: ValidationResult = yield validator(value);
    yield this.clearValidation(fieldName, validatorName, ValidationCode.Loading, false);
    if (result.valid) {
      yield this.clearValidation(fieldName, validatorName, ValidationCode.Error, false);
    } else {
      yield this.setValidation(fieldName, validatorName, ValidationCode.Error, result.message, false);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *validateAll(values: AnonymousObject<any>) {
    // do all validations
    const tasks: AnonymousObject<Task[]> = {};
    const validations: AnonymousObject<FieldValidation> = {};
    const keys = Object.keys(values);
    for (const key of keys) {
      // we need to find all sub fields (if any) and do the validations for these fields
      const fieldNames = this._getSubFieldNames(key);
      for (const fieldName of fieldNames) {
        const field = this.fields[fieldName];
        const validators = field.validators;
        tasks[fieldName] = [];
        for (const i in validators) {
          const validatorName = `__validator_${i}`;
          const validator = validators[i];
          tasks[fieldName].push(
            yield fork(
              [this, this.validate],
              fieldName,
              validatorName,
              validator,
              get(values[key], fieldName.substr(key.length + 1)),
            ),
          );
        }
      }
    }
    const async: string[] = [];
    Object.keys(tasks).forEach((fieldName) => {
      validations[fieldName] = this.getValidation(fieldName);
      if (tasks[fieldName].find((t) => t.isRunning())) {
        async.push(fieldName);
      }
    });
    yield this._setValues(values, validations);
    return async;
  }
}
