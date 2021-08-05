import React, { FC } from 'react';
import { useLocation } from 'react-router';
import { Switch as ReactRouterSwitch } from 'react-router-dom';
import useSettings from '../../../app/useSettings';
import { toLocation } from '../../../router/utils';

const Switch: FC = ({ children }) => {
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

  return <ReactRouterSwitch location={switchLocation}>{children}</ReactRouterSwitch>;
};

export default Switch;
