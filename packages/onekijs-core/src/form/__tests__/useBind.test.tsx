import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { fireEvent, render, screen } from '../../__tests__/customRenderer';
import UseBindWidget from './components/BindWidget';
import { checkValue, interact } from './utils/element';
import { BindTestData, BindTestOptions } from './utils/typings';
import { asyncTimeout } from '../../__tests__/utils/timeout';
import { act } from 'react-dom/test-utils';

const belgiumData: BindTestData = {
  name: 'Doe',
  country: 'belgium',
};

const usaData: BindTestData = {
  name: 'Doe',
  country: 'usa',
  state: 'California',
};

const useBindTests: BindTestOptions[] = [
  {
    title: 'initial values correctly set (country without states)',
    submit: jest.fn(),
    options: {
      initialValues: belgiumData,
    },
    actions: [
      {
        expected: belgiumData,
      },
    ],
  },
  {
    title: 'initial values correctly set (country with states)',
    submit: jest.fn(),
    options: {
      initialValues: usaData,
    },
    actions: [
      {
        expected: usaData,
      },
    ],
  },
  {
    title: 'check state is visible when usa is selected',
    submit: jest.fn(),
    options: {
      initialValues: belgiumData,
    },
    actions: [
      {
        fillData: usaData,
        expected: usaData,
      },
    ],
  },
];

describe('it tests the useBind hook', () => {
  useBindTests.forEach((test) => {
    it(`${test.title}`, async () => {
      render(
        <>
          <UseBindWidget submit={test.submit} options={test.options} />
          <NotificationWidget />
        </>,
      );
      const nameElement = screen.getByLabelText('name');
      const countryElement = screen.getByLabelText('country');
      const submit = screen.getByRole('button', { name: /submit/i });

      let stateElement;
      if (test.options?.initialValues?.country === 'usa') {
        stateElement = await screen.findByLabelText('state', undefined, { timeout: 30 });
      }
      if (test.options?.initialValues) {
        checkValue(nameElement, test.options.initialValues.name);
        checkValue(countryElement, test.options.initialValues.country);
        if (stateElement) checkValue(stateElement, test.options?.initialValues?.state);
      }

      for (let i = 0; i < test.actions.length; i++) {
        const action = test.actions[i];
        if (action.fillData) {
          interact(nameElement, submit, test, action.fillData.name);
          interact(countryElement, submit, test, action.fillData.country);
          if (action.fillData.state) {
            stateElement = await screen.findByLabelText('state');
            await asyncTimeout(10);
            interact(stateElement, submit, test, action.fillData.state);
          }
          checkValue(nameElement, action.fillData.name);
          checkValue(countryElement, action.fillData.country);
          if (action.fillData.state && stateElement) {
            await asyncTimeout(10);
            checkValue(stateElement, action.fillData.state);
          }
        }
        if (action.expected) {
          await act(async () => {
            fireEvent.click(submit);
            await asyncTimeout(10);
            expect(test.submit).toHaveBeenCalled();
            expect((test.submit as jest.Mock).mock.calls[0][0]).toEqual(action.expected);
            let stateElement;
            if (action.expected?.state === 'usa') {
              stateElement = screen.getByLabelText('state');
            }
            if (action.expected?.state === 'usa') {
              expect(stateElement).toBeDefined();
              expect(stateElement).toBeVisible();
            } else {
              if (stateElement) {
                expect(stateElement).not.toBeVisible();
              }
            }
          });
        }
      }
    });
  });
});
