import { useLogin } from 'onekijs';
import React, { FC } from 'react';

const AuthPage: FC = React.memo(() => {
  useLogin('google');
  return null;
});

AuthPage.displayName = 'AuthPage';

export default AuthPage;
