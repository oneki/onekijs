import { useLogout, useTranslation } from 'onekijs';
import React from 'react';

const AuthLogoutPage: React.FC = () => {
  const [error, loading] = useLogout();
  const [T] = useTranslation();
  if (error)
    return (
      <div>
        <T>Error</T>: {JSON.stringify(error)}
      </div>
    );
  if (loading)
    return (
      <div>
        <T>Logging out</T> ...
      </div>
    );
  return null;
};

export default AuthLogoutPage;
