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
  addFilter?: FormRuleFieldFilter | FormRuleFieldFilter[];
  appendValue?: FormRuleValue | FormRuleValue[];
  disable?: string | string[];
  disableValidator?: FormRuleValidator | FormRuleValidator[];
  enable?: string | string[];
  enableValidator?: FormRuleValidator | FormRuleValidator[];
  event?: 'onChange' | 'onInit';
  hide?: string | string[];
  insertValue?: FormRulePositionalValue | FormRulePositionalValue[];
  removeFilter?: FormRuleFieldFilterId | FormRuleFieldFilterId[];
  removeValue?: FormRulePositionalField | FormRulePositionalField[];
  setError?: FormRuleValidation | FormRuleValidation[];
  setValue?: FormRuleValue | FormRuleValue[];
  setWarning?: FormRuleValidation | FormRuleValidation[];
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
