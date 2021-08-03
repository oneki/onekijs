import { App } from 'onekijs/cra';
import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from './pages/_router';
import './style.css';

ReactDOM.render(
  <App>
    {/* The routes are defined in the file src/@router.tsx */}
    <RootRouter />
  </App>,
  document.getElementById('root'),
);
