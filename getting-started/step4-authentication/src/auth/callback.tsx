import { useLoginCallbackService } from 'onekijs';
import React, { FC } from 'react';

const AuthCallbackPage: FC = React.memo(() => {
  const [error] = useLoginCallbackService('google');
  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return null;
});

AuthCallbackPage.displayName = 'AuthCallbackPage';

export default AuthCallbackPage;
