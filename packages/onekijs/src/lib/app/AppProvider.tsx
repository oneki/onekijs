import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import Container from '../core/Container';
import ContainerContext from '../core/ContainerContext';
import useLazyRef from '../core/useLazyRef';
import { get } from '../core/utils/object';
import { isPromise } from '../core/utils/type';
import { detectLocale } from '../i18n/utils';
import AppContext, { DefaultAppContext } from './AppContext';
import DefaultLoadingComponent from './DefaultLoadingComponent';
import { AppProviderProps } from './typings';
import { createReduxStore, formatSettings } from './utils';

const AppProvider: FC<AppProviderProps> = ({
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

  if (formattedSettings) {
    router.settings = formattedSettings;
  }

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

  const reduxLocale = appStore ? get(appStore.getState(), 'i18n.locale') : undefined;
  const container = useLazyRef<Container>(() => {
    const container = new Container();
    if (services) {
      services.forEach((service) => {
        container.addServiceClass(service);
      });
    }
    return container;
  });

  const locale = useMemo(() => {
    return detectLocale(router.location, reduxLocale, formattedSettings, initialLocale);
  }, [router.location, reduxLocale, formattedSettings, initialLocale]);

  const appContext: AppContext | undefined = useMemo(() => {
    if (formattedSettings && appStore) {
      return new AppContext(router, formattedSettings, appStore, {
        translations,
        ns: i18nNs,
        locale,
      });
    }
    return;
  }, [router, formattedSettings, translations, i18nNs, locale, appStore]);

  router.i18n = {
    translations,
    ns: i18nNs,
    locale,
  };

  if (loading || !appContext || !appStore) {
    console.log(loading, appContext, appStore);
    return <LoadingComponent />;
  }

  return (
    <Provider store={appStore}>
      <ContainerContext.Provider value={container.current}>
        <DefaultAppContext.Provider value={appContext}>{children}</DefaultAppContext.Provider>
      </ContainerContext.Provider>
    </Provider>
  );
};

export default AppProvider;
