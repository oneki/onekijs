import { I18nLink, useSecurityContext } from 'onekijs-next';
import React from 'react';

const LoggedUser = () => {
  const [email, emailLoading] = useSecurityContext('email');

  if (emailLoading) return null;

  return (
    <div className="flex-grow text-right">
      {email && (
        <>
          <span className="mr-2 text-green-600">{email}</span>|
          <I18nLink href="/logout">
            <a className="ml-2 font-medium text-red-900">Logout</a>
          </I18nLink>
        </>
      )}
      {!email && (
        <>
          <I18nLink href="/login">
            <a className="font-medium text-green-600">Login</a>
          </I18nLink>
        </>
      )}
    </div>
  );
};

export default LoggedUser;
