import { secure } from 'onekijs';
import React, { FC } from 'react';

const Page: React.FC = () => {
  return <div>This page is reserved for the admin user</div>;
};

const validator = (securityContext: any): boolean => {
  return securityContext.roles && securityContext.roles.includes('admin');
};

const ErrorComponent: FC = () => {
  return <div style={{ color: 'red', fontWeight: 700 }}>You are not an admin user !</div>;
};

// Only an admin user can access this page
export const AdminPage = secure(Page, validator, {
  ErrorComponent,
});
