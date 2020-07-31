import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render } from '../../__tests__/customRenderer';
import { GetOptions } from '../typings';
import UseGetWidget from './components/UseGetWidget';
import NotificationWidget from '../../__tests__/components/NotificationWidget';

type useGetTestProps = {
  title: string;
  baseUrl?: string;
  path?: string;
  options?: GetOptions;
  onError?: boolean;
};

const tests: useGetTestProps[] = [
  {
    title: 'renders a GET error notification by default',
    path: '/error',
  },
  {
    title: 'calls a GET onError callback',
    path: '/error',
    onError: true,
  },
];

tests.forEach((test) => {
  it(`it ${test.title}`, async () => {
    const { getByText, findByTestId } = render(
      <>
        <UseGetWidget baseUrl={test.baseUrl} path={test.path} options={test.options} onError={test.onError} />
        <NotificationWidget />
      </>,
    );
    if (!test.onError) {
      // Error is displayed via the Notification Widget (default behavior)
      await findByTestId('notifications-error-container');
    } else {
      // Error is displayed by the useGetWidget directly
      await findByTestId('use-get-on-error');
    }

    const notificationElement = getByText('this is the error message');
    expect(notificationElement).toHaveTextContent('this is the error message');
  });
});
