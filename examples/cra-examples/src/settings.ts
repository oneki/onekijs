import { AppSettings } from 'onekijs';

export interface Settings extends AppSettings {
  foo: string;
}

const settings: Settings = {
  foo: 'bar',
  i18n: {
    locales: ['en', 'fr'], // supported locales
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
  }
}

export default settings;
