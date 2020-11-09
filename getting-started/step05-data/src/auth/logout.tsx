import { useLogout } from 'onekijs';
import React, { FC } from 'react';

const AuthLogoutPage: FC = () => {
  const [error, loading] = useLogout();

  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  if (loading) return <div>Logging out ...</div>;
  return null;
};

export default AuthLogoutPage;
