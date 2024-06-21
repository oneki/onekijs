import { Task } from '@redux-saga/types';
import { cancel, delay, fork } from 'redux-saga/effects';
import DefaultService from '../core/Service';
import { reducer, saga, service } from '../core/annotations';
import { asyncGet } from '../core/xhr';
import { ValidationStatus } from '../types/form';
import {
  AnonymousKeyObject,
  AnonymousObject,
  AnonymousPathObject,
  ArrayElement,
  NestedKeyOf,
  PathType,
} from '../types/object';
import { SagaEffect } from '../types/saga';
import { clone, del, get, isObject, set, simpleMergeDeep } from '../utils/object';
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
  FormDisplayerField,
  FormListenerProps,
  FormListenerType,
  FormMetadata,
  FormMetadataListener,
  FormState,
  FormSubmitListener,
  FormValidationListener,
  FormValueListener,
  PlaceholderField,
  PlaceholderValidator,
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

export const FORM_GLOBAL_VALIDATION_KEY = '__$FORM$GLOBAL_VALIDATION_KEY__';

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

  public fields: AnonymousKeyObject<T, Field<T>>;
  public decorators: AnonymousObject<FormDecorator>;
  public listeners: {
    [k in FormListenerType]: AnonymousObject<FormListenerProps[]>;
  };
  public pendingDispatch: {
    [fieldName: string]: Set<string>;
  };

  protected fieldIndex: AnonymousObject;
  protected watchIndex: AnonymousObject;

  // global validations, not related to a field
  // can be used to set the form in error related to an external event (not enough permissions, ...)
  protected validations: AnonymousObject<string>[] = [];

  protected listenerIndex: {
    [id: string]: AnonymousObject<FormListenerProps>;
  };

  // use when a rule change a field that was not yet initialized
  protected placeholderFields: AnonymousObject<PlaceholderField<T>>;

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
  add<K extends NestedKeyOf<T>>(fieldArrayName: K, initialValue?: Partial<ArrayElement<PathType<T, K>>>): void {
    let arrayValue = get<any>(this.state.values, fieldArrayName, []);
    if (arrayValue === undefined || arrayValue === null || !Array.isArray(arrayValue)) {
      arrayValue = [];
    }
    this.setValue(fieldArrayName, arrayValue.concat([initialValue]));
  }

  addField(field: Field<T>): void {
    if (!this.fields[field.context.name]) {
      this.fields[field.context.name] = field;
      const currentIndex = get<any>(this.fieldIndex, field.context.name);
      if (currentIndex === undefined) {
        set(this.fieldIndex, field.context.name as string, true);
      }
    }
  }

  @reducer
  addValidator(fieldName: NestedKeyOf<T>, validatorName: string, validator: Validator): void {
    // get current value
    const field = this.fields[fieldName];
    if (field) {
      field.validators[validatorName] = validator;
    } else {
      set(this.placeholderFields, `${fieldName as string}.validators.${validatorName}`, validator);
    }
    const validations = this.validateAll({
      [fieldName]: this.getValue(fieldName),
    } as AnonymousPathObject<T>);
    this.compileValidations(Object.keys(validations) as NestedKeyOf<T>[]);
  }

  getDisplayerTree(): AnonymousObject<FormDisplayerField> {
    const treeObject: AnonymousObject<FormDisplayerField> = {};
    for (const fieldName of Object.keys(this.fields || {})) {
      const field = this.fields[fieldName as NestedKeyOf<T>] as Field;
      let obj = treeObject;
      let hidden = false;
      for (const container of get(field, 'containers', [])) {
        const decorator = this.decorators[container] ?? get<any>(this.fields, container);
        const metadata = this.state.metadata[container];
        if (!(metadata?.visible ?? true)) {
          hidden = true;
          break;
        } else {
          if (obj[container] === undefined) {
            obj[container] = {
              name: container,
              Displayer: decorator.Displayer,
              children: {},
            };
          }
          obj = obj[container].children as AnonymousObject<FormDisplayerField>;
        }
      };
      const metadata = this.state.metadata[fieldName];
      if (!hidden && (metadata?.visible ?? true)) {
        obj[fieldName] = Object.assign({
          name: fieldName,
          Displayer: field.Displayer,
          children: {},
        });
      }
    }
    return treeObject;
  }

  @reducer
  clearError(fieldName: NestedKeyOf<T>, validatorName?: string, compile = true): void {
    this.clearValidation(fieldName, validatorName, ValidationCode.Error, compile);
  }

  @reducer
  clearValidation(
    fieldName: NestedKeyOf<T> | undefined,
    validatorName: string | undefined,
    code: ValidationCode,
    compile = true,
  ): void {
    if (fieldName === undefined) {
      del(this.validations, validatorName ? `${code}.${validatorName}` : code);
    } else {
      del(this.fields[fieldName], validatorName ? `validations.${code}.${validatorName}` : `validations.${code}`);
    }

    if (compile) {
      this.compileValidations(fieldName);
    }
  }

  @reducer
  clearWarning(fieldName: NestedKeyOf<T>, validatorName?: string, compile = true): void {
    this.clearValidation(fieldName, validatorName, ValidationCode.Warning, compile);
  }

  @reducer
  compileValidations(fieldNames: undefined | NestedKeyOf<T>[] | NestedKeyOf<T>, force = false): void {
    if (fieldNames === undefined) {
      const previousValidation = this.state.validations[FORM_GLOBAL_VALIDATION_KEY];
      const nextValidation = this._getValidation(undefined);
      if (force || !nextValidation.equals(previousValidation)) {
        this.state.validations[FORM_GLOBAL_VALIDATION_KEY] = nextValidation;
        this.pendingDispatch.validationChange.add('');
      }
    } else {
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


  }

  decorator(name: string, options: FormDecoratorOptions = {}): FormDecorator {
    return this.initDecorator(name, options);
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
  disable(fieldOrDecoratorName: string, match = true): void {
    // ignore if the field is not editable
    if (this.isField(fieldOrDecoratorName) && this.isReadOnlyField(fieldOrDecoratorName)) {
      return
    }
    this.setMetadata(fieldOrDecoratorName, 'disabled', match);
  }

  @reducer
  disableValidator(fieldName: NestedKeyOf<T>, validatorName: string) {
    let field = this.fields[fieldName] as PlaceholderField<T>;
    if (!field) {
      if (!this.placeholderFields[fieldName]) {
        this.placeholderFields[fieldName] = {};
      }
      field = this.placeholderFields[fieldName];
      if (!field.validators) {
        field.validators = {};
      }
      if (!field.validators[validatorName]) {
        field.validators[validatorName] = {};
      }
    }
    if (field && field.validators) {
      let validator: PlaceholderValidator | undefined = field.validators[validatorName];
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
  enable(fieldOrDecoratorName: string, match = true): void {
    // ignore if the field is not editable
    if (this.isField(fieldOrDecoratorName) && this.isReadOnlyField(fieldOrDecoratorName)) {
      return;
    }
    this.setMetadata(fieldOrDecoratorName, 'disabled', !match);
  }

  @reducer
  enableValidator(fieldName: NestedKeyOf<T>, validatorName: string): void {
    let field = this.fields[fieldName] as PlaceholderField<T>;
    if (!field) {
      if (!this.placeholderFields[fieldName]) {
        this.placeholderFields[fieldName] = {};
      }
      field = this.placeholderFields[fieldName];
      if (!field.validators) {
        field.validators = {};
      }
      if (!field.validators[validatorName]) {
        field.validators[validatorName] = {};
      }
    }
    if (field && field.validators) {
      let validator: PlaceholderValidator | undefined = field.validators[validatorName];
      if (validator && typeof validator !== 'object') {
        field.validators[validatorName] = {
          validator: field.validators[validatorName] as ValidatorFunction,
          disabled: false,
        };
      }
      validator = field.validators[validatorName] as ValidatorObject | undefined;
      if (validator && validator.disabled && this.fields[fieldName]) {
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
    field.value = get<any>(this.state.values, name, options.defaultValue === undefined ? '' : options.defaultValue);
    return field;
  }

  isField(fieldOrDecoratorName: string): fieldOrDecoratorName is NestedKeyOf<T> {
    return Object.keys(this.fields).includes(fieldOrDecoratorName);
  }

  isReadOnlyField(fieldName: NestedKeyOf<T>) {
    const metadata = this.state.metadata[fieldName] || {};
    return metadata.readOnly || (this.config.reconfigure && !metadata.editable)
  }

  getContainerFieldValidation(
    validations: AnonymousObject<FieldValidation>,
    fields: AnonymousKeyObject<T, Field>,
    prefix = '',
    touchedOnly = true,
    includeGlobal = false,
  ): ContainerValidation {
    // compile the validations to get the status

    let messages = [];
    const result = new ContainerValidation('', ValidationStatus.None, ValidationCode.None, {});

    const keys = Object.keys(validations) as NestedKeyOf<T>[];
    for (const fieldName of keys.filter((k: string) => k.startsWith(prefix) && k !== FORM_GLOBAL_VALIDATION_KEY)) {
      const field = fields[fieldName as NestedKeyOf<T>];
      if (field !== undefined && (!touchedOnly || field.touched)) {
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
    if (includeGlobal) {
      const validation = validations[FORM_GLOBAL_VALIDATION_KEY];
      if (validation && validation.code <= result.code && validation.code < ValidationCode.None) {
        if (validation.code < result.code) {
          result.status = validation.status;
          result.code = validation.code;
          result.fields = {};
          messages = [];
        }
        result.fields[FORM_GLOBAL_VALIDATION_KEY] = validation.message;
        if (validation.message) {
          messages.push(`${validation.message}`);
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
    return get<any>(this.state.context, key, defaultValue);
  }

  protected _getSubFieldNames(fieldName: NestedKeyOf<T>): NestedKeyOf<T>[] {
    let result: NestedKeyOf<T>[] = [];
    const index = get<any>(this.fieldIndex, fieldName);
    if (index) {
      if (Array.isArray(index)) {
        for (const i in index) {
          result = result.concat(this._getSubFieldNames(`${fieldName}.${i}` as NestedKeyOf<T>));
        }
      } else if (isObject(index)) {
        Object.keys(index).forEach((childFieldName) => {
          result = result.concat(this._getSubFieldNames(`${fieldName}.${childFieldName}` as NestedKeyOf<T>));
        });
      }
      if (this.fields[fieldName]) {
        result.push(fieldName);
      }
    }
    return result;
  }

  getMetadata<K extends keyof FormMetadata>(
    fieldOrDecoratorName: string,
    key: K,
  ): FormMetadata[K] | undefined {
    return get(this.state.metadata, `${fieldOrDecoratorName}.${key}`);
  }

  getMetadatas(
    fieldOrDecoratorName: string,
  ): FormMetadata | undefined {
    return get(this.state.metadata, fieldOrDecoratorName);
  }

  obfuscate(value: any, fieldName?: string): any {
    value = clone(value); // do not touch the original

    const obfuscate = (v: any, ns: string) => {
      const field: Field | undefined = (this.fields as any)[ns];
      if (field && field.protected) {
        set(value, ns, '*************');
      } else if (Array.isArray(v)) {
        v.forEach((item, index) => obfuscate(item, `${ns}.${index}`));
      } else if (typeof v === 'object') {
        Object.keys(v).forEach((k) => obfuscate(value[k], `${ns ? `${ns}.` : ''}${k}`));
      }
    };
    obfuscate(value, fieldName || '');
    return value;
  }

  protected _getSubWatchs(watch: NestedKeyOf<T>): (NestedKeyOf<T> | '')[] {
    const nonIndexedWatch = getNonIndexedProp(watch);
    let result: (NestedKeyOf<T> | '')[] = [];
    // check if the index if something listens on the key "watch"
    const index = watch === '' ? this.watchIndex[''] : get<any>(this.watchIndex, watch);
    if (index) {
      // direct listener on "addresses" are also alerted
      result.push(watch);
    }
    if (nonIndexedWatch !== undefined) {
      const nonIndex = get<any>(this.watchIndex, nonIndexedWatch);
      if (nonIndex) {
        result.push(watch);
      }
    }

    // if the value "addresses" changes, addresses.0.street should be alerted, .....
    result = result.concat(this._getSubFieldNames(watch));

    // if addresses.0.street is changed, addresses should be alerted (becasue the object has been changed)
    // we will also alert adresses.street but it would be done in form/index.tsx
    while (watch.includes('.')) {
      watch = watch.split('.').slice(0, -1).join('.') as NestedKeyOf<T>;
      const index = watch === '' ? this.watchIndex[''] : get<any>(this.watchIndex, watch);
      if (index) {
        result.push(watch);
      }
    }
    if (this.watchIndex['']) {
      result.push('');
    }

    return result;
  }

  getValidation = (fieldName?: NestedKeyOf<T>, touchedOnly = true): FieldValidation | ContainerValidation => {
    const getFieldValidation = (fieldName: NestedKeyOf<T>): any => {
      const field = this.fields[fieldName];
      if (field !== undefined) {
        if (touchedOnly) {
          return field.touched ? this.state.validations[fieldName] || defaultValidation : defaultValidation;
        } else {
          return this.state.validations[fieldName] || defaultValidation;
        }
      } else {
        return this.getContainerFieldValidation(this.state.validations, this.fields, fieldName, touchedOnly);
      }
    };

    if (fieldName === undefined || fieldName === '') {
      return this.getContainerFieldValidation(this.state.validations, this.fields, '', touchedOnly, true);
    } else {
      return getFieldValidation(fieldName);
    }
  };

  protected _getValidation(fieldName: NestedKeyOf<T> | undefined): FieldValidation {
    let validations: AnonymousObject<string>[] | undefined;
    if (fieldName === undefined) {
      validations = this.validations;
    } else if (this.fields[fieldName] !== undefined) {
      validations = this.fields[fieldName]?.validations;
    }

    if (validations !== undefined) {
      for (const code in validations) {
        const iCode = parseInt(code);
        for (const id in validations[iCode]) {
          return new FieldValidation(validations[iCode][id], this.serializeValidationCode(iCode), iCode);
        }
      }
      return defaultValidation;
    }
    return defaultValidation;
  }

  getValue(fieldName?: undefined | '', defaultValue?: T): T;
  getValue<K extends NestedKeyOf<T>>(
    fieldName: K,
    defaultValue: Exclude<PathType<T, K>, undefined | null>,
  ): Exclude<PathType<T, K>, undefined | null>;
  getValue<K extends NestedKeyOf<T>>(fieldName: K, defaultValue?: PathType<T, K>): PathType<T, K> | undefined;
  getValue(fieldName: any, defaultValue: any): any {
    return get<any>(this.state.values, fieldName, defaultValue);
  }

  hasValidation(fieldName: NestedKeyOf<T> | undefined, validatorName: string, code: ValidationCode, message?: string): boolean {
    if (fieldName === undefined) {
      const validation = get<any>(this.validations, `${code}.${validatorName}`);
      if (!message) {
        return validation !== undefined;
      }
      return validation === message;
    } else {
      const field = this.fields[fieldName];
      if (field) {
        const validation = get<any>(field, `validations.${code}.${validatorName}`);
        if (!message) {
          return validation !== undefined;
        }
        return validation === message;
      }
    }
    return false;
  }

  @reducer
  hide(fieldOrDecoratorName: string, match = true): void {
    this.setMetadata(fieldOrDecoratorName, 'visible', !match);
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
        Displayer: options.Displayer,
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
    const field = this.fields[name];
    if (field === undefined) {
      options.defaultValue = options.defaultValue === undefined ? '' : options.defaultValue;
      options.touchOn = options.touchOn || this.config.touchOn || TouchOn.Blur;
      const isUndefined = options.isUndefined || ((value: any) => value === undefined);

      // it's possible that validators has been disabled / enabled / added / removed before the insertion of the field in the form
      if (this.placeholderFields[name]) {
        Object.keys(this.placeholderFields[name].validators || {}).forEach((validatorName) => {
          const placeholderValidator = (this.placeholderFields[name].validators || {})[validatorName];
          const validator = validators[validatorName];
          if (validator) {
            if (typeof placeholderValidator === 'object') {
              if (typeof validator !== 'object') {
                validators[validatorName] = {
                  validator,
                  disabled: placeholderValidator?.disabled,
                };
              } else {
                validator.disabled = placeholderValidator?.disabled;
              }
            }
          } else if (typeof placeholderValidator === 'object') {
            if (placeholderValidator.validator !== undefined) {
              validators[validatorName] = placeholderValidator as Validator;
            }
          } else {
            validators[validatorName] = placeholderValidator;
          }
        });
        delete this.placeholderFields[name].validators;
      }

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
                    if (!isNaN(value.target.valueAsNumber)) {
                      value = value.target.valueAsNumber;
                    } else {
                      value = value.target.value;
                    }
                  }
                  this.setValue(name, value);
                },
                onFocus: (): void => {
                  const field = this.fields[name];
                  if (field !== undefined && field.touchOn === 'focus' && !field.touched) {
                    this.touch(name);
                  }
                },
                onBlur: (): void => {
                  const field = this.fields[name];
                  if (field !== undefined && field.touchOn === 'blur' && !field.touched) {
                    this.touch(name);
                  }
                },
              },
            },
            this.placeholderFields[name] || {},
          ),
        ),
      );
      const initialValue = get<any>(this.state.values, name);
      this.defaultValues[name] = isUndefined(initialValue) ? options.defaultValue : initialValue;

      // we force disable to true if the field is not editable and this is a reconfiguration
      const disabled = (this.config.reconfigure && !options.editable || options.readOnly) ? true : options.disabled;

      this.defaultMetadata[name] = Object.assign(
        {
          disabled,
          visible: options.visible,
          editable: options.editable,
          readOnly: options.readOnly,
        },
        this.state.metadata[name],
      );
    }

    // some options are not dynamically managed by the FormService. We erase the value
    ['Displayer', 'ValueDisplayer', 'label', 'protected', 'containers'].forEach((f: any) => {
      set(this.fields[name], f, get(options, f));
    })

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.fields[name]!.context;
  }

  @reducer
  insert(fieldArrayName: NestedKeyOf<T>, index: number, initialValue = {}): void {
    const currentArrayValue = (get<any>(this.state.values, fieldArrayName) || []) as any[];
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
            if (this.fields[`${fieldArrayName}.${i}.${fieldName}` as NestedKeyOf<T>]) {
              this.addField(
                Object.assign({}, this.fields[`${fieldArrayName}.${i}.${fieldName}` as NestedKeyOf<T>], {
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
                      if (field !== undefined && field.touchOn === 'focus' && !field.touched) {
                        this.touch(name);
                      }
                    },
                    onBlur: (): void => {
                      const field = this.fields[name];
                      if (field !== undefined && field.touchOn === 'blur' && !field.touched) {
                        this.touch(name);
                      }
                    },
                  },
                }),
              );
            }

          } else {
            const nextField = this.fields[`${fieldArrayName}.${i}.${fieldName}` as NestedKeyOf<T>] as Field<T>;
            const currentField = this.fields[`${fieldArrayName}.${i + 1}.${fieldName}` as NestedKeyOf<T>] as Field<T>;
            if (currentField) {
              this.fields[`${fieldArrayName}.${i + 1}.${fieldName}` as NestedKeyOf<T>] = Object.assign(nextField, {
                name: currentField.name,
                context: currentField.context,
              }) as Field<T>;
            }
          }

          delete this.triggered[`${fieldArrayName}.${i}.${fieldName}`];

          if (i === index) {
            delete this.state.metadata[`${fieldArrayName}.${i}.${fieldName}`];
            delete this.state.validations[`${fieldArrayName}.${i}.${fieldName}`];
            delete this.fields[`${fieldArrayName}.${i}.${fieldName}` as NestedKeyOf<T>];
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

  isTouched(fieldName: NestedKeyOf<T>): boolean {
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
        const current = watch === '' ? this.watchIndex[''] : get<any>(this.watchIndex, watch, undefined);
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
  remove(fieldArrayName: NestedKeyOf<T>, index: number, changeValue = true): void {
    const replace = (currentField: any, nextField: any, ignore: string[]) => {

      Object.keys(currentField).forEach((key) => {
        if (!ignore.includes(key)) {
          delete currentField[key];
        }

      });

      Object.keys(nextField).forEach((key) => {
        if (!ignore.includes(key)) {
          currentField[key] = nextField[key];
        }
      });

    }

    const move = (oldIndex: string, newIndex: string) => {
      const nextField: Field<T> | undefined = this.fields[oldIndex as NestedKeyOf<T>];
      const currentField = this.fields[newIndex as NestedKeyOf<T>] as Field<T>;

      if (nextField) {
        this.state.validations[newIndex] = this.state.validations[oldIndex];
        this.state.metadata[newIndex] = this.state.metadata[oldIndex];
        replace(currentField, nextField, ['name', 'context']);
        this.fields[newIndex as NestedKeyOf<T>] = currentField;

        this.pendingDispatch.validationChange.add(newIndex);
        this.pendingDispatch.metadataChange.add(newIndex);
      } else {
        delete this.state.validations[newIndex];
        delete this.state.metadata[newIndex];
        delete this.fields[newIndex as NestedKeyOf<T>];
      }
      delete this.triggered[oldIndex];
    };

    const rm = (oldIndex: string) => {
      delete this.state.metadata[oldIndex];
      delete this.state.validations[oldIndex];
      delete this.fields[oldIndex as NestedKeyOf<T>];
      delete this.triggered[oldIndex];
    };

    const currentArrayValue = (get<any>(this.state.values, fieldArrayName) || []) as any[];
    const last = currentArrayValue.length - 1;
    if (last >= index) {
      const nextValues: AnonymousPathObject<T> = {};
      // need to modifiy all values / metadata / validations with an index superior to the removed one
      for (let i = index + 1; i < currentArrayValue.length; i++) {
        if (
          currentArrayValue[i] === null ||
          currentArrayValue[i] === undefined ||
          !(typeof currentArrayValue[i] === 'object')
        ) {
          // singlecolumntable
          move(`${fieldArrayName}.${i}`, `${fieldArrayName}.${i - 1}`);
        } else {
          Object.keys(currentArrayValue[i]).forEach((fieldName) => {
            move(`${fieldArrayName}.${i}.${fieldName}`, `${fieldArrayName}.${i - 1}.${fieldName}`);
          });
        }
      }
      del(this.fieldIndex, `${fieldArrayName}.${last}`);
      if (
        currentArrayValue[last] === null ||
        currentArrayValue[last] === undefined ||
        !(typeof currentArrayValue[last] === 'object')
      ) {
        rm(`${fieldArrayName}.${last}`);
      } else {
        Object.keys(currentArrayValue[last]).forEach((fieldName) => {
          rm(`${fieldArrayName}.${last}.${fieldName}`);
        });
      }

      this.pendingDispatch.validationChange.add('');

      nextValues[fieldArrayName] = currentArrayValue.filter((_a, i): boolean => i !== index) as any;
      if (changeValue) {
        this.setValues(nextValues);
      }
    }
  }

  @reducer
  removeValidator(fieldName: NestedKeyOf<T>, validatorName: string): void {
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
    } as AnonymousPathObject<T>);
    this.compileValidations(Object.keys(validations) as NestedKeyOf<T>[]);
  }

  @reducer
  reset(): void {
    let props = Object.getOwnPropertyNames(this.fields);
    for (let i = 0; i < props.length; i++) {
      delete this.fields[props[i] as NestedKeyOf<T>];
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
      this.state.values = this.state.initialValues as T;
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
  setError(fieldName: NestedKeyOf<T> | undefined, validatorName: string, message = '', match?: boolean): boolean {
    return this.setOrClearValidation(ValidationCode.Error, fieldName, validatorName, message, match);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @reducer
  setInitialValues(values: Partial<T>): void {
    this.state.initialValues = values;
  }

  @reducer
  setLoading(loading: boolean, fetching: boolean): void {
    this.state.loading = loading;
    this.state.fetching = fetching;
  }

  @reducer
  setMetadata<K extends keyof FormMetadata>(
    fieldOrDecoratorName: string,
    key: K,
    value: FormMetadata[K],
    force = true,
  ): void {
    this.state.metadata[fieldOrDecoratorName] = this.state.metadata[fieldOrDecoratorName] || {};
    if (this.state.metadata[fieldOrDecoratorName][key] === undefined || force) {
      this.state.metadata[fieldOrDecoratorName][key] = value;

      // it's possible that the field is not yet registered
      // we will still try to enable / disable the validator via the placeholderfield
      const exists = Object.keys(this.fields).includes(fieldOrDecoratorName);
      if (key === 'visible' || key === 'disabled') {
        const fieldName = fieldOrDecoratorName as NestedKeyOf<T>;
        if ((key === 'visible' && value === false) || (key === 'disabled' && value === true)) {
          this.clearError(fieldName, 'required');
          this.disableValidator(fieldName, 'required');
        } else {
          this.enableValidator(fieldName, 'required');
          if (exists) {
            const validations = this.validateAll({
              [fieldName]: this.getValue(fieldName),
            } as AnonymousPathObject<T>);
            this.compileValidations(Object.keys(validations) as NestedKeyOf<T>[]);
          }
        }
      }

      this.pendingDispatch.metadataChange.add(fieldOrDecoratorName);
      this.pendingDispatch.metadataChange.add('');
    }
  }

  @reducer
  setMetadatas(metadatas: AnonymousObject<FormMetadata>): void {
    Object.keys(metadatas).forEach((fieldOrDecoratorName) => {
      Object.keys(metadatas[fieldOrDecoratorName]).forEach((key: any) => {
        this.setMetadata(fieldOrDecoratorName, key, metadatas[fieldOrDecoratorName][key as keyof FormMetadata]);
      });
    });
  }

  @reducer
  setOK(fieldName: NestedKeyOf<T> | undefined, validatorName: string): boolean {
    return this.setOrClearValidation(ValidationCode.Ok, fieldName, validatorName, '', true);
  }

  @reducer
  setOrClearValidation(
    code: ValidationCode,
    fieldName: NestedKeyOf<T> | undefined,
    validatorName: string,
    message = '',
    match?: boolean,
  ): boolean {
    let changed = false;
    if (fieldName === undefined || this.fields[fieldName]) {
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
  setPendingValidation(fieldName: NestedKeyOf<T> | undefined, validatorName: string, pending = true): boolean {
    return this.setOrClearValidation(ValidationCode.Loading, fieldName, validatorName, '', pending);
  }

  @reducer
  setSubmitting(submitting: boolean): void {
    this.state.submitting = submitting;
    this.pendingDispatch.submittingChange.add('__submit__');
    this.pendingDispatch.submittingChange.add('');
  }

  @reducer
  setValidation(
    fieldName: NestedKeyOf<T> | undefined,
    validatorName: string,
    code: ValidationCode,
    message = '',
    compile = true,
  ): void {
    if (fieldName === undefined) {
      set(this.validations, `${code}.${validatorName}` as any, message as any);
    } else if (this.fields[fieldName]) {
      set(this.fields[fieldName], `validations.${code}.${validatorName}` as any, message as any);
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
      const field = this.fields[key as NestedKeyOf<T>];
      if (field && field.touchOn === 'change' && !field.touched) {
        field.touched = true;
      }

      const currentValue = get(this.state.values, key as NestedKeyOf<T>);
      const nextValue = values[key as NestedKeyOf<T>] as PathType<T, NestedKeyOf<T>>;

      if (Array.isArray(currentValue) && Array.isArray(nextValue) && currentValue.length > nextValue.length) {
        for (let i = nextValue.length; i < currentValue.length; i++) {
          this.remove(key as NestedKeyOf<T>, i, false);
        }
      }

      set(this.state.values, key as NestedKeyOf<T>, nextValue);
      this._getSubWatchs(key as NestedKeyOf<T>).forEach((key) => this.pendingDispatch.valueChange.add(key));
    });

    this.compileValidations(Object.keys(validations) as NestedKeyOf<T>[]);
  }

  @reducer
  setWarning(fieldName: NestedKeyOf<T> | undefined, validatorName: string, message = '', match?: boolean): boolean {
    return this.setOrClearValidation(ValidationCode.Warning, fieldName, validatorName, message, match);
  }

  @reducer
  show(fieldOrDecoratorName: string, match = true): void {
    this.setMetadata(fieldOrDecoratorName, 'visible', match);
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
        try {
          if (typeof this.config.onError === 'function') {
            yield this.config.onError(fields, this.state.values);
          }
        }
        finally {
          yield this.setSubmitting(false);
        }
        break;
      case ValidationCode.Warning:
        try {
          if (typeof this.config.onWarning === 'function') {
            yield this.config.onWarning(fields, this.state.values);
          } else if (this.state.values) {
            yield this.config.onSubmit(this.state.values);
          }
        } finally {
          yield this.setSubmitting(false);
        }
        break;
      default:
        try {
          if (this.state.values) {
            yield this.config.onSubmit(this.state.values);
          }
        } finally {
          yield this.setSubmitting(false);
        }
        break;
    }
  }

  @reducer
  touch(fieldName: NestedKeyOf<T>): void {
    const field = this.fields[fieldName];
    if (field !== undefined && !field.touched) {
      field.touched = true;
      this.compileValidations(fieldName, true);
    }
  }

  @reducer
  touchAll(): void {
    Object.keys(this.fields).forEach((fieldName) => {
      this.touch(fieldName as NestedKeyOf<T>);
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  validateSync(
    fieldName: NestedKeyOf<T>,
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
    fieldName: NestedKeyOf<T>,
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
  validateAll(values: AnonymousPathObject<T>): AnonymousKeyObject<T, FieldValidation> {
    // do all validations
    const tasks: AnonymousObject<Task[]> = {};
    const validations: AnonymousKeyObject<T, FieldValidation> = {};
    const keys = Object.keys(values) as NestedKeyOf<T>[];

    for (const key of keys) {
      // we need to find all sub fields (if any) and do the validations for these fields
      const fieldNames = this._getSubFieldNames(key);
      for (const fieldName of fieldNames) {
        const field = this.fields[fieldName];
        if (field !== undefined) {
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
                  get<any>(values[key], fieldName.slice(key.length + 1)),
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
                  get<any>(values[key], fieldName.slice(key.length + 1)),
                );
              }
            }
          }
        }
      }
    }

    Object.keys(tasks).forEach((fieldName) => {
      validations[fieldName as NestedKeyOf<T>] = this._getValidation(fieldName as NestedKeyOf<T>);
    });

    return validations;
  }
}
