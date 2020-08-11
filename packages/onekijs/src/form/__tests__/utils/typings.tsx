import { FormSubmitCallback, FormOptions } from '../../typings';

export type FormProps = {
  submit: FormSubmitCallback;
  options?: FormOptions;
};

// FIELD TESTS
export type FieldTestData = {
  name?: string;
  firstname?: string;
  gender?: string;
  address?: {
    street?: string;
  };
};

export type FieldTestOptions = {
  title: string;
  submit: FormSubmitCallback;
  initialValues?: FieldTestData;
  expected?: FieldTestData;
  fillData?: FieldTestData;
};

export type FieldValidationExpected = {
  status?: string;
  message?: string;
  code?: string;
};

export type FieldValidationOptions = {
  title: string;
  submit: FormSubmitCallback;
  options?: FormOptions;
  expected?: {
    name?: FieldValidationExpected;
    firstname?: FieldValidationExpected;
    gender?: FieldValidationExpected;
  };
  fillData?: FieldTestData;
};

// WRAPPER TESTS
export type WrapperTestData = {
  username?: string;
  password?: string;
  gender?: string;
  admin?: boolean;
};

export type WrapperTestAction = {
  fillData?: WrapperTestData;
  validations?: {
    username?: FieldValidationExpected;
  };
  expected?: WrapperTestData;
  invalid?: boolean;
};

export type WrapperTestOptions = {
  title: string;
  actions: WrapperTestAction[];
} & FormProps;

// BIND TESTS
export type BindTestData = {
  name?: string;
  country?: string;
  state?: string;
};

export type BindTestExpected = {
  stateVisible: boolean;
  data: BindTestData;
};

export type BindTestAction = {
  fillData?: BindTestData;
  expected?: BindTestData;
};

export type BindTestOptions = {
  title: string;
  actions: BindTestAction[];
} & FormProps;
