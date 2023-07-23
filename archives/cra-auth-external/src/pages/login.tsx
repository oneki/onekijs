import { useLogin } from 'onekijs';
import React from 'react';

const LoginPage: React.FC = () => {
  const [error] = useLogin();

  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  return null;
};

export default LoginPage;
