import { useLogoutCallback } from 'onekijs';
import React from 'react';

const CallbackPage: React.FC = () => {

  const [error] = useLogoutCallback();

  if (error) {
    return <div>Error: {error.payload.message}</div>
  }
  return null;
};

export default CallbackPage;
