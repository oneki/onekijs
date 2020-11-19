import { AppSettings } from 'onekijs';

export default {
  i18n: {
    locales: ['en', 'fr'],
    // locales: [
    //   {
    //     locale: 'fr',
    //     path: '/fr',
    //   },
    //   {
    //     locale: 'en',
    //   },
    // ], // supported locales
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
