import React, { FC, useMemo } from 'react';
import Container from '../core/Container';
import ContainerContext from '../core/ContainerContext';
import useLazyRef from '../core/useLazyRef';
import { detectLocale } from '../i18n/utils';
import AppContext, { DefaultAppContext } from './AppContext';
import { AppProviderProps } from './typings';
import useGlobalSelector from './useGlobalSelector';

const AppProvider: FC<AppProviderProps> = ({
  settings,
  router,
  initialLocale,
  translations,
  i18nNs,
  services,
  children,
  store,
}) => {
  const reduxLocale = useGlobalSelector('i18n.locale');
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
