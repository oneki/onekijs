import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { fireEvent, render } from '../../__tests__/customRenderer';
import { waitCallback } from '../../__tests__/utils/timeout';
import { FetchOptions } from '../typings';
import UseMutationWidget, { SubmitDataType } from './components/UseMutationWidget';
import { act } from 'react-dom/test-utils';

type usePostPutPatchTestProps = {
  title: string;
  method: 'post' | 'put' | 'patch';
  baseUrl?: string;
  path: string;
  options?: FetchOptions;
  onError?: boolean;
  onSuccess?: boolean;
};

const tests: usePostPutPatchTestProps[] = [
  {
    title: 'does a simple POST with onSuccess',
    method: 'post',
    path: '/echo',
    options: {
      onSuccess: jest.fn(),
    },
  },
  {
    title: 'does a simple PUT with onSuccess',
    method: 'put',
    path: '/echo',
    options: {
      onSuccess: jest.fn(),
    },
  },
  {
    title: 'does a simple PATCH with onSuccess',
    method: 'patch',
    path: '/echo',
    options: {
      onSuccess: jest.fn(),
    },
  },
];

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
