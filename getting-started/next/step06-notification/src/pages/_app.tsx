import { AppProps } from 'next/app';
import { NextApp } from 'onekijs';
import Head from 'next/head';
import React, { FC } from 'react';
import settings from '../settings';
import '../style.css';

const App: FC<AppProps> = (props) => {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <NextApp settings={settings} {...props} />
    </>
  );
};

export default App;
