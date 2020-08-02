import React, { FC, useState } from 'react';
import BasicError from '../../../core/BasicError';
import { LoginOptions } from '../../typings';
import useLoginCallback from '../../useLoginCallback';

type ExternalLoginProps = {
  idpName?: string;
  options?: LoginOptions;
  onError?: boolean;
};

const UseLoginCallbackWidget: FC<ExternalLoginProps> = ({ idpName, options, onError }) => {
  const [errorFromOnError, setErrorFromOnError] = useState<BasicError>();
  const [error] = useLoginCallback(idpName, options);

  if (onError) {
    options = options || {};
    options.onError = (error) => {
      setErrorFromOnError(error);
    };
  }

  return (
    <>
      {error && <div data-test-id="error-container">{error.payload?.message}</div>}
      {errorFromOnError && <div data-test-id="on-error">{errorFromOnError.payload?.message}</div>}
    </>
  );
};

export default UseLoginCallbackWidget;
