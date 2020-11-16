import { App } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './modules/core/components/ErrorBoundary';
import RootRouter from './pages/_router';
import settings from './settings';
import './style.css';
//import { worker } from './__server__';

// worker.start();

ReactDOM.render(
  <App settings={settings} ErrorBoundaryComponent={ErrorBoundary}>
    <RootRouter />
  </App>,
  document.getElementById('root'),
);
