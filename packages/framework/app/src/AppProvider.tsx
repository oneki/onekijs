import { DefaultAppContext, useLazyRef } from '@oneki/core';
import { detectLocale, flattenTranslations } from '@oneki/utils';
import React, { FC, useEffect, useMemo, useState } from 'react';
import BasicAppContext from './AppContext';
import AppErrorBoundary from './AppErrorBoundary';
import Container from './Container';
import ContainerContext from './ContainerContext';
import { AppProviderProps } from './typings';
import useGlobalProp from './useGlobalProp';

const AppProvider: FC<AppProviderProps> = ({
  settings,
  router,
  initialLocale,
  translations,
  i18nNs,
  services,
  children,
  store,
  ErrorBoundaryComponent,
}) => {
  const reduxLocale = useGlobalProp('i18n.locale');
  const [locale, setLocale] = useState<string | undefined>(
    detectLocale(router.location, reduxLocale, settings, initialLocale),
  );
  const container = useLazyRef<Container>(() => {
    const container = new Container();
    if (services) {
      services.forEach((service) => {
        container.addServiceClass(service);
      });
    }
    return container;
  });

  useMemo(() => router.init(settings), [router, settings]);

  const formattedTranslations = useMemo(() => {
    return flattenTranslations(translations || {});
  }, [translations]);

  const appContext: BasicAppContext = useMemo(() => {
    return new BasicAppContext(router, settings, store, {
      translations: formattedTranslations,
      ns: i18nNs,
      locale,
    });
  }, [router, settings, formattedTranslations, i18nNs, locale, store]);

  router.i18n = {
    translations: formattedTranslations,
    ns: i18nNs,
    locale,
  };

  useEffect(() => {
    setLocale(detectLocale(router.location, reduxLocale, settings, initialLocale));
    const unregister = router.listen((location, { settings }) => {
      setLocale(detectLocale(location, reduxLocale, settings, initialLocale));
    });
    return () => {
      unregister();
    };
  }, [router, reduxLocale, initialLocale, settings]);

  return (
    <ContainerContext.Provider value={container.current}>
      <DefaultAppContext.Provider value={appContext}>
        {ErrorBoundaryComponent && (
          <AppErrorBoundary ErrorBoundaryComponent={ErrorBoundaryComponent}>{children}</AppErrorBoundary>
        )}
        {!ErrorBoundaryComponent && children}
      </DefaultAppContext.Provider>
    </ContainerContext.Provider>
  );
};

export default AppProvider;
