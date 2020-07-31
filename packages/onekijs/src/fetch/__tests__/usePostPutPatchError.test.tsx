import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { fireEvent, render } from '../../__tests__/customRenderer';
import { FetchOptions } from '../typings';
import UseMutationWidget, { SubmitDataType } from './components/UseMutationWidget';
import NotificationWidget from '../../__tests__/components/NotificationWidget';

type usePostPutPatchTestProps = {
  title: string;
  method: 'post' | 'put' | 'patch';
  baseUrl?: string;
  path?: string;
  options?: FetchOptions;
  onError?: boolean;
  onSuccess?: boolean;
};

const tests: usePostPutPatchTestProps[] = [
  {
    title: 'does a POST returning error (default behavior)',
    method: 'post',
    path: '/error',
    onSuccess: true,
    onError: false,
  },
  {
    title: 'does a POST returning error handled with onError',
    method: 'post',
    path: '/error',
    onSuccess: true,
    onError: true,
  },
  {
    title: 'does a PUT returning error (default behavior)',
    method: 'put',
    path: '/error',
    onSuccess: true,
    onError: false,
  },
  {
    title: 'does a PUT returning error handled with onError',
    method: 'post',
    path: '/error',
    onSuccess: true,
    onError: true,
  },
  {
    title: 'does a PATCH returning error (default behavior)',
    method: 'patch',
    path: '/error',
    onSuccess: true,
    onError: false,
  },
  {
    title: 'does a PATCH returning error handled with onError',
    method: 'post',
    path: '/error',
    onSuccess: true,
    onError: true,
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
        <UseMutationWidget
          method={test.method}
          data={data}
          path={test.path}
          onSuccess={test.onSuccess}
          onError={test.onError}
        />
        <NotificationWidget />
      </>,
    );
    fireEvent.click(getByText('Submit'));
    if (!test.onError) {
      // Error is displayed via a Notification Widget (default behavior)
      await findByTestId('notifications-error-container');
    } else {
      // Error is displayed directly by the useGetWidget
      await findByTestId('on-error');
    }

    const notificationElement = getByText('this is the error message');
    expect(notificationElement).toHaveTextContent('this is the error message');
    if (!test.onError) {
      expect(queryByTestId('on-error')).toBeNull();
    } else {
      expect(queryByTestId('notifications-error-container')).toBeNull();
    }
  });
});
