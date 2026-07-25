import { App, createReduxStore } from 'onekijs';
import { createRoot } from 'react-dom/client';
import createSagaMiddleware from 'redux-saga';
import { LoadingService, LoadingState } from './LoadingService';
import { Main } from './Main';
import { AppSettings } from 'onekijs';

interface Settings extends AppSettings {
  loadingDelay: number;
}
export const settings: Settings = {
  loadingDelay: 1500,
};

const initialState: LoadingState = { loading: false };
const store = createReduxStore(initialState, [createSagaMiddleware()]);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('The root element is missing.');
}

createRoot(rootElement).render(
  <App settings={settings} store={store} services={[LoadingService]}>
    <Main />
  </App>,
);
