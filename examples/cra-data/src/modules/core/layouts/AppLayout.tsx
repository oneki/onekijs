import { Link } from 'onekijs';
import React from 'react';

const AppLayout: React.FC = ({ children }) => {
  return (
    <div>
      <div style={{ margin: '20px 0px' }}>
        <Link href="/">Index</Link> | <Link href="/users">Users</Link> |{' '}
        <Link href="/users-on-error">Users (onError)</Link> |{' '}
        <Link href="/users-error-notification">Users (error notif)</Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AppLayout;
