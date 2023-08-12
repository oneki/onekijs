import { useLoginCallback } from 'onekijs';
import React from 'react';

/**
 * This page is called up by Google once the user has entered their identification details.
 * (redirect_uri in Open ID Connect)
 */
const LoginCallbackPage: React.FC = () => {
  // useLoginCallback calls the backend server to exchange the authorization code to a oauth token
  // By default, this token is saved in the global state
  const [error] = useLoginCallback('google');

  if (error) {
    return <div>Error: {error.payload.message}</div>
  }
  return null;
};

export default LoginCallbackPage;
