import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { fireEvent, render, act } from '../../__tests__/customRenderer';
import { wait, waitCallback } from '../../__tests__/utils/timeout';
import UseMutationWidget, { SubmitDataType } from './components/UseMutationWidget';
import { AppFetchOptions } from '../typings';

type usePostPutPatchTestProps = {
  title: string;
  method: string;
  baseUrl?: string;
  path: string;
  options?: AppFetchOptions;
  onError?: boolean;
  onSuccess?: boolean;
  error?: boolean;
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

const tests: usePostPutPatchTestProps[] = [
  {
    title: 'simple POST with onSuccess',
    method: 'post',
    path: '/echo',
    options: {
      onSuccess: jest.fn(),
    },
  },
  {
    title: 'simple PUT with onSuccess',
    method: 'put',
    path: '/echo',
    options: {
      onSuccess: jest.fn(),
    },
  },
  {
    title: 'simple PATCH with onSuccess',
    method: 'patch',
    path: '/echo',
    options: {
      onSuccess: jest.fn(),
    },
  },
];

describe('it does a POST/PUT/PATCH request', () => {
  tests.forEach((test) => {
    it(`it ${test.title}`, async () => {
      const data: SubmitDataType = {
        name: 'Doe',
        firstname: 'John',
      };
      const { getByText } = render(
        <>
          <UseMutationWidget method={test.method} data={data} path={test.path} options={test.options} />
          <NotificationWidget />
        </>,
      );
      await act(async () => {
        fireEvent.click(getByText('Submit'));
        await waitCallback(test.options?.onSuccess as jest.Mock);
        expect(test.options?.onSuccess).toHaveBeenCalled();
        expect((test.options?.onSuccess as jest.Mock).mock.calls[0][0]).toHaveProperty('name', 'Doe');
        expect((test.options?.onSuccess as jest.Mock).mock.calls[0][0]).toHaveProperty('firstname', 'John');
      });
    });
  });
});

let errorTests: usePostPutPatchTestProps[] = [];

['post', 'put', 'patch'].forEach((method) => {
  const methodUpper = method.toUpperCase();
  errorTests = errorTests.concat([
    {
      title: `${methodUpper} error via notification center`,
      method,
      path: '/error',
      error: true,
    },
    {
      title: `${methodUpper} error via onError callback`,
      method,
      path: '/error',
      options: {
        onError: jest.fn(),
      },
      error: true,
    },
    {
      title: `${methodUpper} error via onError url`,
      method,
      path: '/error',
      options: {
        onError: '/error',
      },
      error: true,
    },
    {
      title: `${methodUpper} success via onSuccess callback`,
      method,
      path: '/success',
      options: {
        onSuccess: jest.fn(),
      },
      error: false,
    },
    {
      title: `${methodUpper} success via onSuccess url`,
      method,
      path: '/success',
      options: {
        onSuccess: '/success',
      },
      error: false,
    },
  ]);
});
describe('it handles POST/PUT/PATCH callback', () => {
  errorTests.forEach((test) => {
    it(`${test.title}`, async () => {
      const data: SubmitDataType = {
        name: 'Doe',
        firstname: 'John',
      };
      const { findByTestId, getByText, queryByTestId } = render(
        <>
          <UseMutationWidget method={test.method} data={data} path={test.path} options={test.options} />
          <NotificationWidget />
        </>,
      );
      fireEvent.click(getByText('Submit'));
      if (test.error === true && !test.options?.onError) {
        // Error is displayed via a Notification Widget (default behavior)
        const notificationElement = await findByTestId('notifications-error-container');
        expect(notificationElement).toHaveTextContent('this is the error message');
        expect(queryByTestId('on-error')).toBeNull();
      } else if (test.error === true && test.options?.onError) {
        if (typeof test.options.onError === 'string') {
          await wait(() => {
            return window.location.href !== '';
          }, 100);
          const href = window.location.href;
          expect(href).toBeDefined();
          expect(href).toBe('/error');
        } else {
          await waitCallback(test.options?.onError as jest.Mock);
          expect(test.options?.onError).toHaveBeenCalled();
        }
      } else if (test.error === false && test.options?.onSuccess) {
        await act(async () => {
          if (typeof test.options?.onSuccess === 'string') {
            await wait(() => {
              return window.location.href !== '';
            }, 100);
            const href = window.location.href;
            expect(href).toBeDefined();
            expect(href).toBe('/success');
          } else {
            await waitCallback(test.options?.onSuccess as jest.Mock);
            expect(test.options?.onSuccess).toHaveBeenCalled();
          }
        });
      }
    });
  });
});
