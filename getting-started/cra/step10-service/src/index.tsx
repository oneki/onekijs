import { App } from 'onekijs';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './modules/core/components/ErrorBoundary';
import RootRouter from './pages/_router';
import settings from './settings';
import './style.css';
import { worker } from './__server__';

worker.start();

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <App settings={settings} ErrorBoundaryComponent={ErrorBoundary}>
    <RootRouter />
  </App>,
);
