import { Link } from 'onekijs';
import React from 'react';

const AppLayout: React.FC = ({ children }) => {
  return (
    <div>
      <div style={{ margin: '20px 0px' }}>
        <Link href="/">Index</Link> | <Link href="/users">Users</Link> | <Link href="/users-delay">Users (delay)</Link>{' '}
        | <Link href="/users-cache">Users (cache)</Link> | <Link href="/users-polling">Users (polling)</Link> |{' '}
        <Link href="/users-on-error">Users (onError)</Link> |{' '}
        <Link href="/users-error-notification">Users (error notif)</Link> | <Link href="/create-user">Create user</Link>{' '}
        | <Link href="/create-user-form">Create user (form)</Link> |{' '}
        <Link href="/create-user-success-redirect">Create user (redirect)</Link> |{' '}
        <Link href="/edit-user/1">Edit user (redirect)</Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AppLayout;
