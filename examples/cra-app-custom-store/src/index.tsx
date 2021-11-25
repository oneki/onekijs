import { App, createReduxStore } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { LoadingService, LoadingState } from './LoadingService';
import { Main } from './Main';
import { settings } from './settings';

const initialState: LoadingState = { loading: false };
const store = createReduxStore(initialState, [createSagaMiddleware()]);

ReactDOM.render(
  <App settings={settings} store={store} services={[LoadingService]}>
    <Main />
  </App>,
  document.getElementById('root'),
);
