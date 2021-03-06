import React, { FC } from 'react';
import { LoginOptions } from '../../typings';
import useLogin from '../../useLogin';

type ExternalLoginProps = {
  idpName?: string;
  options?: LoginOptions;
};

const UseLoginWidget: FC<ExternalLoginProps> = ({ idpName, options }) => {
  const [error] = useLogin(idpName, options);

  return <>{error && <div data-testid="error-container">{error.message || error.payload?.message}</div>}</>;
};

export default UseLoginWidget;
