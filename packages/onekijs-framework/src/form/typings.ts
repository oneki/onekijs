import React, { SyntheticEvent } from 'react';
import { FCC } from '../types/core';
import { FormLayout } from '../types/form';
import { AnonymousObject, NestedKeyOf } from '../types/object';
import { State } from '../types/state';
import ContainerValidation from './ContainerValidation';
import FieldValidation from './FieldValidation';
import FormService from './FormService';

export type AsyncBinder<T> = (...args: any[]) => Promise<T>;

export interface AsyncBindState extends State {
  loading?: boolean;
  error?: Error;
  result?: any;
}

export type Binder<T> = (...args: any[]) => T;

export interface Field<T extends object = any> extends FieldOptions<T> {
  touched: boolean;
  name: string;
  validations: AnonymousObject<string>[];
  touchOn: TouchOnType;
  validators: AnonymousObject<Validator>;
  context: FieldProps<T>;
}

export interface FieldContainer {
  context: FormService;
  value: AnonymousObject<any>;
  touchedValidation: ContainerValidation;
  allValidation: ContainerValidation;
  touchAllFields: () => void;
  hide: () => void;
  show: () => void;
  enable: () => void;
  disable: () => void;
}

export interface FieldProps<T extends object = any> {
  name: NestedKeyOf<T>;
  onChange: (value: any) => void;
  onFocus: () => void;
  onBlur: () => void;
  value?: any;
}

export type FieldOptions<T = any> = FormMetadata & {
  /**
   * The label is placed in front of the field (if the layout is horizontal) or above the field (if the layout is vertical).
   * It should describe in one word the value expected by the field
   * The label is not rendered if the noLabel option is active. If the noLabel option is not active, an empty label always takes up space in the form (to maintain alignment).
   *
   * @example First Name
   * @remarks #important#
   */
  label?: string;

  /**
   * The default value of the field if no specific value has been specified
   * A value can be passed to field
   *   * either manually by the user filling the form
   *   * via the setValue of the form controller (if the field is inside a <Form> component)
   *   * via an initial value transmitted to the form
   *
   * @remarks #important#
   */
  defaultValue?: T;

  /**
   * Controls when the field becomes active for **visual** validations
   * The field is always validated (to prevent a submit with invalid data) but to avoid overwhelming the user, it's possible to delay the visual effect of an error
   * Valid values are
   *   * blur: a possible error or warning is only displayed when the user leaves the field (if he never enters the field, the error is shown when he clicks on the submit button)
   *   * load: a possible error or warning is immediately displayed when the field is rendered in the form
   *   * focus: a possible error or warning is displayed when the user enters the field (if he never enters the field, the error is shown when he clicks on the submit button)
   *   * change: a possible error or warning is displayed when the user makes a modification in the field (if he never enters the field, the error is shown when he clicks on the submit button)
   *   * submit: a possible error or warning is only displayed when the user clicks on the submit button
   *
   * @defaultValue blur
   */
  touchOn?: TouchOnType;

  /**
   * Indicates that the content of the field is sensitive and should not appear in plain text on the summary page.
   * Should generally not be redefined since sensitive fields like <input type="password"> already activate this setting
   *
   * @defaultValue false
   */
  protected?: boolean;

  /**
   * Method for detecting whether the transmitted value should be considered undefined
   * For example, a FormInput automatically converts undefined values into an empty string and considers a NULL value as undefined.
   *
   * This method doesn't usually need to be redefined, as every form component in this library already has a default implementation.
   */
  isUndefined?: (value: any) => boolean;

  /**
   * A component used to display the field in the summary page
   *
   * This method doesn't usually need to be redefined, as every form component in this library already has a default implementation.
   * If customization is required, the ValueDisplayer property should generally sbe sufficient.
   *
   * @example
   * ```tsx
   * (displayerProps: FormDisplayerProps) => {
   *     const form = useForm();
   *     let value = form.getValue(displayerProps.name) ?? '';
   *     if (props.type === 'password' && value !== '') {
   *       value = <Password value={value} />;
   *     }
   *     const ValueDisplayer = props.ValueDisplayer ?? FormInputValueDisplayer;
   *     return (
   *       <FieldDisplayer
   *         label={displayerProps.label ?? titlelize(displayerProps.name)}
   *         help={props.help}
   *         first={displayerProps.first}
   *         last={displayerProps.last}
   *         value={<ValueDisplayer value={value} />}
   *         format={displayerProps.format}
   *       />
   *     );
   *   }
   * ```
   */
  Displayer?: React.FC<FormFieldDisplayerProps>;

  /**
   * A component used to display the value of the field in the summary page
   *
   * This method doesn't usually need to be redefined, as every form component in this library already has a default implementation.
   *
   * @example
   * ```tsx
   * const FormInputValueDisplayer: React.FC<FormFieldValueDisplayerProps> = ({ value }) => {
   *   return <span className="o-input-displayer-value">{value ?? ''}</span>;
   * };
   * ```
   */
  ValueDisplayer?: React.FC<FormFieldValueDisplayerProps<T>>;

  /**
   * A list of all the field's container names.
   * For example, a container can be a FormBlock or a FormStep
   *
   * This property generally doesn't need to be redefined, as each container component injects itself as a container for any nested field.
   *
   */
  containers?: string[];
};

export type FormFieldValueDisplayerProps<T = any> = {
  value: T;
};

export type FormConfig = {
  touchOn?: TouchOnType;
  onError?: FormErrorCallback;
  onSubmit: FormSubmitCallback;
  onWarning?: FormWarningCallback;
  labelWidth?: FormLabelWidth;
  xsLabelWidth?: FormLabelWidth;
  smLabelWidth?: FormLabelWidth;
  mdLabelWidth?: FormLabelWidth;
  lgLabelWidth?: FormLabelWidth;
  xlLabelWidth?: FormLabelWidth;
  layout?: FormLayout;
  LoadingComponent?: React.FC;
  fieldSize?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  reconfigure?: boolean;
};

export type FormDecorator = {
  name: string;
  Displayer?: React.FC<FormFieldDisplayerProps>;
};

export type FormDecoratorOptions = FormMetadata & {
  Displayer?: React.FC<FormFieldDisplayerProps>;
  label?: string;
};

export type FormDisplayerField = {
  name: string;
  label?: string;
  Displayer?: React.FC<FormFieldDisplayerProps>;
  children: AnonymousObject<FormDisplayerField>;
};

export type FormFieldDisplayerProps = FormDisplayerField & {
  index: number;
  first: boolean;
  last: boolean;
  className?: string;
  format: 'form_summary' | 'form_summary_table' | 'csv';
};

export type FormErrorCallback = (fields: Field[], values?: AnonymousObject) => void;

export type FormFieldProps<T = any> = FieldOptions<T> &
  ValidatorsType & {
    /**
     * The name of the field. Must be unique within the form
     * The name should be the path of the field inside the object that is built by the form
     *
     * @example address.street
     * @remarks #important#
     */
    name: string;

    /**
     * The id of the field. Must be unique within the app
     * This id is attached to the HTML object and can be used to manipulate the field via standard JS methods
     *
     */
    id?: string;
  };

export type FormLabelWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface FormListenerProps {
  id: string;
  listener: FormValueListener | FormValidationListener | FormSubmitListener | FormMetadataListener;
  watchs: string[];
  once?: boolean;
}

export type FormListenerType = 'valueChange' | 'validationChange' | 'submittingChange' | 'metadataChange';

export type FormMetadata = {
  /**
   * The visibility of the field
   * If the field is managed by a form, changing this value will have no effect, and this property should only be used to set the initial visibility.
   *
   * @defaultValue true
   * @remarks #important#
   */
  visible?: boolean;
  /**
   * Indicates if the field is disabled.
   * If the field is managed by a form, changing this value will have no effect, and this property should only be used to set the initial value.
   * If the field is container
   *   * if it's disabled, any field inside the container will also be disabled
   *   * if it's enabled, any field inside the container will be disabled or enabled depending on their own disabled property
   *
   * @defaultValue false
   * @remarks #important#
   */
  disabled?: boolean;
  /**
   * Indicates if the field is editable.
   * This property is only used whan the field is managed by a form and the form is marked as a reconfiguration
   *
   * @defaultValue false
   */
  editable?: boolean;
  /**
   * Indicates if the field is read only
   * A read only field can never be enabled (while a disabled field can)
   *
   * If the field is managed by a form, changing this value will have no effect, and this property should only be used to set the initial value.
   *
   * @defaultValue false
   */
  readOnly?: boolean;
};

export type FormMetadataListener = (
  metadata: FormMetadata,
  previousMetadata: FormMetadata | undefined,
  watch: string,
) => any;

export interface FormOptions {
  delayLoading?: number;
  initialContext?: AnonymousObject;
}

export type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> &
  FormConfig & {
    controller: FormService;
  };

export type FormSubmitCallback = (values: AnonymousObject) => void;

export interface FormState<T> extends State, FormOptions {
  validations: AnonymousObject<FieldValidation>;
  metadata: AnonymousObject<FormMetadata>;
  values?: T;
  initialValues?: Partial<T>;
  context: AnonymousObject;
  initialContext: AnonymousObject;
  submitting?: boolean;
  loading?: boolean;
  fetching?: boolean;
}

export type FormSubmitListener = (submitting: boolean, previousSubmitting: boolean | undefined) => any;

export type FormValidationListener = (
  validation: FieldValidation | ContainerValidation,
  previousValidation: FieldValidation | ContainerValidation | undefined,
  watch: string,
) => any;

export type FormValueListener<T = any, W = string> = (value: T, previousValue: T, watch: W) => any;

export type FormWarningCallback = (fields: Field[], values?: AnonymousObject) => void;

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  touchOn?: TouchOnType;
} & ValidatorsType;

export type LengthValidator = ValidatorObject & {
  length: number;
};

export type PlaceholderField<T extends object = any> = Partial<
  Omit<Field<T>, 'validators'> & { validators?: AnonymousObject<PlaceholderValidator> }
>;
export type PlaceholderValidator = ValidatorFunction | Partial<ValidatorObject>;

export type Ruler = (...args: any[]) => void;

export type SelectProps = React.InputHTMLAttributes<HTMLInputElement> & ValidatorsType;

export type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { showErrors?: boolean };

export type TextareaProps = React.InputHTMLAttributes<HTMLInputElement> & ValidatorsType;

export enum TouchOn {
  Blur = 'blur',
  Load = 'load',
  Focus = 'focus',
  Change = 'change',
  Submit = 'submit',
}

export type TouchOnType = 'blur' | 'load' | 'focus' | 'change' | 'submit';

export interface UseForm {
  add: (fieldArrayName: string, initialValue?: any) => void;
  clearValidation: (fieldName: string, validatorName: string, code: ValidationCode) => void;
  fetching: boolean;
  field: (name: string, validators?: AnonymousObject<Validator>, options?: FieldOptions) => FieldProps;
  Form: FCC<FormProps>;
  getValue<T = any>(fieldName: string): T | undefined;
  getValue<T = any>(fieldName: string, defaultValue: undefined): T | undefined;
  getValue<T = any>(fieldName: string, defaultValue: null): T | null;
  getValue<T = any>(fieldName: string, defaultValue: T): T;
  getValue(fieldName?: string, defaultValue?: any): any;
  getValidation: (fieldName?: string, touchedOnly?: boolean) => FieldValidation | ContainerValidation;
  loading: boolean;
  initialized: boolean;
  remove: (fieldArrayName: string, index: number) => void;
  reset: () => void;
  setError: (fieldName: string, validatorName: string, message?: string, match?: boolean) => boolean;
  setValidation: (fieldName: string, validatorName: string, code: ValidationCode, message?: string) => void;
  setValue: (fieldName: string, value: any) => void;
  setValues: (values: AnonymousObject<any>) => void;
  setOK: (fieldName: string, validatorName: string) => boolean;
  setWarning: (fieldName: string, validatorName: string, message?: string, match?: boolean) => boolean;
  setPendingValidation: (fieldName: string, validatorName: string, pending?: any) => boolean;
  submit: (e?: SyntheticEvent<Element, Event>) => void;
  submitting: boolean;
  validations: AnonymousObject<FieldValidation>;
  values: any;
}

export enum ValidationCode {
  Loading = 0,
  Error = 1,
  Warning = 2,
  Ok = 3,
  None = 4,
}

export type ValidationResult = { valid: boolean; message?: string };

export type ValidatorsType = {
  /**
   * Indicates if the field is mandatory
   * If a field is mandatory, a small red star will be visible next to the label.
   * If a field is disabled, the required property is automatically removed
   *
   * @remarks #important#
   */
  required?: boolean;
  /**
   * The error message when a required field is empty
   *
   * @defaultValue This field is required
   */
  requiredMessage?: string;
  /**
   * A regular expression that validates the field value
   *
   * @example
   * ```tsx
   * <FormInput regex="^[a-z0-9]{1,12}$" />
   * ```
   * @remarks #important#
   */
  regex?: string | RegExp;
  /**
   * The error message when the field value doesn't match the regular expression
   *
   * @defaultValue Invalid value. Should match the regular expression ${regex}
   */
  regexMessage?: string;
  /**
   * Validates that the field value is a valid email
   *
   * @remarks #important#
   */
  email?: boolean;
  /**
   * The error message when the field value is not an email
   *
   * @defaultValue Invalid email
   */
  emailMessage?: string;
  /**
   * If it's a single-value field, validate that the value contains at least x characters.
   * If it's a multi-value field, validate that at least x items have been selected.
   *
   * @remarks #important#
   */
  minLength?: number;
  /**
   * The error message when the field value does not contain at least x characters (for a single-value field) or x items (for a multi-value field)
   *
   * @defaultValue
   * ```
   * ** Single-value field**
   * Invalid value. Must contain at least ${minLength} character${minLength > 1 ? 's' : ''}
   *
   * ** Multi-value field**
   * Invalid value. Must contain at least ${minLength} element${minLength > 1 ? 's' : ''}
   * ```
   */
  minLengthMessage?: string;
  /**
   * If it's a single-value field, validate that the value contains at most x characters.
   * If it's a multi-value field, validate that at most x items have been selected.
   *
   * @remarks #important#
   */
  maxLength?: number;
  /**
   * The error message when the field value does not contain at most x characters (for a single-value field) or x items (for a multi-value field)
   *
   * @defaultValue
   * ```
   * ** Single-value field**
   * Invalid value. Must contain at most ${maxLength} character${maxLength > 1 ? 's' : ''}
   *
   * ** Multi-value field**
   * Invalid value. Must contain at most ${maxLength} element${maxLength > 1 ? 's' : ''}
   * ```
   */
  maxLengthMessage?: string;
  /**
   * If it's a single-value field, validate that the value is greater than or equals to x.
   * If it's a multi-value field, validate that at least x items have been selected (minLength and min are equivalent in this case).
   *
   * @remarks #important#
   */
  min?: number;
  /**
   * The error message when the field value is lesser than x (for a single-value field) or does not contain at least x items (for a multi-value field)
   *
   * @defaultValue
   * ```
   * ** Single-value field**
   * Invalid value. Must be greater than or equal to ${min}
   *
   * ** Multi-value field**
   * Invalid value. Must contain at least ${min} element${min > 1 ? 's' : ''}
   * ```
   */
  minMessage?: string;
  /**
   * If it's a single-value field, validate that the value is lesser than or equals to x.
   * If it's a multi-value field, validate that at most x items have been selected (maxLength and max are equivalent in this case).
   *
   * @remarks #important#
   */
  max?: number;
  /**
   * The error message when the field value is greater than x (for a single-value field) or does not contain at most x items (for a multi-value field)
   *
   * @defaultValue
   * ```
   * ** Single-value field**
   * Invalid value. Must be lesser than or equal to ${max}
   *
   * ** Multi-value field**
   * Invalid value. Must contain at most ${max} element${max > 1 ? 's' : ''}
   * ```
   */
  maxMessage?: string;
  /**
   * Validates that the field value is an integer
   *
   * @remarks #important#
   */
  integer?: boolean;
  /**
   * The error message when the field value is not an email
   *
   * @defaultValue Invalid value. Must be an integer
   */
  integerMessage?: string;
  /**
   * A dictionary of custom validators
   * The dictionary key is the validator identifier and can be used later to activate/deactivate the validator.
   *
   * @remarks #important#
   * @example
   * ```tsx
   * const customValidators: AnonymousObject<Validator> = {
   *   inRange: (value) => {
   *     if (isNullOrEmpty(value) || (value >= 2 && value <= 5)) {
   *       return {
   *          valid: true,
   *          message: undefined,
   *       }
   *     }
   *     return {
   *       valid: false,
   *       message: 'Invalid value. Must be between 2 and 5',
   *     }
   *   },
   *   unique: {
   *     async: true
   *     validator: async (value) => {
   *        // do a request to the server
   *        const isUnique = await asyncGet(`/check/${value}`);
   *        return {
   *          valid: isUnique,
   *          message: isUnique ? undefined : 'Invalid value, must be unique'
   *        }
   *     }
   *   }
   * }
   *
   * return <FormInput validators={customValidators} />
   *
   * ```
   */
  validators?: AnonymousObject<Validator>;
};

export type ValidatorFunction = ValidatorSyncFunction | ValidatorAsyncFunction;
export type ValidatorSyncFunction = (value: any) => ValidationResult;
export type ValidatorAsyncFunction = (value: any) => Promise<ValidationResult>;
export type ValidatorObject = {
  async?: boolean;
  disabled?: boolean;
  validator: ValidatorFunction;
};

export type Validator = ValidatorFunction | ValidatorObject;
