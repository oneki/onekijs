import { QueryFilterOrCriteria } from '../collection/typings';

export enum ValidationStatus {
  Loading = 'Loading',
  Error = 'Error',
  Warning = 'Warning',
  Ok = 'OK',
  None = '',
}

export type FormFieldControllerRegistry = {
  getController: (name: string) => any;
};

export type FormLayout = 'horizontal' | 'vertical' | 'table';

export type FormRule = {
  add_filter?: FormRuleFieldFilter | FormRuleFieldFilter[];
  append_value?: FormRuleValue | FormRuleValue[];
  disable?: string | string[];
  disable_validator?: FormRuleValidator | FormRuleValidator[];
  enable?: string | string[];
  enable_validator?: FormRuleValidator | FormRuleValidator[];
  event?: 'onChange' | 'onInit';
  hide?: string | string[];
  insert_value?: FormRulePositionalValue | FormRulePositionalValue[];
  remove_filter?: FormRuleFieldFilterId | FormRuleFieldFilterId[];
  remove_value?: FormRulePositionalField | FormRulePositionalField[];
  set_error?: FormRuleValidation | FormRuleValidation[];
  set_value?: FormRuleValue | FormRuleValue[];
  set_warning?: FormRuleValidation | FormRuleValidation[];
  show?: string | string[];
  watch?: string | string[];
  when?: FormRuleFilterOrCriteria | FormRuleFilterOrCriteria[] | string | string[];
};

export type FormRuleFieldFilter = {
  field: string;
  filter: FormRuleFilterOrCriteria | FormRuleFilterOrCriteria[] | string | string[];
};

export type FormRuleFieldFilterId = {
  field: string;
  filterId: string | string[];
};

export type FormRuleFilterOrCriteria = QueryFilterOrCriteria;

export type FormRulePositionalField = {
  field: string;
  position: number;
};

export type FormRulePositionalValue = {
  field: string;
  value: any;
  position: number;
};

export type FormRuleValidation = {
  field: string;
  message: string;
};

export type FormRuleValidator = {
  field: string;
  name: string;
};

export type FormRuleValue = {
  field: string;
  value: any;
};
