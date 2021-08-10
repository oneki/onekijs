import { AppProps } from 'next/app';
import { NextApp } from 'onekijs-next';
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
      <NextApp settings={settings} ErrorBoundaryComponent={ErrorBoundary} {...props} />
    </>
  );
};

export default App;
