import React, { FC, useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import Container from '../core/Container';
import ContainerContext from '../core/ContainerContext';
import useLazyRef from '../core/useLazyRef';
import { get } from '../core/utils/object';
import { detectLocale } from '../i18n/utils';
import { AppProviderProps, AppStore } from './typings';
import AppContext, { DefaultAppContext } from './AppContext';

const AppProvider: FC<AppProviderProps> = ({
  router,
  settings,
  initialLocale,
  translations,
  i18nNs,
  services,
  children,
}) => {
  const reduxLocale = useSelector((state) => get(state, 'i18n.locale'));
  const store = useStore() as AppStore;
  const container = useLazyRef<Container>(() => {
    const container = new Container();
    services.forEach((service) => {
      container.addServiceClass(service);
    });
    return container;
  });

  const locale = useMemo(() => {
    return detectLocale(router.location, reduxLocale, settings, initialLocale);
  }, [router.location, reduxLocale, settings, initialLocale]);

  const appContext: AppContext = useMemo(() => {
    return new AppContext(router, settings, store, {
      translations,
      ns: i18nNs,
      locale,
    });
  }, [router, settings, translations, i18nNs, locale, store]);

  router.i18n = {
    translations,
    ns: i18nNs,
    locale,
  };

  return (
    <ContainerContext.Provider value={container.current}>
      <DefaultAppContext.Provider value={appContext}>{children}</DefaultAppContext.Provider>
    </ContainerContext.Provider>
  );
};

export default AppProvider;
