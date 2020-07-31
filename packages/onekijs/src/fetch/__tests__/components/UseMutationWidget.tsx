import React, { FC } from 'react';
import useSetting from '../../../app/useSetting';
import { FetchOptions } from '../../typings';
import usePatch from '../../usePatch';
import { usePost } from '../../usePost';
import usePut from '../../usePut';

type UseMutationWidgetProps = {
  method: 'post' | 'put' | 'patch';
  data: SubmitDataType;
  path?: string;
  baseUrl?: string;
  options?: FetchOptions;
};

export type SubmitDataType = {
  name: string;
  firstname: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const textDisplay = (data: any) => `RESULT=${JSON.stringify(data)}`;

const UseMutationWidget: FC<UseMutationWidgetProps> = ({ method, data, path = '/echo', baseUrl, options }) => {
  // baseUrl is defined in settings.js
  const settingsBaseUrl = useSetting('server.baseUrl');
  baseUrl = baseUrl || settingsBaseUrl || 'http://localhost';

  // if (onError) {
  //   options = options || {};
  //   options.onError = (error) => {
  //     setError(error);
  //   };
  // }

  // if (onSuccess) {
  //   options = options || {};
  //   options.onSuccess = (response: SubmitDataType) => {
  //     setResponse(response);
  //   };
  // }
  /*const [post, loading] = usePost(`${baseUrl}/api/users`, {
    // if the ajax POST request is successful, redirect to the /users page
    onSuccess: "/users"
  });*/
  let hook = usePost;
  if (method === 'put') {
    hook = usePut;
  } else if (method === 'patch') {
    hook = usePatch;
  }

  const [submit, loading] = hook(`${baseUrl}${path}`, options);
  // console.log(method, path, data, options, loading);

  if (loading) return <div data-testid="loading">Loading ...</div>;
  return <button onClick={() => submit(data)}>Submit</button>;
};

export default UseMutationWidget;
