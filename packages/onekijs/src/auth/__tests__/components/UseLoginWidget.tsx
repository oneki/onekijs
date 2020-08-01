import React, { FC } from 'react';
import { LoginOptions } from '../../typings';
import useLogin from '../../useLogin';

type ExternalLoginProps = {
  idpName?: string;
  options?: LoginOptions;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const textDisplay = (data: any) => `RESULT=${JSON.stringify(data)}`;

const UseLoginWidget: FC<ExternalLoginProps> = ({ idpName, options }) => {
  const [error] = useLogin(idpName, options);

  return <>{error && <div data-test-id="error-container">{error.payload.message}</div>}</>;
};

export default UseLoginWidget;
