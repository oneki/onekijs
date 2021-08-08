import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FC } from 'react';
import '../style.css';

// This default export is required in a new `pages/_app.js` file.
const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
