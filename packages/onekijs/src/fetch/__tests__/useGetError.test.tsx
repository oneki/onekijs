import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { render } from '../../__tests__/customRenderer';
import { waitCallback } from '../../__tests__/utils/timeout';
import { GetOptions } from '../typings';
import UseGetWidget from './components/UseGetWidget';

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
    options: {
      onError: jest.fn(),
    },
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
        <UseGetWidget baseUrl={test.baseUrl} path={test.path} options={test.options} />
        <NotificationWidget />
      </>,
    );
    if (!test.options?.onError) {
      // Error is displayed via the Notification Widget (default behavior)
      await findByTestId('notifications-error-container');
      const notificationElement = getByText('this is the error message');
      expect(notificationElement).toHaveTextContent('this is the error message');
    } else {
      await waitCallback(test.options?.onError as jest.Mock);
      expect(test.options.onError).toHaveBeenCalled();
    }
  });
});
