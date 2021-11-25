import { useLogoutCallbackService } from 'onekijs';
import React from 'react';

const LoginPage: React.FC = () => {
  const [error] = useLogoutCallbackService();

  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  return null;
};

export default LoginPage;
