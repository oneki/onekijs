import { App } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from './pages/_router';
import settings from './settings';
import './style.css';
import { worker } from './__server__';

worker.resetHandlers();
worker.start();

ReactDOM.render(
  <App settings={settings}>
    <RootRouter />
  </App>,
  document.getElementById('root'),
);
