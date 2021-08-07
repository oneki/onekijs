import { AppProps } from 'next/app';
import { App } from 'onekijs-next';
import React, { FC } from 'react';
import settings from '../settings';

// if (typeof window !== 'undefined') {
//   const worker = setupWorker(...authHandlers(), ...userHandlers(), ...cartHandlers());
//   worker.start();
// }

const MyApp: FC<AppProps> = (props) => {
  return <App settings={settings} {...props} />;
};

export default MyApp;
