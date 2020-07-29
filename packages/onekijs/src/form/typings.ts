import { State, Collection, AnonymousObject } from '../core/typings';
import { SyntheticEvent, MutableRefObject, FC } from 'react';
import FieldValidation from './FieldValidation';
import ContainerValidation from './ContainerValidation';

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
  validations: Collection<string>[];
  touchOn: TouchOn;
  validators: Validator[];
  onChange: (value: any) => void;
  onFocus: () => void;
  onBlur: () => void;
}

export interface FieldContainer {
  context: FormContext;
  value: Collection<any>;
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
  touchOn?: TouchOn;
}

export type FormErrorCallback = (fields: Field[], values: AnonymousObject) => void;

export type FormListener = (...args: any[]) => void;

export interface FormListenerProps {
  listener: FormListener;
  watchs: string[];
  once?: boolean;
}

export type FormListenerType = 'valueChange' | 'validationChange' | 'submittingChange';

export interface FormOptions {
  touchOn?: TouchOn;
  initialValues?: AnonymousObject;
  onError?: FormErrorCallback;
  onWarning?: FormWarningCallback;
}

export type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

export type FormSubmitCallback = (values: AnonymousObject) => void;

export interface FormState extends State, FormOptions {
  validations?: Collection<FieldValidation>;
  values?: AnonymousObject;
  submitting?: boolean;
}

export type FormWarningCallback = (fields: Field[], values: AnonymousObject) => void;

export interface FormContext {
  add: (fieldArrayName: string, initialValue?: any) => void;
  clearValidation: (fieldName: string, validatorName: string, code: ValidationCode) => void;
  fields: any;
  init: (name: string, validators?: Validator[], fieldOptions?: FieldOptions) => FieldProps;
  getContainerFieldValidation: (
    validations: Collection<FieldValidation>,
    fields: Collection<Field>,
    prefix?: string,
    touchedOnly?: boolean,
  ) => ContainerValidation;
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
  setValues: (values: Collection<any>) => void;
  setWarning: (fieldName: string, validatorName: string, message?: string, match?: boolean) => boolean;
  submit: (e?: SyntheticEvent<Element, Event>) => void;
  submittingRef: MutableRefObject<boolean>;
  valuesRef: MutableRefObject<any>;
  validationsRef: MutableRefObject<Collection<FieldValidation>>;
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
} & ValidatorsType;

export enum TouchOn {
  Blur = 'blur',
  Load = 'load',
  Focus = 'focus',
  Change = 'change',
}

export type Ruler = (...args: any[]) => void;

export type SelectProps = React.InputHTMLAttributes<HTMLInputElement> & ValidatorsType;

export type SubmitButtonProps = React.InputHTMLAttributes<HTMLButtonElement>;

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
  setValues: (values: Collection<any>) => void;
  setOK: (fieldName: string, validatorName: string) => boolean;
  setWarning: (fieldName: string, validatorName: string, message?: string, match?: boolean) => boolean;
  setPendingValidation: (fieldName: string, validatorName: string, pending?: any) => boolean;
  submit: (e?: SyntheticEvent<Element, Event>) => void;
  submitting: boolean;
  validations: Collection<FieldValidation>;
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
