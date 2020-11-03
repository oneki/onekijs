import { IdpSettings, AppSettings } from 'onekijs';

const googleSettings: IdpSettings = {
  type: 'oidc_server',
  clientId: '519201240542-gk79ts8svme25ve4sfuoksjvdupv7fhe.apps.googleusercontent.com', // id given by Google
  authorizeEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth', // URL given by Google. Will be called by the client
  tokenEndpoint: '/oauth2/token?idp=google', // URL of a service exposed by your server that exchanges the authorization code for an access token by calling the Google /token endpoint
  userinfoEndpoint: '/userinfo', // URL of a service exposed by your server that returns the details about the logged-in user
  logoutEndpoint: '/oauth2/logout', // URL exposed by your server which call the IDP logout URL and then removes the cookie
  scope: 'openid email', // ask to Google only the email of the user
};

export default {
  routes: {
    login: '/auth',
  },
  idp: {
    google: googleSettings,
  },
} as AppSettings;
