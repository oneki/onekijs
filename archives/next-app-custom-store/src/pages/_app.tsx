import { createReduxStore, NextApp, NextAppProps } from 'onekijs-next';
import React, { FC } from 'react';
import createSagaMiddleware from 'redux-saga';
import { LoadingService, LoadingState } from '../modules/core/services/LoadingService';
import { settings } from '../settings';

const MyApp: FC<NextAppProps> = (props) => {
  const initialState: LoadingState = { loading: false };
  const store = createReduxStore(initialState, [createSagaMiddleware()]);

  return <NextApp settings={settings} store={store} services={[LoadingService]} {...props} />;
};

export default MyApp;
