import { AppProps } from 'next/app';
import { NextApp } from 'onekijs-next';
// highlight-start
import { ClarityTheme } from 'onekijs-theme-clarity/next';
import 'onekijs-theme-clarity/font.css';
// highlight-end
import Head from 'next/head';
import React, { FC } from 'react';
import settings from '../settings';
import '../style.css';
import ErrorBoundary from '../modules/core/components/ErrorBoundary';

const App: FC<AppProps> = (props) => {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <NextApp settings={settings} ErrorBoundaryComponent={ErrorBoundary} Theme={ClarityTheme} {...props} />
    </>
  );
};

export default App;
