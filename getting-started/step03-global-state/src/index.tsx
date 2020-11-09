import { App } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from './pages/@router';
import './style.css';

ReactDOM.render(
  <App>
    {/* The routes are defined in the file src/@router.tsx */}
    <RootRouter />
  </App>,
  document.getElementById('root'),
);
