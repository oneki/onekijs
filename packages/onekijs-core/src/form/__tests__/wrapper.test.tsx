import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { fireEvent, render, screen } from '../../__tests__/customRenderer';
import { waitCallback } from '../../__tests__/utils/timeout';
import { ValidationCode } from '../typings';
import WrapperWidget from './components/WrapperWidget';
import { checkValue, interact } from './utils/element';
import { WrapperTestData, WrapperTestOptions } from './utils/typings';

const validValues: WrapperTestData = {
  username: 'john.doe',
  password: 'secret',
  admin: false,
  gender: 'male',
};

const invalidValues: WrapperTestData = {
  username: '',
  password: 'secret',
  admin: false,
  gender: 'male',
};

const valid = {
  username: {
    code: String(ValidationCode.None),
    message: '',
    status: '',
  },
};

const invalid = {
  username: {
    code: String(ValidationCode.Error),
    message: 'This field is required',
    status: 'Error',
  },
};

const wrapperTests: WrapperTestOptions[] = [
  {
    title: 'initial values correctly set',
    submit: jest.fn(),
    options: {
      initialValues: validValues,
      touchOn: 'load',
    },
    actions: [
      {
        validations: valid,
        expected: validValues,
      },
    ],
  },
  {
    title: 'fill valid data (without initial value)',
    submit: jest.fn(),
    options: {
      touchOn: 'load',
    },

    actions: [
      {
        fillData: validValues,
        validations: valid,
        expected: validValues,
      },
    ],
  },
  {
    title: 'fill valid data (with initial value)',
    submit: jest.fn(),
    options: {
      touchOn: 'load',
      initialValues: {
        username: 'guest.user',
        password: 'guest_pwd',
        admin: true,
        gender: 'female',
      },
    },

    actions: [
      {
        fillData: validValues,
        validations: valid,
        expected: validValues,
      },
    ],
  },
  {
    title: 'fill invalid data (without initial value)',
    submit: jest.fn(),
    options: {
      touchOn: 'load',
    },
    actions: [
      {
        fillData: invalidValues,
        validations: invalid,
        expected: invalidValues,
        invalid: true,
      },
    ],
  },
  {
    title: 'fill invalid data (with initial value)',
    submit: jest.fn(),
    options: {
      touchOn: 'load',
      initialValues: validValues,
    },
    actions: [
      {
        fillData: invalidValues,
        validations: invalid,
        expected: invalidValues,
        invalid: true,
      },
    ],
  },
  {
    title: 'initial invalid > valid values',
    submit: jest.fn(),
    options: {
      touchOn: 'load',
      initialValues: invalidValues,
    },
    actions: [
      {
        fillData: validValues,
        validations: valid,
        expected: validValues,
        invalid: false,
      },
    ],
  },
  {
    title: 'no initial value > invalid values > valid values',
    submit: jest.fn(),
    options: {
      touchOn: 'load',
    },
    actions: [
      {
        fillData: invalidValues,
        validations: invalid,
        expected: invalidValues,
        invalid: true,
      },
      {
        fillData: validValues,
        validations: valid,
        expected: validValues,
        invalid: false,
      },
    ],
  },
  {
    title: 'initial value > invalid values > valid values',
    submit: jest.fn(),
    options: {
      touchOn: 'load',
      initialValues: validValues,
    },
    actions: [
      {
        fillData: invalidValues,
        validations: invalid,
        expected: invalidValues,
        invalid: true,
      },
      {
        fillData: validValues,
        validations: valid,
        expected: validValues,
        invalid: false,
      },
    ],
  },
];

describe('it tests the wrappers', () => {
  wrapperTests.forEach((test) => {
    it(`${test.title}`, async () => {
      render(
        <>
          <WrapperWidget submit={test.submit} options={test.options} />
          <NotificationWidget />
        </>,
      );
      for (let i = 0; i < test.actions.length; i++) {
        const action = test.actions[i];
        ['username', 'password', 'gender', 'admin'].forEach((field) => {
          const element = screen.getByLabelText(`${field}`);
          const code = screen.getByTestId(`${field}-validation-code`);
          const status = screen.getByTestId(`${field}-validation-status`);
          const message = screen.getByTestId(`${field}-validation-message`);
          const validation = action.validations ? (action.validations as any)[field] : undefined;
          const submit = screen.getByRole('button', { name: /submit/i });
          // check if initial value is correctly set
          checkValue(element, (test.options?.initialValues as any)[field]);

          if (i === 0 && test.options?.touchOn !== 'load') {
            // check that no error message is visible
            expect(code).toHaveTextContent(String(ValidationCode.None));
            expect(status).toHaveTextContent('');
            expect(message).toHaveTextContent('');
          }

          const value = action.fillData ? (action.fillData as any)[field] : undefined;
          interact(element, submit, test, value);
          checkValue(element, value);
          if (validation) {
            if (validation.code !== undefined) expect(code).toHaveTextContent(validation.code);
            if (validation.status !== undefined) expect(status).toHaveTextContent(validation.status);
            if (validation.message !== undefined) expect(message).toHaveTextContent(validation.message);
          }
        });
        if (action.expected) {
          fireEvent.click(screen.getByRole('button', { name: /submit/i }));
          try {
            await waitCallback(test.submit as jest.Mock, 50);
            expect(action.invalid).toBeFalsy();
            expect(test.submit).toHaveBeenCalled();
            expect((test.submit as jest.Mock).mock.calls[0][0]).toEqual(action.expected);
          } catch (e) {
            // Verify that submit function is not called if data are invalid
            expect(e.message).toBe('wait timeout');
            expect(action.invalid).toBeTruthy();
          }
        }
      }
    });
  });
});
