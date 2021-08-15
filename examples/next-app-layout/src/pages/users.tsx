import Head from 'next/head';
import { withLayout } from 'onekijs-next';
import React, { FC } from 'react';
import AppLayout from '../layout/AppLayout';

const UsersPage: FC = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div>This is the users page</div>
    </>
  );
};

export default withLayout(UsersPage, AppLayout);
