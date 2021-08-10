import { AppSettings } from 'onekijs-next';

export default {
  routes: {
    // redirect to /login if non authenticated user
    // tries to access a secured page
    login: '/login',
  },
  idp: {
    default: {
      type: 'form',
      loginEndpoint: '/api/auth/login',
      logoutEndpoint: '/api/auth/logout',
      userinfoEndpoint: '/api/userinfo',
    },
  },
} as AppSettings;
