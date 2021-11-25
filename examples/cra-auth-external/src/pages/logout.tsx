import { useLogout } from 'onekijs';
import React from 'react';

const LogoutPage: React.FC = () => {
  const [error] = useLogout();

  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  return null;
};

export default LogoutPage;
