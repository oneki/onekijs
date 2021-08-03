import { AppProps } from 'next/app';
import { NextApp } from 'onekijs/next';
import Head from 'next/head';
import React, { FC } from 'react';
import '../style.css';

const App: FC<AppProps> = (props) => {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <NextApp {...props} />
    </>
  );
};

export default App;
