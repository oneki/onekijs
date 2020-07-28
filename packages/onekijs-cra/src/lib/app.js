import { createBrowserHistory, createHashHistory, createMemoryHistory } from 'history';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import ReactRouter from './router';
import {
  createReduxStore,
  DefaultLoadingComponent,
  formatSettings,
  detectLocale,
  get,
  isPromise,
  AppProvider,
} from 'onekijs-core';

let init = false;
const i18n = {
  translations: {},
  ns: [],
};
export const App = React.memo(
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
        return store ? store : createReduxStore(appInitialState);
      }
    }, [loading, store, appInitialState]);

    const formattedSettings = useMemo(() => {
      return formatSettings(appSettings);
    }, [appSettings]);

    if (!loading) {
      if (!history) {
        const routerType = get(formattedSettings, 'router.type');
        switch (routerType) {
          case 'browser':
            history = createBrowserHistory(formattedSettings.router);
            break;
          case 'hash':
            history = createHashHistory(formattedSettings.router);
            break;
          case 'memory':
            history = createMemoryHistory(formattedSettings.router);
            break;
          default:
            throw Error(`Unknown router type ${routerType}`);
        }
      }
    }

    const router = useMemo(() => {
      if (!loading) {
        return new ReactRouter(history);
      }
    }, [loading, history]);
    router.settings = formattedSettings;
    router.i18n = i18n;

    const locale = useMemo(() => {
      if (!loading) {
        return detectLocale(router.location, appStore, formattedSettings);
      }
    }, [loading, router.location, appStore, formattedSettings]);
    i18n.locale = locale;

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

    if (loading) {
      return <LoadingComponent />;
    }

    init = true;

    return (
      <Provider store={appStore}>
        <AppProvider
          router={router}
          settings={formattedSettings}
          initialLocale={initialLocale}
          translations={translations}
          i18nNs={i18nNs}
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
App.propTypes = {
  settings: PropTypes.object,
  store: PropTypes.object,
  initialState: PropTypes.object,
  services: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.object,
  LoadingComponent: PropTypes.elementType,
  history: PropTypes.object,
  children: PropTypes.element,
  initialLocale: PropTypes.string,
  translations: PropTypes.object,
  i18nNs: PropTypes.arrayOf(PropTypes.string),
};

// const AppProvider = ({ router, settings, initialLocale, translations, i18nNs, services, children }) => {
//   const reduxLocale = useSelector(state => get(state, 'i18n.locale'));
//   const store = useStore();

//   console.log("store", store);

//   const locale = useMemo(() => {
//       return detectLocale(router.location, reduxLocale, settings, initialLocale);
//   }, [router.location, reduxLocale, settings, initialLocale]);

//   const appContext = useMemo(() => {
//     return {
//       router,
//       settings,
//       i18n: {
//         translations,
//         ns: i18nNs,
//         locale
//       }
//     }
//   }, [router, settings, translations, i18nNs, locale]);

//   const context = useMemo(()=> {
//     return {}
//   }, []);
//   Object.assign(context, appContext, { store });

//   useMemo(() => {
//     services.forEach((service) => {
//       createReduxService(service, context);
//     });
//   }, [services, context])

//   return (
//     <AppContext.Provider value={appContext}>
//       {children}
//     </AppContext.Provider>
//   )
// }
