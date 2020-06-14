import {
  useLoginService,
  getI18nStaticProps,
  withI18nPaths,
} from 'onekijs-next';
import React from 'react';
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

const ItsmeLoginPage = React.memo(() => {
  useLoginService('itsme');
  return null;
});

ItsmeLoginPage.displayName = 'ItsmeLoginPage';

export default ItsmeLoginPage;
