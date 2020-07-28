import { createBrowserHistory, createHashHistory, createMemoryHistory } from 'history';
import React, { FC, Suspense, useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { formatSettings, createReduxStore } from '../lib/app/utils';
import BasicError from '../lib/core/BasicError';
import { get } from '../lib/core/utils/object';
import { isPromise } from '../lib/core/utils/type';
import AppRouter from '../lib/app/AppRouter';
import { ReactRouter } from './ReactRouter';
import { CraAppProps } from './typings';
import DefaultLoadingComponent from '../lib/app/DefaultLoadingComponent';
import AppProvider from '../lib/app/AppProvider';

let init = false;

export const App: FC<CraAppProps> = React.memo(
  ({
    settings = {},
    store,
    initialState = {},
    services = [],
    LoadingComponent = DefaultLoadingComponent,
    history,
    children,
    initialLocale,
    translations,
    i18nNs,
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
      return null;
    }, [appSettings]);

    if (!loading) {
      if (!history) {
        const routerType = get(formattedSettings, 'router.type');
        switch (routerType) {
          case 'browser':
            history = createBrowserHistory(formattedSettings?.router);
            break;
          case 'hash':
            history = createHashHistory(formattedSettings?.router);
            break;
          case 'memory':
            history = createMemoryHistory(formattedSettings?.router);
            break;
          default:
            throw new BasicError(`Unknown router type ${routerType}`);
        }
      }
    }

    const router: AppRouter | null = useMemo(() => {
      if (!loading) {
        return new ReactRouter(history);
      }
      return new ReactRouter();
    }, [loading, history]);

    if (formattedSettings) {
      router.settings = formattedSettings;
    }

    useEffect(() => {
      if (!init) {
        init = true;
        // TODO call initialState and/or settings
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

    if (loading || !appStore || !history) {
      return <LoadingComponent />;
    }

    init = true;

    return (
      <Provider store={appStore}>
        <AppProvider
          router={router}
          settings={formattedSettings || {}}
          initialLocale={initialLocale}
          translations={translations}
          i18nNs={i18nNs || []}
          services={services}
        >
          <Router history={history}>
            <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
          </Router>
        </AppProvider>
      </Provider>
    );
  },
);

App.displayName = 'App';
