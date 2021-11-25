import { AppSettings, IdpSettings, AppContext, Location, DefaultBasicError } from 'onekijs';

export default {
  routes: {
    // redirect to /auth if non authenticated user
    // tries to access a secured page
    login: '/login',
  },
  idp: {
    default: {
      type: 'external',
      externalLoginEndpoint: '/login.html',
      loginCallbackRoute: '/login-callback',
      externalLogoutEndpoint: '/logout.html',
      logoutCallbackRoute: '/logout-callback',
      userinfoEndpoint: '/userinfo',
      callback: (response: Location, idp: IdpSettings, context: AppContext) => {
        const query = response.query || {};
        console.log('token', query.token);
        if (query.status && query.status === 'error') throw new DefaultBasicError('An error occured');
        return [query.token];
      },
    },
  },
} as AppSettings;
