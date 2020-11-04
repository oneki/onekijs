import { AppSettings } from 'onekijs';

export default {
  routes: {
    // redirect to /auth if non authenticated user
    // tries to access a secured page
    login: '/auth',
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
