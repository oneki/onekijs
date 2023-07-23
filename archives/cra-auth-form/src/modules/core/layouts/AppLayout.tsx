import { Link, useSecurityContext } from 'onekijs';
import React from 'react';

const AppLayout: React.FC = ({ children }) => {
  // The security context is retrieved via a GET /userinfo (see src/settings.ts)
  // The API is implemented in file __server__/api/user.ts
  const [username, loading] = useSecurityContext('username');
  if (loading) return <div>Loading ...</div>;

  return (
    <div>
      {!username && (
        <div>
          <Link href="/login">Signin</Link>
        </div>
      )}
      {username && (
        <div>
          {username} | <Link href="/logout">Signout</Link>
        </div>
      )}
      <div style={{ margin: '20px 0px' }}>
        <Link href="/">Index</Link> | <Link href="/restricted">Restricted</Link> | <Link href="/admin">Admin</Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AppLayout;
