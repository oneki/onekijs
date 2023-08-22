import { useLogin } from 'onekijs';
import React from 'react';

const GoogleLoginPage: React.FC = () => {
  // useLogin redirects the user to Google so he can enter the username / password
  // src/settings.ts looks like this
  //
  // const settings = {
  //   ...
  //   idp: {
  //     google: {
  //       type: 'oidc_server',  // Standard authorization code flow (authorization code exchanged by the backend server)
  //       clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID, // client id given by Google (from .env.local file)
  //       authorizeEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth', // useLogin redirects to this URL so the user can enter the username / password
  //       scope: 'openid email profile',
  //       ...
  //     },
  //   }
  // }

  // useLogin redirects the user to Google so he can enter the username / password
  const [error] = useLogin('google'); // we want to use the configuration "idp.google" from settings.ts

  if (error) {
    return <div>Error: {error.payload.message}</div>
  }
  return null;
};

export default GoogleLoginPage;
