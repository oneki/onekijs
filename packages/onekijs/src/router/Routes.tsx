import { FCC, toLocation, useSettings } from 'onekijs-framework';
import React from 'react';
import { useLocation } from 'react-router';
import { Routes as ReactRouterRoutes } from 'react-router-dom';

const Routes: FCC = ({ children }) => {
  const location = useLocation();
  const settings = useSettings();
  const onekiLocation = toLocation(location.pathname, settings);
  const switchLocation = Object.assign({}, location, {
    pathname: onekiLocation.pathroute || '/',
  });
  // const locales = useSetting<string[]>('i18n.locales', []);
  // for (const locale of locales) {
  //   if (location.pathname.startsWith(`/${locale}/`) || location.pathname === `/${locale}`) {
  //     const i18nLocation = Object.assign({}, location, {
  //       pathname: location.pathname.substring(locale.length + 1),
  //     });
  //     return <ReactRouterSwitch location={i18nLocation}>{children}</ReactRouterSwitch>;
  //   }
  // }

  return <ReactRouterRoutes location={switchLocation}>{children}</ReactRouterRoutes>;
};

export default Routes;
