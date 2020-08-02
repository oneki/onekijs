import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { fireEvent, render } from '../../__tests__/customRenderer';
import { FetchOptions } from '../typings';
import UseMutationWidget, { SubmitDataType } from './components/UseMutationWidget';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { waitCallback } from '../../__tests__/utils/timeout';

type usePostPutPatchTestProps = {
  title: string;
  method: 'post' | 'put' | 'patch';
  baseUrl?: string;
  path?: string;
  options?: FetchOptions;
};

const tests: usePostPutPatchTestProps[] = [
  {
    title: 'does a POST returning error (default behavior)',
    method: 'post',
    path: '/error',
  },
  {
    title: 'does a POST returning error handled with onError',
    method: 'post',
    path: '/error',
    options: {
      onError: jest.fn(),
    },
  },
  {
    title: 'does a PUT returning error (default behavior)',
    method: 'put',
    path: '/error',
    options: {
      onSuccess: jest.fn(),
    },
  },
  {
    title: 'does a PUT returning error handled with onError',
    method: 'post',
    path: '/error',
    options: {
      onError: jest.fn(),
    },
  },
  {
    title: 'does a PATCH returning error (default behavior)',
    method: 'patch',
    path: '/error',
  },
  {
    title: 'does a PATCH returning error handled with onError',
    method: 'post',
    path: '/error',
    options: {
      onError: jest.fn(),
    },
  },
];

tests.forEach((test) => {
  it(`it ${test.title}`, async () => {
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
    if (!test.options?.onError) {
      // Error is displayed via a Notification Widget (default behavior)
      await findByTestId('notifications-error-container');
      const notificationElement = getByText('this is the error message');
      expect(notificationElement).toHaveTextContent('this is the error message');
      expect(queryByTestId('on-error')).toBeNull();
    } else {
      await waitCallback(test.options?.onError as jest.Mock);
      expect(test.options?.onError).toHaveBeenCalled();
    }
  });
});
