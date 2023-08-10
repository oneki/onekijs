import { App } from 'onekijs';
import { createRoot } from 'react-dom/client';
import RootRouter from './router';
import settings from './settings';
// import { worker } from './__server__';

// worker.start();

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <App settings={settings}>
    <RootRouter />
  </App>,
);