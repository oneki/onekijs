import { Task } from '@redux-saga/types';
import { cancel, delay, fork } from 'redux-saga/effects';
import DefaultService from '../core/Service';
import { reducer, saga, service } from '../core/annotations';
import { asyncGet } from '../core/xhr';
import { ValidationStatus } from '../types/form';
import { AnonymousObject, AnonymousPathObject, NestedKeyOf, PathType } from '../types/object';
import { SagaEffect } from '../types/saga';
import { del, get, isObject, set, simpleMergeDeep } from '../utils/object';
import { generateUniqueId } from '../utils/string';
import ContainerValidation from './ContainerValidation';
import FieldValidation, { defaultValidation } from './FieldValidation';
import {
  Field,
  FieldOptions,
  FieldProps,
  FormConfig,
  FormDecorator,
  FormDecoratorOptions,
  FormListenerProps,
  FormListenerType,
  FormMetadata,
  FormMetadataListener,
  FormState,
  FormSubmitListener,
  FormValidationListener,
  FormValueListener,
  TouchOn,
  ValidationCode,
  ValidationResult,
  Validator,
  ValidatorAsyncFunction,
  ValidatorFunction,
  ValidatorObject,
  ValidatorSyncFunction,
} from './typings';
import { getNonIndexedProp } from './utils';

@service
export default class FormService<T extends object = any> extends DefaultService<FormState<T>> {
  // keep the previous values (once the changes have been triggered, this field contains the current values)
  public prevValues: AnonymousObject = {};
  // keep the previous validations (once the changes have been triggered, this field contains the current validations)
  public prevValidations: AnonymousObject<FieldValidation> = {};
  // keep the previous submitting value (once the changes have been triggered, this field contains the current submitting value)
  public prevSubmitting = false;
  // keep the previous metadata (once the changes have been triggered, this field contains the current metadata)
  public prevMetadata: AnonymousObject<FormMetadata> = {};
  // keep all fields that has been triggered at least once (used to be sure that all field initialization are listened by listeners)
  public triggered: AnonymousObject<boolean> = {};

  public fields: AnonymousObject<Field>;
  public decorators: AnonymousObject<FormDecorator>;
  public listeners: {
    [k in FormListenerType]: AnonymousObject<FormListenerProps[]>;
  };
  public pendingDispatch: {
    [fieldName: string]: Set<string>;
  };

  protected fieldIndex: {
    [fieldName: string]: boolean;
  };
  protected watchIndex: {
    [fieldName: string]: boolean;
  };

  protected listenerIndex: {
    [id: string]: AnonymousObject<FormListenerProps>;
  };

  // use when a rule change a field that was not yet initialized
  protected placeholderFields: AnonymousObject<Partial<Field>>;

  public config: FormConfig = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
  };
  public initializing = true;
  protected defaultValues: AnonymousPathObject<T> = {};
  protected defaultMetadata: AnonymousObject<FormMetadata> = {};

  constructor() {
    super();
    this.fields = {};
    this.placeholderFields = {};
    this.decorators = {};
    this.listeners = {
      valueChange: {},
      validationChange: {},
      submittingChange: {},
      metadataChange: {},
    };
    this.pendingDispatch = {
      valueChange: new Set<string>(),
      validationChange: new Set<string>(),
      submittingChange: new Set<string>(),
      metadataChange: new Set<string>(),
    };
    this.fieldIndex = {};
    this.watchIndex = {};
    this.listenerIndex = {};
  }

  @reducer
  add<K extends NestedKeyOf<T>>(fieldArrayName: K, initialValue: Partial<PathType<T, K>>): void {
    let arrayValue = get<any>(this.state.values, fieldArrayName, []);
    if (arrayValue === undefined || arrayValue === null || !Array.isArray(arrayValue)) {
      arrayValue = [];
    }
    this.setValue(fieldArrayName, arrayValue.concat([initialValue]));
  }

  addField(field: Field): void {
    if (!this.fields[field.context.name]) {
      this.fields[field.context.name] = field;
      const currentIndex = get(this.fieldIndex, field.context.name);
      if (currentIndex === undefined) {
        set(this.fieldIndex, field.context.name, true);
      }
    }
  }

  @reducer
  addValidator(fieldName: string, validatorName: string, validator: Validator): void {
    // get current value
    const field = this.fields[fieldName];
    if (field) {
      field.validators[validatorName] = validator;
    } else {
      set(this.placeholderFields, `${fieldName}.validators.${validatorName}`, validator);
    }
    const validations = this.validateAll({
      [fieldName]: this.getValue(fieldName),
    });
    this.compileValidations(Object.keys(validations));
  }

  @reducer
  clearError(fieldName: string, validatorName?: string, compile = true): void {
    this.clearValidation(fieldName, validatorName, ValidationCode.Error, compile);
  }

  @reducer
  clearValidation(fieldName: string, validatorName: string | undefined, code: ValidationCode, compile = true): void {
    del(this.fields[fieldName], validatorName ? `validations.${code}.${validatorName}` : `validations.${code}`);
    if (compile) {
      this.compileValidations(fieldName);
    }
  }

  @reducer
  clearWarning(fieldName: string, validatorName?: string, compile = true): void {
    this.clearValidation(fieldName, validatorName, ValidationCode.Warning, compile);
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
          this.pendingDispatch.validationChange.add(fieldName);
          this.pendingDispatch.validationChange.add('');
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

  @reducer
  disable(fieldName: string, match = true): void {
    this.setMetadata(fieldName, 'disabled', match);
  }

  @reducer
  disableValidator(fieldName: string, validatorName: string) {
    const field = this.fields[fieldName];
    if (field) {
      let validator: Validator | undefined = field.validators[validatorName];
      if (validator && typeof validator !== 'object') {
        field.validators[validatorName] = {
          validator: field.validators[validatorName] as ValidatorFunction,
          disabled: false,
        };
      }
      validator = field.validators[validatorName] as ValidatorObject | undefined;
      if (validator && !validator.disabled) {
        validator.disabled = true;
        this.clearValidation(fieldName, validatorName, ValidationCode.Error, true);
      }
    }
  }

  @reducer
  enable(fieldName: string, match = true): void {
    this.setMetadata(fieldName, 'disabled', !match);
  }

  @reducer
  enableValidator(fieldName: string, validatorName: string): void {
    const field = this.fields[fieldName];
    if (field) {
      let validator: Validator | undefined = field.validators[validatorName];
      if (validator && typeof validator !== 'object') {
        field.validators[validatorName] = {
          validator: field.validators[validatorName] as ValidatorFunction,
          disabled: false,
        };
      }
      validator = field.validators[validatorName] as ValidatorObject | undefined;
      if (validator && validator.disabled) {
        validator.disabled = false;
        this.validateSync(
          fieldName,
          validatorName,
          validator.validator as ValidatorSyncFunction,
          this.getValue(fieldName),
        );
        this.compileValidations(fieldName);
      }
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
  field(name: NestedKeyOf<T>, validators: AnonymousObject<Validator> = {}, options: FieldOptions = {}): FieldProps {
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
      if (fields[fieldName] && (!touchedOnly || fields[fieldName].touched)) {
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

  getContext(key?: string, defaultValue?: any): any {
    if (key === undefined || key === '') {
      return this.state.context ?? defaultValue;
    }
    return get(this.state.context, key, defaultValue);
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
    const nonIndexedWatch = getNonIndexedProp(watch);
    const result: string[] = [];
    // check if the index if something listens on the key "watch"
    const index = watch === '' ? this.watchIndex[''] : get(this.watchIndex, watch);
    if (index) {
      // direct listener on "addresses" are also alerted
      result.push(watch);
    }
    if (nonIndexedWatch !== undefined) {
      const nonIndex = get(this.watchIndex, nonIndexedWatch);
      if (nonIndex) {
        result.push(watch);
      }
    }

    // if the value "addresses" changes, addresses.0.street should be alerted, .....
    result.concat(this._getSubFieldNames(watch));

    // if addresses.0.street is changed, addresses should be alerted (becasue the object has been changed)
    // we will also alert adresses.street but it would be done in form/index.tsx
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

  @reducer
  hide(fieldName: string, match = true): void {
    this.setMetadata(fieldName, 'visible', !match);
  }

  /**
   *  Register a decorator. Unlike a field, a decorator has no value but can have metadata (like disabled / visible)
   *
   * @param {string} name - the name of the decorator. Must not be in conflict with a field name
   *
   * @return {void}
   */
  initDecorator(name: string, options: FormDecoratorOptions = {}): FormDecorator {
    if (!this.decorators[name]) {
      this.decorators[name] = {
        name,
      };
      this.defaultMetadata[name] = this.state.metadata[name] || {
        disabled: options.disabled,
        visible: options.visible,
      };
    }
    return this.decorators[name];
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
  initField(name: NestedKeyOf<T>, validators: AnonymousObject<Validator> = {}, options: FieldOptions = {}): FieldProps {
    if (!this.fields[name]) {
      options.defaultValue = options.defaultValue === undefined ? '' : options.defaultValue;
      options.touchOn = options.touchOn || this.config.touchOn || TouchOn.Blur;
      this.addField(
        Object.assign(
          {},
          options,
          simpleMergeDeep(
            {
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
                  this.setValue(name, value);
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
            },
            this.placeholderFields[name] || {},
          ),
        ),
      );
      this.defaultValues[name] = get(this.state.values, name, options.defaultValue);
      const disabled = this.config.reconfigure && !options.editable ? true : options.disabled;
      this.defaultMetadata[name] = Object.assign(
        {
          disabled,
          visible: options.visible,
        },
        this.state.metadata[name],
      );
    }
    return this.fields[name].context;
  }

  @reducer
  insert(fieldArrayName: NestedKeyOf<T>, index: number, initialValue = {}): void {
    const currentArrayValue = get(this.state.values, fieldArrayName, []);
    if (currentArrayValue.length - 1 >= index) {
      const nextValues: AnonymousPathObject<T> = {};
      // need to modifiy all values / metadata / validations with an index superior or equal to the added one
      for (let i = currentArrayValue.length - 1; i >= index; i--) {
        Object.keys(currentArrayValue[i]).forEach((fieldName) => {
          this.state.validations[`${fieldArrayName}.${i + 1}.${fieldName}`] =
            this.state.validations[`${fieldArrayName}.${i}.${fieldName}`];
          this.state.metadata[`${fieldArrayName}.${i + 1}.${fieldName}`] =
            this.state.metadata[`${fieldArrayName}.${i}.${fieldName}`];

          if (i === currentArrayValue.length - 1) {
            const name = `${fieldArrayName}.${i + 1}.${fieldName}` as NestedKeyOf<T>;
            this.addField(
              Object.assign({}, this.fields[`${fieldArrayName}.${i}.${fieldName}`], {
                name,
                context: {
                  name,
                  onChange: (value: any): void => {
                    if (value && value.nativeEvent && value.nativeEvent instanceof Event) {
                      value = value.target.value;
                    }
                    this.setValue(name, value);
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
          } else {
            this.fields[`${fieldArrayName}.${i + 1}.${fieldName}`] = Object.assign(
              this.fields[`${fieldArrayName}.${i}.${fieldName}`],
              {
                name: this.fields[`${fieldArrayName}.${i + 1}.${fieldName}`].name,
                context: this.fields[`${fieldArrayName}.${i + 1}.${fieldName}`].context,
              },
            );
          }

          delete this.triggered[`${fieldArrayName}.${i}.${fieldName}`];

          if (i === index) {
            delete this.state.metadata[`${fieldArrayName}.${i}.${fieldName}`];
            delete this.state.validations[`${fieldArrayName}.${i}.${fieldName}`];
            delete this.fields[`${fieldArrayName}.${i}.${fieldName}`];
          }
          this.pendingDispatch.validationChange.add(`${fieldArrayName}.${i + 1}.${fieldName}`);
          this.pendingDispatch.metadataChange.add(`${fieldArrayName}.${i + 1}.${fieldName}`);
        });
      }
      this.pendingDispatch.validationChange.add('');

      nextValues[fieldArrayName] = (currentArrayValue.slice(0, index) as any)
        .concat([initialValue])
        .concat(currentArrayValue.slice(index) as any[]);

      this.setValues(nextValues);
    } else {
      this.add(fieldArrayName, initialValue);
    }
  }

  isTouched(fieldName: string): boolean {
    const field = this.fields[fieldName];
    if (field) {
      return field.touched;
    }
    return false;
  }

  @saga(SagaEffect.Leading)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *loadInitialValues(fetcher: string | (() => T | Promise<T>)) {
    let initialValues: T;
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

  offChange(type: FormListenerType, id: string): void {
    if (this.listenerIndex[id] === undefined) return;
    Object.keys(this.listenerIndex[id]).forEach((watch) => {
      this.listeners[type][watch] = this.listeners[type][watch].filter((x) => x.id !== id);
    });
  }

  onChange(
    type: FormListenerType,
    id: string,
    listener: FormValueListener | FormValidationListener | FormSubmitListener,
    watchs: string[] | string,
    once: boolean,
  ): void {
    watchs = Array.isArray(watchs) ? watchs : [watchs];
    this.listenerIndex[id] = this.listenerIndex[id] || {};
    for (const watch of watchs) {
      if (this.listenerIndex[id][watch] === undefined) {
        const listenerContext: FormListenerProps = {
          id,
          listener,
          once,
          watchs,
        };
        this.listenerIndex[id][watch] = listenerContext;
        this.listeners[type][watch] = this.listeners[type][watch] || [];
        this.listeners[type][watch].push(listenerContext);
        const current = watch === '' ? this.watchIndex[''] : get(this.watchIndex, watch, undefined);
        if (current === undefined) {
          if (watch === '') {
            this.watchIndex[''] = true;
          } else {
            set(this.watchIndex, watch, true);
          }
        }
      } else {
        // the listener could have been changed (because no useCallback or changes in the dependencies of a useCallback)
        // update the listener via the listenerIndex
        this.listenerIndex[id][watch].listener = listener;
      }
    }
  }

  @reducer
  onMount(): void {
    if (this.initializing) {
      this.initializing = false;
      this.setMetadatas(this.defaultMetadata);
      this.setValues(this.defaultValues);
    }
  }

  offMetadataChange(id: string): void {
    this.offChange('metadataChange', id);
  }

  onMetadataChange(id: string, listener: FormMetadataListener, watchs: string[] | string, once = false): void {
    this.onChange('metadataChange', id, listener, watchs, once);
  }

  offSubmittingChange(id: string): void {
    this.offChange('submittingChange', id);
  }

  onSubmittingChange(id: string, listener: FormSubmitListener, once = false): void {
    this.onChange('submittingChange', id, listener, '', once);
  }

  offValidationChange(id: string): void {
    this.offChange('validationChange', id);
  }

  onValidationChange(id: string, listener: FormValidationListener, watchs: string[] | string, once = false): void {
    this.onChange('validationChange', id, listener, watchs, once);
  }

  offValueChange(id: string): void {
    this.offChange('valueChange', id);
  }

  onValueChange(id: string, listener: FormValueListener, watchs: string[] | string, once = false): void {
    this.onChange('valueChange', id, listener, watchs, once);
  }

  @reducer
  remove(fieldArrayName: NestedKeyOf<T>, index: number): void {
    const currentArrayValue = get(this.state.values, fieldArrayName, []);
    const last = currentArrayValue.length - 1;
    if (last >= index) {
      const nextValues: AnonymousPathObject<T> = {};
      // need to modifiy all values / metadata / validations with an index superior to the removed one
      for (let i = index + 1; i < currentArrayValue.length; i++) {
        Object.keys(currentArrayValue[i]).forEach((fieldName) => {
          // nextValues[`${fieldArrayName}.${i - 1}.${fieldName}`] = currentArrayValue[i][fieldName];

          if (this.fields[`${fieldArrayName}.${i}.${fieldName}`]) {
            this.state.validations[`${fieldArrayName}.${i - 1}.${fieldName}`] =
              this.state.validations[`${fieldArrayName}.${i}.${fieldName}`];
            this.state.metadata[`${fieldArrayName}.${i - 1}.${fieldName}`] =
              this.state.metadata[`${fieldArrayName}.${i}.${fieldName}`];
            this.fields[`${fieldArrayName}.${i - 1}.${fieldName}`] = Object.assign(
              this.fields[`${fieldArrayName}.${i}.${fieldName}`],
              {
                name: this.fields[`${fieldArrayName}.${i - 1}.${fieldName}`].name,
                context: this.fields[`${fieldArrayName}.${i - 1}.${fieldName}`].context,
              },
            );
            this.pendingDispatch.validationChange.add(`${fieldArrayName}.${i - 1}.${fieldName}`);
            this.pendingDispatch.metadataChange.add(`${fieldArrayName}.${i - 1}.${fieldName}`);
          } else {
            delete this.state.validations[`${fieldArrayName}.${i - 1}.${fieldName}`];
            delete this.state.metadata[`${fieldArrayName}.${i}.${fieldName}`];
            delete this.fields[`${fieldArrayName}.${i - 1}.${fieldName}`];
          }
          delete this.triggered[`${fieldArrayName}.${i}.${fieldName}`];
        });
      }
      del(this.fieldIndex, `${fieldArrayName}.${last}`);
      Object.keys(currentArrayValue[last]).forEach((fieldName) => {
        delete this.state.metadata[`${fieldArrayName}.${last}.${fieldName}`];
        delete this.state.validations[`${fieldArrayName}.${last}.${fieldName}`];
        delete this.fields[`${fieldArrayName}.${last}.${fieldName}`];
        delete this.triggered[`${fieldArrayName}.${last}.${fieldName}`];
      });
      this.pendingDispatch.validationChange.add('');

      nextValues[fieldArrayName] = currentArrayValue.filter((_a: never, i: number): boolean => i !== index);
      this.setValues(nextValues);
    }
  }

  @reducer
  removeValidator(fieldName: string, validatorName: string): void {
    // get current value
    const field = this.fields[fieldName];
    if (field) {
      delete field.validators[validatorName];
    } else if (
      this.placeholderFields[fieldName] !== undefined &&
      this.placeholderFields[fieldName].validators !== undefined
    ) {
      delete (this.placeholderFields[fieldName].validators as any)[validatorName];
    }
    const validations = this.validateAll({
      [fieldName]: this.getValue(fieldName),
    });
    this.compileValidations(Object.keys(validations));
  }

  @reducer
  reset(): void {
    let props = Object.getOwnPropertyNames(this.fields);
    for (let i = 0; i < props.length; i++) {
      delete this.fields[props[i]];
    }

    props = Object.getOwnPropertyNames(this.decorators);
    for (let i = 0; i < props.length; i++) {
      delete this.decorators[props[i]];
    }

    this.prevValues = {};
    this.prevValidations = {};
    this.prevSubmitting = false;
    this.prevMetadata = {};
    this.triggered = {};

    this.defaultValues = {};
    this.defaultMetadata = {};

    this.listeners = {
      valueChange: {},
      validationChange: {},
      submittingChange: {},
      metadataChange: {},
    };
    this.pendingDispatch = {
      valueChange: new Set<string>(),
      validationChange: new Set<string>(),
      submittingChange: new Set<string>(),
      metadataChange: new Set<string>(),
    };
    this.fieldIndex = {};
    this.watchIndex = {};
    this.listenerIndex = {};
    if (
      this.state.initialValues === undefined ||
      (this.state.initialValues && typeof this.state.initialValues === 'object')
    ) {
      this.state.values = this.state.initialValues;
    } else {
      this.state.values = undefined;
      this.state.fetching = true;
      this.callSaga('loadInitialValues', this.state.initialValues);
    }
    this.state.validations = {};
    this.placeholderFields = {};
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
  setContext(key = '', value: any): any {
    if (key === '') {
      this.state.context = value ?? {};
    } else {
      set(this.state.context, key, value);
    }
  }

  @reducer
  setError(fieldName: string, validatorName: string, message = '', match?: boolean): boolean {
    return this.setOrClearValidation(ValidationCode.Error, fieldName, validatorName, message, match);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @reducer
  setInitialValues(values: T): void {
    this.state.initialValues = values;
  }

  @reducer
  setLoading(loading: boolean, fetching: boolean): void {
    this.state.loading = loading;
    this.state.fetching = fetching;
  }

  @reducer
  setMetadata<K extends keyof FormMetadata>(fieldName: string, key: K, value: FormMetadata[K]): void {
    this.state.metadata[fieldName] = this.state.metadata[fieldName] || {};
    this.state.metadata[fieldName][key] = value;

    if (key === 'visible') {
      if (value === false) {
        this.disableValidator(fieldName, 'required');
      } else {
        this.enableValidator(fieldName, 'required');
      }
    }

    this.pendingDispatch.metadataChange.add(fieldName);
    this.pendingDispatch.metadataChange.add('');
  }

  @reducer
  setMetadatas(metadatas: AnonymousObject<FormMetadata>): void {
    Object.keys(metadatas).forEach((fieldName) => {
      Object.keys(metadatas[fieldName]).forEach((key: any) => {
        this.setMetadata(fieldName, key, metadatas[fieldName][key as keyof FormMetadata]);
      });
    });
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
    this.pendingDispatch.submittingChange.add('__submit__');
    this.pendingDispatch.submittingChange.add('');
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
  setValue<K extends NestedKeyOf<T>>(fieldName: K, value: PathType<T, K>): void {
    this.setValues({
      [fieldName]: value,
    } as any);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @reducer
  setValues(values: AnonymousPathObject<T>): void {
    const validations = this.validateAll(values);
    Object.keys(values).forEach((key) => {
      const field = this.fields[key];
      if (field && field.touchOn === 'change' && !field.touched) {
        field.touched = true;
      }
      set<any>(this.state.values, `${key}`, values[key as NestedKeyOf<T>]);
      this._getSubWatchs(key).forEach((key) => this.pendingDispatch.valueChange.add(key));
    });
    this.compileValidations(Object.keys(validations));
  }

  @reducer
  setWarning(fieldName: string, validatorName: string, message = '', match?: boolean): boolean {
    return this.setOrClearValidation(ValidationCode.Warning, fieldName, validatorName, message, match);
  }

  @reducer
  show(fieldName: string, match = true): void {
    this.setMetadata(fieldName, 'visible', match);
    if (match) {
      this.enableValidator(fieldName, 'required');
    }
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
        this.onValidationChange(generateUniqueId(), () => this.submit(), '', true);
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
    if (this.fields[fieldName] && !this.fields[fieldName].touched) {
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
        for (const validatorName in validators) {
          const validator = validators[validatorName];
          const disabled = typeof validator === 'object' && validator.disabled === true;
          const async = typeof validator === 'object' && validator.async === true;
          if (!disabled) {
            if (async) {
              this.setValidation(fieldName, validatorName, ValidationCode.Loading, '', false);
              this.callSaga(
                'validateAsync',
                fieldName,
                validatorName,
                validator.validator as ValidatorAsyncFunction,
                get(values[key], fieldName.slice(key.length + 1)),
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
                get(values[key], fieldName.slice(key.length + 1)),
              );
            }
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
