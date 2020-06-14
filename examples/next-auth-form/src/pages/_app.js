import { App } from 'onekijs-next';
import React from 'react';
import '../css/tailwind.css';
import settings from '../settings';

const MyApp = props => {
  return <App {...props} settings={settings} />;
};

export default MyApp;
