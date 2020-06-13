import React, { useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useStore } from 'react-redux';
import { get } from '../utils/object';
import { detectLocale } from '../utils/i18n';
import { createReduxService } from '../service';
import { AppContext } from '../context';

export const AppProvider = ({ router, settings, initialLocale, translations, i18nNs, services, children }) => {
  const reduxLocale = useSelector(state => get(state, 'i18n.locale'));
  const store = useStore();

  const locale = useMemo(() => {
      return detectLocale(router.location, reduxLocale, settings, initialLocale);   
  }, [router.location, reduxLocale, settings, initialLocale]);

  const appContext = useMemo(() => {
    return {
      router,
      settings,
      i18n: {
        translations,
        ns: i18nNs,
        locale
      }
    }
  }, [router, settings, translations, i18nNs, locale]);

  router.i18n = {
    translations,
    ns: i18nNs,
    locale
  }

  const contextRef = useRef({});
  Object.assign(contextRef.current, appContext, { store });  

  useMemo(() => {
    services.forEach((service) => {
      createReduxService(service, contextRef.current);
    });
  }, [services])

  return (
    <AppContext.Provider value={appContext}>
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  router: PropTypes.object,
  settings: PropTypes.object,
  initialLocale: PropTypes.string,
  translations: PropTypes.object,
  i18nNs: PropTypes.arrayOf(PropTypes.string),
  services: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.element,
}
