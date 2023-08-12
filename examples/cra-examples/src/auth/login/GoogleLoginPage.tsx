import { useLogin } from 'onekijs';
import React from 'react';

const GoogleLoginPage: React.FC = () => {
  // useLogin provides a 'submit' method that sends the credentials
  // to a backend server. The URL/path of the backend server is
  // configured in src/settings.ts like this
  // const settings = {
  //   ...
  //   idp: {
  //     google: {
  //       // Standard authorization code flow (authorization code exchanged by the backend server)
  //       type: 'oidc_server', 

  //       // client id given by Google (from .env.local file)
  //       clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID, 

  //       // useLogin redirects to this URL so the user can enter the username / password
  //       authorizeEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  //       tokenEndpoint: '/api/oauth2/google/token',

  //       // URL for retrieving logged-in user data
  //       userinfoEndpoint: 'https://accounts.google.com/.well-known/openid-configuration?scope=openid%20profile%20email', 
  //       logoutEndpoint: '/api/oauth2/google/logout',
  //       scope: 'openid email profile',
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
