import React, { FC, useState } from 'react';
import useSetting from '../../../app/useSetting';
import BasicError from '../../../core/BasicError';
import NotificationWidget from '../../../notification/__tests__/helper/NotificationWidget';
import { FetchOptions } from '../../typings';
import usePatch from '../../usePatch';
import { usePost } from '../../usePost';
import usePut from '../../usePut';

type UsePostPutPatchWidgetProps = {
  method: 'post' | 'put' | 'patch';
  data: SubmitDataType;
  path?: string;
  baseUrl?: string;
  options?: FetchOptions;
  onError?: boolean;
  onSuccess?: boolean;
};

export type SubmitDataType = {
  name: string;
  firstname: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const textDisplay = (data: any) => `RESULT=${JSON.stringify(data)}`;

const UsePostPutPatchWidget: FC<UsePostPutPatchWidgetProps> = ({
  method,
  data,
  path = '',
  baseUrl,
  options,
  onError,
  onSuccess,
}) => {
  const [error, setError] = useState<BasicError>();
  const [response, setResponse] = useState<SubmitDataType>();
  // baseUrl is defined in settings.js
  const settingsBaseUrl = useSetting('server.baseUrl');
  baseUrl = baseUrl || settingsBaseUrl || 'http://localhost';

  if (onError) {
    options = options || {};
    options.onError = (error) => {
      setError(error);
    };
  }

  if (onSuccess) {
    options = options || {};
    options.onSuccess = (response: SubmitDataType) => {
      setResponse(response);
    };
  }
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

  if (loading) return <div data-testid="loading">Loading ...</div>;
  return (
    <>
      {error && <div data-testid="on-error">{error.payload.message}</div>}
      <NotificationWidget />
      <button onClick={() => submit(data)}>Submit</button>
      {response && (
        <>
          <span data-testid="use-result">{textDisplay(response)}</span>
        </>
      )}
    </>
  );
};

export default UsePostPutPatchWidget;
