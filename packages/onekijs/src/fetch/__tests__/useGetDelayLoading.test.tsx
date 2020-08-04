import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render } from '../../__tests__/customRenderer';
import { successResponse } from '../../__tests__/mocks/responses';
import UseGetWidget, { textDisplay } from './components/UseGetWidget';
import { UseGetOptions } from '../typings';
import NotificationWidget from '../../__tests__/components/NotificationWidget';

type useGetTestProps = {
  title: string;
  baseUrl?: string;
  path?: string;
  options?: UseGetOptions;
  serverDelay?: number;
};

const tests: useGetTestProps[] = [
  {
    title: 'does a simple GET',
    path: '/success',
    options: {
      delayLoading: 0,
    },
  },
  {
    title: 'should not display a loading indicator (default delayLoading)',
    path: '/success-with-delay',
    serverDelay: 10,
  },
  {
    title: 'should display a loading indicator (default delayLoading)',
    path: '/success-with-delay',
    serverDelay: 300,
  },
  {
    title: 'should not display a loading indicator (delayLoading = 100)',
    path: '/success-with-delay',
    options: {
      delayLoading: 100,
    },
    serverDelay: 10,
  },
  {
    title: 'should display a loading indicator (delayLoading = 50)',
    path: '/success-with-delay',
    options: {
      delayLoading: 50,
    },
    serverDelay: 100,
  },
];

tests.forEach((test) => {
  it(`it ${test.title}`, async () => {
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
