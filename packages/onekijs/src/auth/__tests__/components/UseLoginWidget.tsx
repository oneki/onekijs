import React, { FC, useState } from 'react';
import BasicError from '../../../core/BasicError';
import { LoginOptions } from '../../typings';
import useLogin from '../../useLogin';

type ExternalLoginProps = {
  idpName?: string;
  options?: LoginOptions;
  onError?: boolean;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const textDisplay = (data: any) => `RESULT=${JSON.stringify(data)}`;

const UseLoginWidget: FC<ExternalLoginProps> = ({ idpName, options, onError }) => {
  const [errorFromOnError, setErrorFromOnError] = useState<BasicError>();
  const [error] = useLogin(idpName, options);

  if (onError) {
    options = options || {};
    options.onError = (error) => {
      setErrorFromOnError(error);
    };
  }

  return (
    <>
      {error && <div data-test-id="error-container">{error.payload.message}</div>}
      {errorFromOnError && <div data-test-id="on-error">{errorFromOnError.payload.message}</div>}
    </>
  );
};

export default UseLoginWidget;
