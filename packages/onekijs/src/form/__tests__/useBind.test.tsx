import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { fireEvent, render, screen } from '../../__tests__/customRenderer';
import UseBindWidget from './components/BindWidget';
import { checkValue, interact } from './utils/element';
import { BindTestOptions } from './utils/typings';

const useBindTests: BindTestOptions[] = [
  {
    title: 'initial values correctly set',
    submit: jest.fn(),
    options: {
      initialValues: {
        name: 'Doe',
        country: 'belgium',
      },
    },
    actions: [
      {
        expected: {
          stateVisible: false,
          data: {
            name: 'Doe',
            country: 'belgium',
          },
        },
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
            interact(stateElement, submit, test, action.fillData.state);
          }
          checkValue(nameElement, action.fillData.name);
          checkValue(countryElement, action.fillData.country);
          if (action.fillData.state && stateElement) checkValue(stateElement, action.fillData.state);
        }

        if (action.expected) {
          fireEvent.click(submit);
          expect(test.submit).toHaveBeenCalled();
          expect((test.submit as jest.Mock).mock.calls[0][0]).toEqual(action.expected.data);
          if (action.expected.stateVisible) {
            expect(stateElement).toBeDefined();
            expect(stateElement).toBeVisible();
          } else {
            if (stateElement) {
              expect(stateElement).not.toBeVisible();
            }
          }
        }
      }
    });
  });
});
