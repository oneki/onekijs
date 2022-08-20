import { Task } from '@redux-saga/types';
import { cancel, delay, fork } from 'redux-saga/effects';
import { reducer, saga, service } from '../core/annotations';
import DefaultService from '../core/Service';
import { asyncGet } from '../core/xhr';
import { ValidationStatus } from '../types/form';
import { AnonymousObject } from '../types/object';
import { SagaEffect } from '../types/saga';
import { del, get, isObject, set } from '../utils/object';
import ContainerValidation from './ContainerValidation';
import FieldValidation, { defaultValidation } from './FieldValidation';
import {
  Field,
  FieldOptions,
  FieldProps,
  FormConfig,
  FormListener,
  FormListenerProps,
  FormListenerType,
  FormState,
  TouchOn,
  ValidationCode,
  ValidationResult,
  Validator,
  ValidatorAsyncFunction,
  ValidatorSyncFunction,
} from './typings';

@service
export default class FormService extends DefaultService<FormState> {
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

  public config: FormConfig = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
  };
  public initializing = true;
  protected defaultValues: AnonymousObject = {};

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

  @reducer
  add(fieldArrayName: string, initialValue = {}): void {
    // get current value
    const currentArrayValue = get(this.state.values, fieldArrayName, []);
    const index = currentArrayValue.length;
    this.setValue(`${fieldArrayName}.${index}`, initialValue || {});
  }

  addField(field: Field): void {
    if (!this.fields[field.context.name]) {
      this.fields[field.context.name] = field;
      set(this.fieldIndex, field.context.name, true, false);
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
        const previousValidation = this.state.validations[fieldName];
        const nextValidation = this._getValidation(fieldName);
        if (force || !nextValidation.equals(previousValidation)) {
          this.state.validations[fieldName] = nextValidation;
          this.pendingDispatch.add(fieldName);
          this.pendingDispatch.add('');
        }
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *delayLoading(delay_ms?: number) {
    yield this.setLoading(delay_ms ? false : true, true);
    if (delay_ms) {
      yield delay(delay_ms);
      yield this.setLoading(true, true);
    }
  }

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
  field(name: string, validators: Validator[] = [], options: AnonymousObject = {}): FieldProps {
    const field = this.initField(name, validators, options);
    field.value = get(this.state.values, name, options.defaultValue === undefined ? '' : options.defaultValue);
    return field;
  }

  getContainerFieldValidation(
    validations: AnonymousObject<FieldValidation>,
    fields: AnonymousObject<Field>,
    prefix = '',
    touchedOnly = true,
  ): ContainerValidation {
    // compile the validations to get the status

    let messages = [];
    const result = new ContainerValidation('', ValidationStatus.None, ValidationCode.None, {});

    for (const fieldName of Object.keys(validations).filter((k) => k.startsWith(prefix))) {
      if (!touchedOnly || fields[fieldName].touched) {
        const validation = validations[fieldName];
        if (validation.code <= result.code && validation.code < ValidationCode.None) {
          if (validation.code < result.code) {
            result.status = validation.status;
            result.code = validation.code;
            result.fields = {};
            messages = [];
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
    const index = watch === '' ? this.watchIndex[''] : get(this.watchIndex, watch);
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
    while (watch.includes('.')) {
      watch = watch.split('.').slice(0, -1).join('.');
      const index = watch === '' ? this.watchIndex[''] : get(this.watchIndex, watch);
      if (index) {
        result.push(watch);
      }
    }
    if (this.watchIndex['']) {
      result.push('');
    }
    return result;
  }

  getValidation = (fieldName?: string, touchedOnly = true): FieldValidation | ContainerValidation => {
    const getFieldValidation = (fieldName: string): any => {
      if (this.fields[fieldName]) {
        if (touchedOnly) {
          return this.fields[fieldName].touched
            ? this.state.validations[fieldName] || defaultValidation
            : defaultValidation;
        } else {
          return this.state.validations[fieldName] || defaultValidation;
        }
      } else {
        return this.getContainerFieldValidation(this.state.validations, this.fields, fieldName, touchedOnly);
      }
    };

    if (fieldName === undefined || fieldName === '') {
      return this.getContainerFieldValidation(this.state.validations, this.fields, '', touchedOnly);
    } else {
      return getFieldValidation(fieldName);
    }
  };

  protected _getValidation(fieldName: string): FieldValidation {
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

  getValue(fieldName?: string, defaultValue?: any): any {
    if (fieldName === undefined || fieldName === '') {
      return this.state.values || defaultValue;
    }
    return get(this.state.values, fieldName, defaultValue);
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

  /**
   *  Register a field and return three listeners
   *   - onChange
   *   - onFocus
   *   - onBlur
   *
   * @param {string} name - the name of the field. Must be related to a key in values
   * @param {Validator[]} validators - a object of validators
   * @param {FieldOptions} options
   *
   * @return {Object} a list of listeners for the field and its name
   *                    - name
   *                    - onChange
   *                    - onFocus
   *                    - onBlur
   */
  initField(name: string, validators: Validator[] = [], options: FieldOptions = {}): FieldProps {
    if (!this.fields[name]) {
      options.defaultValue = options.defaultValue === undefined ? '' : options.defaultValue;
      options.touchOn = options.touchOn || this.config.touchOn || TouchOn.Blur;
      this.addField(
        Object.assign({}, options, {
          name,
          validators,
          validations: [],
          touched: options.touchOn === TouchOn.Load,
          touchOn: options.touchOn,
          context: {
            name,
            onChange: (value: any): void => {
              if (value && value.nativeEvent && value.nativeEvent instanceof Event) {
                value = value.target.value;
              }
              if (get(this.state.values, name) !== value) {
                this.setValue(name, value);
              }
            },
            onFocus: (): void => {
              const field = this.fields[name];
              if (field.touchOn === 'focus' && !field.touched) {
                this.touch(name);
              }
            },
            onBlur: (): void => {
              const field = this.fields[name];
              if (field.touchOn === 'blur' && !field.touched) {
                this.touch(name);
              }
            },
          },
        }),
      );
      this.defaultValues[name] = get(this.state.values, name, options.defaultValue);
    }
    return this.fields[name].context;
  }

  @saga(SagaEffect.Leading)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *loadInitialValues(fetcher: string | (() => AnonymousObject | Promise<AnonymousObject>)) {
    let initialValues: AnonymousObject = {};
    let loadingTask: Task | null = null;
    try {
      loadingTask = yield fork([this, this.delayLoading], this.state.delayLoading || 0);
      if (typeof fetcher === 'string') {
        initialValues = yield asyncGet(fetcher);
      } else {
        initialValues = yield fetcher();
      }
      yield cancel(loadingTask as Task);
      this.setInitialValues(initialValues);
      this.setValues(initialValues);
      this.setLoading(false, false);
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Fetch error', e);
      }
      if (loadingTask) {
        yield cancel(loadingTask);
      }
      throw e;
    }
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
      const current = watch === '' ? this.watchIndex[''] : get(this.watchIndex, watch, undefined);
      if (current === undefined) {
        if (watch === '') {
          this.watchIndex[''] = true;
        } else {
          set(this.watchIndex, watch, true);
        }
      }
    }
  }

  @reducer
  onMount(): void {
    if (this.initializing) {
      this.initializing = false;
      this.setValues(this.defaultValues);
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
  remove(fieldArrayName: string, index: number): void {
    const currentArrayValue = get(this.state.values, fieldArrayName, []);
    if (currentArrayValue.length - 1 >= index) {
      const nextValues: AnonymousObject = {};
      // need to modifiy all values with an index superior to the removed one
      for (let i = index + 1; i < currentArrayValue.length; i++) {
        Object.keys(currentArrayValue[i]).forEach((fieldName) => {
          nextValues[`${fieldArrayName}.${i - 1}.${fieldName}`] = currentArrayValue[i][fieldName];
        });
      }
      nextValues[fieldArrayName] = currentArrayValue.filter((_a: never, i: number): boolean => i !== index);
      this.setValues(nextValues);
    }
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
    if (
      this.state.initialValues === undefined ||
      (this.state.initialValues && typeof this.state.initialValues === 'object')
    ) {
      this.state.values = this.state.initialValues;
    } else {
      this.state.values = undefined;
      this.state.fetching = true;
      this.loadInitialValues(this.state.initialValues);
    }
    this.state.validations = {};
    this.initializing = true;
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
  setError(fieldName: string, validatorName: string, message = '', match?: boolean): boolean {
    return this.setOrClearValidation(ValidationCode.Error, fieldName, validatorName, message, match);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @reducer
  setInitialValues(values: AnonymousObject<any>): void {
    this.state.initialValues = values;
  }

  @reducer
  setLoading(loading: boolean, fetching: boolean): void {
    this.state.loading = loading;
    this.state.fetching = fetching;
  }

  @reducer
  setOK(fieldName: string, validatorName: string): boolean {
    return this.setOrClearValidation(ValidationCode.Ok, fieldName, validatorName, '', true);
  }

  @reducer
  setOrClearValidation(
    code: ValidationCode,
    fieldName: string,
    validatorName: string,
    message = '',
    match?: boolean,
  ): boolean {
    let changed = false;
    if (this.fields[fieldName]) {
      if (this.hasValidation(fieldName, validatorName, ValidationCode.Loading)) {
        this.clearValidation(fieldName, validatorName, ValidationCode.Loading);
        changed = true;
      }
      if (match === undefined || match) {
        if (!this.hasValidation(fieldName, validatorName, code, message)) {
          this.setValidation(fieldName, validatorName, code, message);
          changed = true;
        }
      } else if (this.hasValidation(fieldName, validatorName, code)) {
        this.clearValidation(fieldName, validatorName, code);
        changed = true;
      }
    }
    return changed;
  }

  @reducer
  setPendingValidation(fieldName: string, validatorName: string, pending = true): boolean {
    return this.setOrClearValidation(ValidationCode.Loading, fieldName, validatorName, '', pending);
  }

  @reducer
  setSubmitting(submitting: boolean): void {
    this.state.submitting = submitting;
    this.pendingDispatch.add('__submit__');
    this.pendingDispatch.add('');
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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setValue(fieldName: string, value: any): void {
    this.setValues({
      [fieldName]: value,
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @reducer
  setValues(values: AnonymousObject<any>): void {
    const validations = this.validateAll(values);
    Object.keys(values).forEach((key) => {
      const field = this.fields[key];
      if (field && field.touchOn === 'change' && !field.touched) {
        field.touched = true;
      }
      set(this.state, `values.${key}`, values[key]);
      this._getSubWatchs(key).forEach((key) => this.pendingDispatch.add(key));
    });
    Object.keys(validations).forEach((fieldName) => {
      this.state.validations[fieldName] = validations[fieldName];
      this.compileValidations(fieldName);
    });
  }

  @reducer
  setWarning(fieldName: string, validatorName: string, message = '', match?: boolean): boolean {
    return this.setOrClearValidation(ValidationCode.Warning, fieldName, validatorName, message, match);
  }

  @saga(SagaEffect.Leading)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *submit() {
    // compile the validations to get the status
    const { code, fields } = yield this.getContainerFieldValidation(this.state.validations, this.fields, '', false);
    yield this.touchAll();
    if (!this.state.submitting) {
      yield this.setSubmitting(true);
    }
    switch (code) {
      case ValidationCode.Loading:
        this.onValidationChange(() => this.submit(), '', true);
        break;
      case ValidationCode.Error:
        if (typeof this.config.onError === 'function') {
          yield this.config.onError(fields, this.state.values);
        }
        yield this.setSubmitting(false);
        break;
      case ValidationCode.Warning:
        if (typeof this.config.onWarning === 'function') {
          yield this.config.onWarning(fields, this.state.values);
        } else if (this.state.values) {
          yield this.config.onSubmit(this.state.values);
        }
        yield this.setSubmitting(false);
        break;
      default:
        if (this.state.values) {
          yield this.config.onSubmit(this.state.values);
        }
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
  validateSync(
    fieldName: string,
    validatorName: string,
    validator: ValidatorSyncFunction,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    value: any,
  ): void {
    const result: ValidationResult = validator(value);
    if (result.valid) {
      this.clearValidation(fieldName, validatorName, ValidationCode.Error, false);
    } else {
      this.setValidation(fieldName, validatorName, ValidationCode.Error, result.message, false);
    }
  }

  @saga(SagaEffect.Latest)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *validateAsync(
    fieldName: string,
    validatorName: string,
    validator: ValidatorAsyncFunction,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    value: any,
  ) {
    const result: ValidationResult = yield validator(value);
    yield this.clearValidation(fieldName, validatorName, ValidationCode.Loading, false);
    if (result.valid) {
      yield this.clearValidation(fieldName, validatorName, ValidationCode.Error, true);
    } else {
      yield this.setValidation(fieldName, validatorName, ValidationCode.Error, result.message, true);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  validateAll(values: AnonymousObject<any>): AnonymousObject<FieldValidation> {
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
          if (typeof validator === 'object' && validator.async === true) {
            this.setValidation(fieldName, validatorName, ValidationCode.Loading, '', false);
            this.callSaga(
              'validateAsync',
              fieldName,
              validatorName,
              validator.validator as ValidatorAsyncFunction,
              get(values[key], fieldName.substr(key.length + 1)),
            );
          } else {
            const validatorSync: ValidatorSyncFunction =
              typeof validator === 'object'
                ? (validator.validator as ValidatorSyncFunction)
                : (validator as ValidatorSyncFunction);
            this.validateSync(
              fieldName,
              validatorName,
              validatorSync,
              get(values[key], fieldName.substr(key.length + 1)),
            );
          }
        }
      }
    }

    Object.keys(tasks).forEach((fieldName) => {
      validations[fieldName] = this._getValidation(fieldName);
    });

    return validations;
  }
}
