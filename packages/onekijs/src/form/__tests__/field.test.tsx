import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { fireEvent, render } from '../../__tests__/customRenderer';
import { waitCallback } from '../../__tests__/utils/timeout';
import { FormOptions, FormSubmitCallback, ValidationCode } from '../typings';
import FieldValidationWidget from './components/FieldValidationWidget';
import FieldWidget, { FormData } from './components/FieldWidget';

type fieldTestOptions = {
  title: string;
  submit: FormSubmitCallback;
  initialValues?: FormData;
  expected?: FormData;
  fillData?: FormData;
};

const { location } = window;

beforeEach((): void => {
  delete window.location;
  (window as any).location = {
    href: '',
  };
});

afterEach((): void => {
  window.location = location;
});

const validValues = {
  name: 'Doe',
  firstname: 'John',
  gender: 'male',
};

const fieldTests: fieldTestOptions[] = [
  {
    title: 'initial values correctly set',
    submit: jest.fn(),
    initialValues: validValues,
    expected: {
      name: 'Doe',
      firstname: 'John',
      gender: 'male',
    },
  },
  {
    title: 'initial values correctly set (with gender)',
    submit: jest.fn(),
    initialValues: {
      name: 'Foo',
      firstname: 'Bar',
      gender: 'female',
    },
    expected: {
      name: 'Foo',
      firstname: 'Bar',
      gender: 'female',
    },
  },
  {
    title: 'fill data without initial value',
    submit: jest.fn(),
    expected: {
      name: 'Foo',
      firstname: 'Bar',
      gender: 'female',
    },
    fillData: {
      name: 'Foo',
      firstname: 'Bar',
      gender: 'female',
    },
  },
  {
    title: 'fill data with initial value',
    submit: jest.fn(),
    initialValues: validValues,
    expected: {
      name: 'Foo',
      firstname: 'Bar',
      gender: 'female',
    },
    fillData: {
      name: 'Foo',
      firstname: 'Bar',
      gender: 'female',
    },
  },
];

/*          await waitCallback(onError as jest.Mock);
          expect(onError).toHaveBeenCalled();*/

describe('it tests the field helper', () => {
  fieldTests.forEach((test) => {
    it(`${test.title}`, async () => {
      const { getByTestId } = render(
        <>
          <FieldWidget submit={test.submit} initialValues={test.initialValues} />
          <NotificationWidget />
        </>,
      );
      const nameElement = getByTestId('name');
      const firstnameElement = getByTestId('firstname');
      const genderElement = getByTestId('gender');

      if (test.initialValues) {
        expect(nameElement).toHaveValue(test.initialValues.name);
        expect(firstnameElement).toHaveValue(test.initialValues.firstname);
        if (test.initialValues.gender) {
          expect(genderElement).toHaveValue(test.initialValues.gender);
        } else {
          expect(genderElement).toHaveValue('male');
        }
      }

      if (test.fillData) {
        userEvent.clear(nameElement);
        userEvent.clear(firstnameElement);
        if (test.fillData.name) userEvent.type(nameElement, test.fillData.name);
        if (test.fillData.firstname) userEvent.type(firstnameElement, test.fillData.firstname);
        if (test.fillData.gender) fireEvent.change(genderElement, { target: { value: test.fillData.gender } });
      }

      fireEvent.click(getByTestId('submit'));
      await waitCallback(test.submit as jest.Mock);
      expect(test.submit).toHaveBeenCalled();
      expect((test.submit as jest.Mock).mock.calls[0][0]).toEqual(test.expected);
    });
  });
});

type FieldValidationExpected = {
  status?: string;
  message?: string;
  code?: string;
};

type fieldValidationOptions = {
  title: string;
  submit: FormSubmitCallback;
  options?: FormOptions;
  expected?: {
    name?: FieldValidationExpected;
    firstname?: FieldValidationExpected;
    gender?: FieldValidationExpected;
  };
  fillData?: FormData;
};

const fieldValidationTests: fieldValidationOptions[] = [
  {
    title: 'validation on initial load (values are corrects)',
    submit: jest.fn(),
    options: {
      initialValues: {
        name: 'Doe',
        firstname: 'John',
      },
      touchOn: 'load',
    },
    expected: {
      firstname: {
        code: String(ValidationCode.None),
        status: '',
        message: '',
      },
    },
  },
  {
    title: 'validation on initial load (some values are incorrects)',
    submit: jest.fn(),
    options: {
      initialValues: {
        name: 'Doe',
        firstname: 'Jo/hn',
      },
      touchOn: 'load',
    },
    expected: {
      name: {
        status: '',
        message: '',
        code: String(ValidationCode.None),
      },
      firstname: {
        code: String(ValidationCode.Error),
        status: 'Error',
        message: 'Can only contains alphanumeric characters, dashes or underscores',
      },
    },
  },
  {
    title: 'validation on focus',
    submit: jest.fn(),
    options: {
      initialValues: {
        name: 'Doe',
        firstname: 'Jo/hn',
      },
      touchOn: 'focus',
    },
    expected: {
      name: {
        status: '',
        message: '',
        code: String(ValidationCode.None),
      },
      firstname: {
        code: String(ValidationCode.Error),
        status: 'Error',
        message: 'Can only contains alphanumeric characters, dashes or underscores',
      },
    },
  },
  {
    title: 'validation on blur',
    submit: jest.fn(),
    options: {
      initialValues: {
        name: 'Doe',
        firstname: 'Jo/hn',
      },
      touchOn: 'blur',
    },
    expected: {
      name: {
        status: '',
        message: '',
        code: String(ValidationCode.None),
      },
      firstname: {
        code: String(ValidationCode.Error),
        status: 'Error',
        message: 'Can only contains alphanumeric characters, dashes or underscores',
      },
    },
  },
  {
    title: 'validation on change',
    submit: jest.fn(),
    options: {
      initialValues: {
        name: 'Doe',
        firstname: 'John',
      },
      touchOn: 'change',
    },
    fillData: {
      firstname: 'Jo/hn',
    },
    expected: {
      name: {
        status: '',
        message: '',
        code: String(ValidationCode.None),
      },
      firstname: {
        code: String(ValidationCode.Error),
        status: 'Error',
        message: 'Can only contains alphanumeric characters, dashes or underscores',
      },
    },
  },
];

describe('it tests validations when the field helper is used', () => {
  fieldValidationTests.forEach((test) => {
    it(`${test.title}`, async () => {
      const { getByTestId } = render(
        <>
          <FieldValidationWidget submit={test.submit} options={test.options} />
          <NotificationWidget />
        </>,
      );

      ['name', 'firstname', 'gender'].forEach((field) => {
        const element = getByTestId(`${field}`);
        const code = getByTestId(`${field}-validation-code`);
        const status = getByTestId(`${field}-validation-status`);
        const message = getByTestId(`${field}-validation-message`);
        const expected = (test.expected as any)[field];
        const submit = getByTestId('submit');
        if (expected) {
          if (test.options?.touchOn !== 'load') {
            expect(code).toHaveTextContent(String(ValidationCode.None));
            expect(status).toHaveTextContent('');
            expect(message).toHaveTextContent('');
          }
          const value = test.fillData ? (test.fillData as any)[field] : undefined;
          interact(element, submit, test, value);
          if (expected.code !== undefined) expect(code).toHaveTextContent(expected.code);
          if (expected.status !== undefined) expect(status).toHaveTextContent(expected.status);
          if (expected.message !== undefined) expect(message).toHaveTextContent(expected.message);

          // enter a valid value
          const validValue = (validValues as any)[field];
          interact(element, submit, test, validValue);
          expect(code).toHaveTextContent(String(ValidationCode.None));
          expect(status).toHaveTextContent('');
          expect(message).toHaveTextContent('');

          // enter the expected value
          if (value !== undefined) {
            interact(element, submit, test, value);
            if (expected.code !== undefined) expect(code).toHaveTextContent(expected.code);
            if (expected.status !== undefined) expect(status).toHaveTextContent(expected.status);
            if (expected.message !== undefined) expect(message).toHaveTextContent(expected.message);
          }
        }
      });

      // if (test.fillData) {
      //   userEvent.clear(nameElement);
      //   userEvent.clear(firstnameElement);
      //   if (test.fillData.name) userEvent.type(nameElement, test.fillData.name);
      //   if (test.fillData.firstname) userEvent.type(firstnameElement, test.fillData.firstname);
      //   if (test.fillData.gender) fireEvent.change(genderElement, { target: { value: test.fillData.gender } });
      // }

      // fireEvent.click(getByTestId('submit'));
      // await waitCallback(test.submit as jest.Mock);
      // expect(test.submit).toHaveBeenCalled();
      // expect((test.submit as jest.Mock).mock.calls[0][0]).toEqual(test.expected);
    });
  });
});

const interact = (element: HTMLElement, submit: HTMLElement, test: fieldValidationOptions, value?: string): void => {
  if (value !== undefined) {
    userEvent.clear(element);
    userEvent.type(element, value);
  }
  if (test.options?.touchOn === 'focus') {
    element.focus();
  } else if (test.options?.touchOn === 'blur') {
    element.focus();
    submit.focus();
  }
};
