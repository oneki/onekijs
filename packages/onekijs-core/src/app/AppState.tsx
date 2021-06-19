import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { AppSettings, AppStore } from '../typings/app';
import { isPromise } from '../utils/type';
import AppProvider from './AppProvider';
import DefaultLoadingComponent from './DefaultLoadingComponent';
import { AppStateProps } from './typings';
import { createReduxStore, formatSettings } from './utils';

const AppState: FC<AppStateProps> = ({
  settings = {},
  store,
  initialState = {},
  router,
  initialLocale,
  translations,
  i18nNs,
  services,
  LoadingComponent = DefaultLoadingComponent,
  children,
  ErrorBoundaryComponent,
}) => {
  const [loading, setLoading] = useState(isPromise(initialState) || isPromise(settings));
  const [appSettings, setAppSettings] = useState(isPromise(settings) ? null : settings);
  const [appInitialState, setAppInitialState] = useState(isPromise(initialState) ? null : initialState);

  const appStore = useMemo(() => {
    if (!loading) {
      return store ? store : createReduxStore(appInitialState || {});
    }
    return;
  }, [loading, store, appInitialState]);

  const formattedSettings = useMemo(() => {
    if (appSettings) {
      return formatSettings(appSettings);
    }
    return;
  }, [appSettings]);

  // if (formattedSettings) {
  //   router.settings = formattedSettings;
  // }

  const initRef = useRef(false);

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      const promises = [
        {
          set: setAppSettings,
          promise: settings,
        },
        {
          set: setAppInitialState,
          promise: initialState,
        },
      ].filter((entry) => isPromise(entry.promise));
      if (promises.length > 0) {
        Promise.all(promises.map((entry) => entry.promise)).then(function (values) {
          values.forEach((v, i) => promises[i].set(v));
          setLoading(false);
        });
      }
    }
  }, [settings, initialState]);

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <Provider store={appStore as AppStore}>
      <AppProvider
        settings={formattedSettings as AppSettings}
        store={appStore as AppStore}
        router={router}
        initialLocale={initialLocale}
        translations={translations}
        i18nNs={i18nNs}
        services={services}
        ErrorBoundaryComponent={ErrorBoundaryComponent}
      >
        {children}
      </AppProvider>
    </Provider>
  );
};

export default AppState;
