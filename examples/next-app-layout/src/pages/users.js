import React from 'react'
import Head from "next/head";
import { withLayout } from 'onekijs-next';
import SiteLayout from '../layout/siteLayout';

const UsersPage = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div>This is the users page</div>
    </>
  );
}

export default withLayout(UsersPage, SiteLayout);
