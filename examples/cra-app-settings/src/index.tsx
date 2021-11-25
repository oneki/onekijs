import { App } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './Main';
import { settings } from './settings';

ReactDOM.render(
  <App settings={settings}>
    <Main />
  </App>,
  document.getElementById('root'),
);
