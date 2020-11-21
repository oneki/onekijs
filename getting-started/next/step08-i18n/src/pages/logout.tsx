import { useLogout, useTranslation } from 'onekijs-next';
import React, { FC } from 'react';

const LogoutPage: FC = () => {
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

export default LogoutPage;
