import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { fireEvent, render } from '../../__tests__/customRenderer';
import { waitCallback } from '../../__tests__/utils/timeout';
import { ValidationCode } from '../typings';
import FieldValidationWidget from './components/FieldValidationWidget';
import FieldWidget from './components/FieldWidget';
import { interact } from './utils/element';
import { FieldTestOptions, FieldValidationOptions } from './utils/typings';

const validValues = {
  name: 'Doe',
  firstname: 'John',
  gender: 'male',
  address: {
    street: 'qux',
  },
};

const fieldTests: FieldTestOptions[] = [
  {
    title: 'initial values correctly set',
    submit: jest.fn(),
    initialValues: validValues,
    expected: {
      name: 'Doe',
      firstname: 'John',
      gender: 'male',
      address: {
        street: 'qux',
      },
    },
  },
  {
    title: 'initial values correctly set (with gender and street)',
    submit: jest.fn(),
    initialValues: {
      name: 'Foo',
      firstname: 'Bar',
      gender: 'female',
      address: {
        street: 'baz',
      },
    },
    expected: {
      name: 'Foo',
      firstname: 'Bar',
      gender: 'female',
      address: {
        street: 'baz',
      },
    },
  },
  {
    title: 'initial values with address undefined',
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
      address: {
        street: '',
      },
    },
  },
  {
    title: 'fill data without initial value',
    submit: jest.fn(),
    expected: {
      name: 'Foo',
      firstname: 'Bar',
      gender: 'female',
      address: {
        street: 'baz',
      },
    },
    fillData: {
      name: 'Foo',
      firstname: 'Bar',
      gender: 'female',
      address: {
        street: 'baz',
      },
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
      address: {
        street: 'baz',
      },
    },
    fillData: {
      name: 'Foo',
      firstname: 'Bar',
      gender: 'female',
      address: {
        street: 'baz',
      },
    },
  },
];

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
      const streetElement = getByTestId('address.street');
      if (test.initialValues) {
        expect(nameElement).toHaveDisplayValue(test.initialValues.name || '');
        expect(firstnameElement).toHaveDisplayValue(test.initialValues.firstname || '');
        if (test.initialValues.gender) {
          expect(genderElement).toHaveValue(test.initialValues.gender);
        } else {
          expect(genderElement).toHaveValue('male');
        }
        expect(streetElement).toHaveDisplayValue(test.initialValues.address?.street || '');
      }

      if (test.fillData) {
        userEvent.clear(nameElement);
        userEvent.clear(firstnameElement);
        userEvent.clear(streetElement);
        if (test.fillData.name) userEvent.type(nameElement, test.fillData.name);
        if (test.fillData.firstname) userEvent.type(firstnameElement, test.fillData.firstname);
        if (test.fillData.gender) fireEvent.change(genderElement, { target: { value: test.fillData.gender } });
        if (test.fillData.address?.street) userEvent.type(streetElement, test.fillData.address.street);
      }

      fireEvent.click(getByTestId('submit'));
      await waitCallback(test.submit as jest.Mock);
      expect(test.submit).toHaveBeenCalled();
      expect((test.submit as jest.Mock).mock.calls[0][0]).toEqual(test.expected);
    });
  });
});

const fieldValidationTests: FieldValidationOptions[] = [
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
    });
  });
});
