import Link from 'next/link';
import { useSecurityContext } from 'onekijs-next';
import React from 'react';

const LoggedUser = () => {
  const [email, emailLoading] = useSecurityContext('email');

  if (emailLoading) return null;

  return (
    <div className="flex-grow text-right">
      {email && (
        <>
          <span className="mr-2 text-green-600">{email}</span>|
          <Link href="/logout">
            <a className="ml-2 font-medium text-red-900">Logout</a>
          </Link>
        </>
      )}
      {!email && (
        <>
          <Link href="/login">
            <a className="font-medium text-green-600">Login</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default LoggedUser;
