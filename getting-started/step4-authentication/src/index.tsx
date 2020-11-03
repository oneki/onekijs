import { App } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './@layouts/AppLayout';
import MainRouter from './@router';
import './style.css';
import settings from './settings';

ReactDOM.render(
  <App settings={settings}>
    {/* AppLayout is a layout common to all pages */}
    <AppLayout>
      {/* The routes are defined in the file src/@router.tsx */}
      <MainRouter />
    </AppLayout>
  </App>,
  document.getElementById('root'),
);
