import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render, fireEvent } from '../../__tests__/customRenderer';
import UseMutationWidget, { SubmitDataType, textDisplay } from './components/UseMutationWidget';
import { FetchOptions } from '../typings';
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
    title: 'does a simple POST with onSuccess',
    method: 'post',
    path: '/echo',
    onSuccess: true,
  },
  {
    title: 'does a simple PUT with onSuccess',
    method: 'put',
    path: '/echo',
    onSuccess: true,
  },
  {
    title: 'does a simple PATCH with onSuccess',
    method: 'patch',
    path: '/echo',
    onSuccess: true,
  },
];

tests.forEach((test) => {
  it(`it ${test.title}`, async () => {
    const data: SubmitDataType = {
      name: 'Doe',
      firstname: 'John',
    };
    const { getByTestId, findByTestId, getByText } = render(
      <>
        <UseMutationWidget method={test.method} data={data} path={test.path} onSuccess={test.onSuccess} />
        <NotificationWidget />
      </>,
    );
    fireEvent.click(getByText('Submit'));
    await findByTestId('use-result');
    const resultElement = getByTestId('use-result');
    expect(resultElement).toHaveTextContent(textDisplay(data));
  });
});
