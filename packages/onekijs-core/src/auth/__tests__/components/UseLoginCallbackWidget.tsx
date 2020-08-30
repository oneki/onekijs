import React, { FC } from 'react';
import { LoginOptions } from '../../typings';
import useLoginCallback from '../../useLoginCallback';

type ExternalLoginProps = {
  idpName?: string;
  options?: LoginOptions;
  onError?: boolean;
};

const UseLoginCallbackWidget: FC<ExternalLoginProps> = ({ idpName, options }) => {
  const [error] = useLoginCallback(idpName, options);

  return <>{error && <div data-testid="error-container">{error.message || error.payload?.message}</div>}</>;
};

export default UseLoginCallbackWidget;
