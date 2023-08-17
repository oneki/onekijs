import { useLogin } from 'onekijs';
import React from 'react';

const ExternalLoginPage: React.FC = () => {

  // useLogin redirects the user to an external page so he can enter the username / password
  const [error] = useLogin('external'); // we want to use the configuration "idp.external" from settings.ts

  if (error) {
    return <div>Error: {error.payload.message}</div>
  }
  return null;
};

export default ExternalLoginPage;
