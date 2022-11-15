import React, { SyntheticEvent } from 'react';
import { FCC } from '../types/core';
import { FormLayout } from '../types/form';
import { AnonymousObject } from '../types/object';
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

export interface Field extends FieldOptions {
  touched: boolean;
  name: string;
  validations: AnonymousObject<string>[];
  touchOn: TouchOnType;
  validators: AnonymousObject<Validator>;
  context: FieldProps;
}

export interface FieldContainer {
  context: FormService;
  value: AnonymousObject<any>;
  touchedValidation: ContainerValidation;
  allValidation: ContainerValidation;
  touchAllFields: () => void;
}

export interface FieldProps {
  name: string;
  onChange: (value: any) => void;
  onFocus: () => void;
  onBlur: () => void;
  value?: any;
}

export type FieldOptions<T = any> = FormMetadata & {
  defaultValue?: T;
  touchOn?: TouchOnType;
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
};

export type FormDecorator = {
  name: string;
};

export type FormDecoratorOptions = FormMetadata;

export type FormErrorCallback = (fields: Field[], values?: AnonymousObject) => void;

export type FormFieldProps<T = any> = FieldOptions<T> &
  ValidatorsType & {
    name: string;
    id?: string;
  };

export type FormLabelWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface FormListenerProps {
  id: string;
  listener: FormValueListener | FormValidationListener | FormSubmitListener | FormMetadataListener;
  once?: boolean;
}

export type FormListenerType = 'valueChange' | 'validationChange' | 'submittingChange' | 'metadataChange';

export type FormMetadata = {
  visible?: boolean;
  disabled?: boolean;
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

export interface FormState extends State, FormOptions {
  validations: AnonymousObject<FieldValidation>;
  metadata: AnonymousObject<FormMetadata>;
  values?: AnonymousObject;
  initialValues?: AnonymousObject;
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

export type FormValueListener<T = any> = (value: T, previousValue: T | undefined, watch: string) => any;

export type FormWarningCallback = (fields: Field[], values?: AnonymousObject) => void;

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  touchOn?: TouchOnType;
} & ValidatorsType;

export enum TouchOn {
  Blur = 'blur',
  Load = 'load',
  Focus = 'focus',
  Change = 'change',
  Submit = 'submit',
}
export type TouchOnType = 'blur' | 'load' | 'focus' | 'change' | 'submit';

export type Ruler = (...args: any[]) => void;

export type SelectProps = React.InputHTMLAttributes<HTMLInputElement> & ValidatorsType;

export type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { showErrors?: boolean };

export type TextareaProps = React.InputHTMLAttributes<HTMLInputElement> & ValidatorsType;

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
  required?: boolean;
  requiredMessage?: string;
  regex?: string | RegExp;
  regexMessage?: string;
  email?: boolean;
  emailMessage?: string;
  minLength?: number;
  minLengthMessage?: string;
  maxLength?: number;
  maxLengthMessage?: string;
  min?: number;
  minMessage?: string;
  max?: number;
  maxMessage?: string;
  integer?: boolean;
  integerMessage?: string;
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
