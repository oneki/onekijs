import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { render, screen, fireEvent } from '../../__tests__/customRenderer';
import { FormOptions, FormSubmitCallback, ValidationCode } from '../typings';
import WrapperWidget, { FormData } from './components/WrapperWidget';
import { interact, checkValue } from './utils/element';
import { waitCallback } from '../../__tests__/utils/timeout';

type FieldValidationExpected = {
  status?: string;
  message?: string;
  code?: string;
};

type WrapperTestOptions = {
  title: string;
  submit: FormSubmitCallback;
  options?: FormOptions;
  validations?: {
    username?: FieldValidationExpected;
  };
  expected?: FormData;
  fillData?: FormData;
};

const validValues: FormData = {
  username: 'john.doe',
  password: 'secret',
  admin: false,
  gender: 'male',
};

const wrapperTests: WrapperTestOptions[] = [
  {
    title: 'initial values correctly set',
    submit: jest.fn(),
    options: {
      initialValues: validValues,
      touchOn: 'load',
    },
    expected: validValues,
  },
  {
    title: 'fill valid data (without initial value)',
    submit: jest.fn(),
    options: {
      touchOn: 'load',
    },
    fillData: validValues,
    expected: validValues,
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
    fillData: validValues,
    expected: validValues,
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

      ['username', 'password', 'gender', 'admin'].forEach((field) => {
        const element = screen.getByLabelText(`${field}`);
        const code = screen.getByTestId(`${field}-validation-code`);
        const status = screen.getByTestId(`${field}-validation-status`);
        const message = screen.getByTestId(`${field}-validation-message`);
        const validation = test.validations ? (test.validations as any)[field] : undefined;
        const submit = screen.getByRole('button', { name: /submit/i });
        // check if initial value is correctly set
        checkValue(element, (test.options?.initialValues as any)[field]);

        if (test.options?.touchOn !== 'load') {
          // check that no error message is visible
          expect(code).toHaveTextContent(String(ValidationCode.None));
          expect(status).toHaveTextContent('');
          expect(message).toHaveTextContent('');
        }
        const value = test.fillData ? (test.fillData as any)[field] : undefined;
        interact(element, submit, test, value);
        checkValue(element, value);
        if (validation) {
          if (validation.code !== undefined) expect(code).toHaveTextContent(validation.code);
          if (validation.status !== undefined) expect(status).toHaveTextContent(validation.status);
          if (validation.message !== undefined) expect(message).toHaveTextContent(validation.message);
        }
      });
      if (test.expected) {
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        await waitCallback(test.submit as jest.Mock);
        expect(test.submit).toHaveBeenCalled();
        expect((test.submit as jest.Mock).mock.calls[0][0]).toEqual(test.expected);
      }
    });
  });
});
