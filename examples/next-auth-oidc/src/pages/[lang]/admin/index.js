import React from 'react';
import Head from 'next/head';
import { secure, getI18nStaticProps, withI18nPaths } from 'onekijs-next';
import MainLayout from '../../../layout/mainLayout';
import { withLayout } from 'onekijs-next';
import fs from 'fs';
import path from 'path';

export async function getStaticProps(context) {
  return getI18nStaticProps(fs, path, context.params.lang);
}

export async function getStaticPaths() {
  return {
    paths: withI18nPaths(fs, path),
    fallback: false,
  };
}

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <h3>
        Congratulations! You have access to admin page because you are logged in
        !
      </h3>
    </>
  );
};

// export default secure(AdminPage);

export default secure(withLayout(AdminPage, MainLayout));
