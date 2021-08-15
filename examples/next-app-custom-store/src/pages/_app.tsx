import { createReduxStore, NextApp, NextAppProps } from 'onekijs-next';
import React, { FC } from 'react';
import createSagaMiddleware from 'redux-saga';
import LoadingService from '../modules/core/LoadingService';
import settings from '../settings';

// Example of a Redux store created manually
// The store must be created via createReduxStore from Oneki.js
const initialState = {};
const store = createReduxStore(initialState, [createSagaMiddleware()]);

const MyApp: FC<NextAppProps> = (props) => {
  return <NextApp settings={settings} store={store} services={[LoadingService]} {...props} />;
};

export default MyApp;
