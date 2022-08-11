import { App } from 'onekijs';
import { createRoot } from 'react-dom/client';
import RootRouter from './pages/_router';
import './style.css';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <App>
    {/* The routes are defined in the file src/@router.tsx */}
    <RootRouter />
  </App>,
);
