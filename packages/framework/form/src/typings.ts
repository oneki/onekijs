import { AnonymousObject, State } from '@oneki/types';
import { FC, MutableRefObject, SyntheticEvent } from 'react';
import ContainerValidation from './ContainerValidation';
import FieldValidation from './FieldValidation';

export type AsyncBinder<T> = (...args: any[]) => Promise<T>;

export interface AsyncBindState extends State {
  loading?: boolean;
  error?: Error;
  result?: any;
}

export type Binder<T> = (...args: any[]) => T;

export interface Field extends FieldOptions {
  name: string;
  touched: boolean;
  validations: AnonymousObject<string>[];
  touchOn: TouchOnType;
  validators: Validator[];
  onChange: (value: any) => void;
  onFocus: () => void;
  onBlur: () => void;
}

export interface FieldContainer {
  context: FormContext;
  value: AnonymousObject<any>;
  validation: ContainerValidation;
}

export interface FieldProps {
  name: string;
  onChange: (value: any) => void;
  onFocus: () => void;
  onBlur: () => void;
  value?: any;
}

export interface FieldOptions {
  defaultValue?: any;
  touchOn?: TouchOnType;
}

export type FormErrorCallback = (fields: Field[], values: AnonymousObject) => void;

export type FormFieldProps = FieldOptions &
  ValidatorsType & {
    name: string;
    id?: string | number;
  };

export type FormLabelWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type FormLayout = 'horizontal' | 'vertical';

export type FormListener = (...args: any[]) => void;

export interface FormListenerProps {
  listener: FormListener;
  watchs: string[];
  once?: boolean;
  labelWidth?: FormLabelWidth;
  layout?: FormLayout;
}

export type FormListenerType = 'valueChange' | 'validationChange' | 'submittingChange';

export interface FormOptions {
  touchOn?: TouchOnType;
  initialValues?: AnonymousObject;
  onError?: FormErrorCallback;
  onWarning?: FormWarningCallback;
  labelWidth?: FormLabelWidth;
  layout?: FormLayout;
}

export type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

export type FormSubmitCallback = (values: AnonymousObject) => void;

export interface FormState extends State, FormOptions {
  validations?: AnonymousObject<FieldValidation>;
  values?: AnonymousObject;
  submitting?: boolean;
  resetting?: boolean;
}

export type FormWarningCallback = (fields: Field[], values: AnonymousObject) => void;

export interface FormContext {
  add: (fieldArrayName: string, initialValue?: any) => void;
  clearValidation: (fieldName: string, validatorName: string, code: ValidationCode) => void;
  fields: any;
  init: (name: string, validators?: Validator[], fieldOptions?: FieldOptions) => FieldProps;
  getContainerFieldValidation: (
    validations: AnonymousObject<FieldValidation>,
    fields: AnonymousObject<Field>,
    prefix?: string,
    touchedOnly?: boolean,
  ) => ContainerValidation;
  labelWidth?: FormLabelWidth;
  layout?: FormLayout;
  offSubmittingChange: (listener: FormListener) => void;
  offValidationChange: (listener: FormListener, watchs: string[] | string) => void;
  offValueChange: (listener: FormListener, watchs: string[] | string) => void;
  onSubmittingChange: (listener: FormListener, once?: boolean) => void;
  onValidationChange: (listener: FormListener, watchs: string[] | string, once?: boolean) => void;
  onValueChange: (listener: FormListener, watchs: string[] | string, once?: boolean) => void;
  remove: (fieldArrayName: string, index: number) => void;
  reset: () => void;
  setError: (fieldName: string, validatorName: string, message?: string, match?: boolean) => boolean;
  setOK: (fieldName: string, validatorName: string) => boolean;
  setPendingValidation: (fieldName: string, validatorName: string, pending?: any) => boolean;
  setValidation: (fieldName: string, validatorName: string, code: ValidationCode, message?: string) => void;
  setValue: (fieldName: string, value: any) => void;
  setValues: (values: AnonymousObject<any>) => void;
  setWarning: (fieldName: string, validatorName: string, message?: string, match?: boolean) => boolean;
  submit: (e?: SyntheticEvent<Element, Event>) => void;
  submittingRef: MutableRefObject<boolean>;
  valuesRef: MutableRefObject<any>;
  validationsRef: MutableRefObject<AnonymousObject<FieldValidation>>;
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
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
  field: (name: string, validators?: Validator[], options?: FieldOptions) => FieldProps;
  Form: FC<FormProps>;
  getValue<T = any>(fieldName: string): T | undefined;
  getValue<T = any>(fieldName: string, defaultValue: undefined): T | undefined;
  getValue<T = any>(fieldName: string, defaultValue: null): T | null;
  getValue<T = any>(fieldName: string, defaultValue: T): T;
  getValue(fieldName?: string, defaultValue?: any): any;
  getValidation: (fieldName?: string, touchedOnly?: boolean) => FieldValidation | ContainerValidation;
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

export enum ValidationStatus {
  Loading = 'Loading',
  Error = 'Error',
  Warning = 'Warning',
  Ok = 'OK',
  None = '',
}

export type ValidatorsType = {
  required?: boolean;
  requiredMessage?: string;
  regex?: string | RegExp;
  regexMessage?: string;
  validators?: Validator[];
};

export type Validator = (value: any) => ValidationResult;
