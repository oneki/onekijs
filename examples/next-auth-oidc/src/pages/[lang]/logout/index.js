import {
  useLogoutService,
  getI18nStaticProps,
  withI18nPaths,
} from 'onekijs-next';
import fs from 'fs';
import path from 'path';

import React from 'react';

export async function getStaticProps(context) {
  return getI18nStaticProps(fs, path, context.params.lang);
}

export async function getStaticPaths() {
  return {
    paths: withI18nPaths(fs, path),
    fallback: false,
  };
}

const LogoutPage = React.memo(() => {
  useLogoutService();
  return null;
});

LogoutPage.displayName = 'LogoutPage';

export default LogoutPage;
