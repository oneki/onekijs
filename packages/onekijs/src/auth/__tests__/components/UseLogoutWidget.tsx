import React, { FC, useRef } from 'react';
import { LogoutOptions } from '../../typings';
import useLogout from '../../useLogout';
import useSecurityContext from '../../useSecurityContext';

type LogoutProps = {
  idpName?: string;
  options?: LogoutOptions;
};

const UseLogoutWidget: FC<LogoutProps> = ({ options }) => {
  const [email] = useSecurityContext('email', 'not logged');
  const initRef = useRef(false); // wait for loading of tokens from localStorage to simulate that the user is logged in
  if (email !== 'not logged') initRef.current = true;
  return (
    <>
      <div data-testid="logged-user">{email}</div>
      {initRef.current && <LogoutWidget options={options} />}
    </>
  );
};

const LogoutWidget: FC<LogoutProps> = ({ options }) => {
  const [error] = useLogout(options);

  return <>{error && <div data-testid="error-container">{error.message || error.payload?.message}</div>}</>;
};

export default UseLogoutWidget;
