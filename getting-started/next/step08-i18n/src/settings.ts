import { AppSettings } from 'onekijs-next';

export default {
  i18n: {
    locales: [
      {
        locale: 'en',
        domain: 'oneki.dom',
      },
      {
        locale: 'fr',
        domain: 'fr.oneki.dom',
      },
    ], // supported locales
    defaultLocale: 'en',
    url: '/locales', // the URL to retrieves the JSON files with the translations
  },
  routes: {
    login: '/login',
  },
  idp: {
    default: {
      type: 'form',
      loginEndpoint: '/auth/login',
      logoutEndpoint: '/auth/logout',
      userinfoEndpoint: '/userinfo',
    },
  },
} as AppSettings;
