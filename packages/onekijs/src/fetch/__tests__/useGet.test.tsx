import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { render } from '../../__tests__/customRenderer';
import { successResponse } from '../../__tests__/mocks/responses';
import { wait, waitCallback } from '../../__tests__/utils/timeout';
import { UseGetOptions } from '../typings';
import UseGetWidget, { textDisplay } from './components/UseGetWidget';

type useGetTestProps = {
  title: string;
  baseUrl?: string;
  path?: string;
  expected?: string;
  options?: UseGetOptions;
  serverDelay?: number;
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

const basicTests: useGetTestProps[] = [
  {
    title: 'simple GET',
    path: '/success',
    expected: textDisplay(successResponse),
  },
  {
    title: 'GET with params',
    baseUrl: 'http://localhost',
    path: '/echo/1?x=1',
    expected: textDisplay({ result: 'http://localhost/echo/1?x=1' }),
  },
];

describe('it does a GET', () => {
  basicTests.forEach((test) => {
    it(`${test.title}`, async () => {
      const { findByTestId } = render(
        <>
          <UseGetWidget path={test.path} baseUrl={test.baseUrl} />
          <NotificationWidget />
        </>,
      );

      const resultElement = await findByTestId('use-get-result');
      expect(resultElement).toHaveTextContent(test.expected as string);
    });
  });
});

const delayTests: useGetTestProps[] = [
  {
    title: '0 ms delay loading (loading indicator)',
    path: '/success',
    options: {
      delayLoading: 0,
    },
  },
  {
    title: 'default delay loading and 10 ms server delay (no loading indicator)',
    path: '/success-with-delay',
    serverDelay: 10,
  },
  {
    title: 'default delay loading and 300 ms server delay (loading indicator)',
    path: '/success-with-delay',
    serverDelay: 300,
  },
  {
    title: '100 ms delay loading and 10 ms server delay (no loading indicator)',
    path: '/success-with-delay',
    options: {
      delayLoading: 100,
    },
    serverDelay: 10,
  },
  {
    title: '50 ms delay loading and 100 ms server delay (loading indicator)',
    path: '/success-with-delay',
    options: {
      delayLoading: 50,
    },
    serverDelay: 100,
  },
];

describe('it delays GET fetching', () => {
  delayTests.forEach((test) => {
    it(`${test.title}`, async () => {
      const serverDelay = test.serverDelay || 0;
      const loadingDelay = test.options?.delayLoading ?? 200;
      if (test.serverDelay) test.path = `${test.path}?delay=${serverDelay}`;
      const { findByText, getByTestId, findByTestId } = render(
        <>
          <UseGetWidget baseUrl={test.baseUrl} path={test.path} options={test.options} />
          <NotificationWidget />
        </>,
      );
      if (loadingDelay < serverDelay) {
        // check that the loading indicator is correctly displayed
        await findByText('Loading ...');
      }
      await findByTestId('use-get-result');
      const notificationElement = getByTestId('use-get-result');
      expect(notificationElement).toHaveTextContent(textDisplay(successResponse));
    });
  });
});

const errorTests: useGetTestProps[] = [
  {
    title: 'Error via onError callback',
    path: '/error',
    options: {
      onError: jest.fn(),
    },
  },
  {
    title: 'Error via onError url',
    path: '/error',
    options: {
      onError: '/error',
    },
  },
  {
    title: 'Error via notification center',
    path: '/error',
  },
];
describe('it handles GET callback', () => {
  errorTests.forEach((test) => {
    it(`it ${test.title}`, async () => {
      const onError = test.options?.onError;
      const { getByText, findByTestId } = render(
        <>
          <UseGetWidget baseUrl={test.baseUrl} path={test.path} options={test.options} />
          <NotificationWidget />
        </>,
      );
      if (!onError) {
        // Error is displayed via the Notification Widget (default behavior)
        await findByTestId('notifications-error-container');
        const notificationElement = getByText('this is the error message');
        expect(notificationElement).toHaveTextContent('this is the error message');
      } else {
        if (typeof onError === 'string') {
          await wait(() => {
            return window.location.href !== '';
          }, 100);

          const href = window.location.href;
          expect(href).toBeDefined();
          expect(href).toBe('/error');
        } else {
          await waitCallback(onError as jest.Mock);
          expect(onError).toHaveBeenCalled();
        }
      }
    });
  });
});
