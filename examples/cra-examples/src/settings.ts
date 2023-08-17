import { AppSettings } from 'onekijs';

export interface Settings extends AppSettings {
  foo: string;
}

const settings: Settings = {
  foo: 'bar',
  server: {
    baseUrl: 'https://examples.oneki.net/api'
  },
  i18n: {
    locales: ['en', 'fr'], // supported locales
    defaultLocale: 'en',
    url: '/locales', // the URL to retrieves the JSON files with the translations
  },
  routes: {
    login: '/auth/login',
    loginCallback: '/auth/login/callback',
    logout: '/auth/logout',
    logoutCallback: '/auth/logout/callback',
    home: '/',
  },
  idp: {
    default: {
      type: 'form',
      loginEndpoint: 'https://examples.oneki.net/api/auth/login',
      logoutEndpoint: 'https://examples.oneki.net/api/auth/logout',
      userinfoEndpoint: 'https://examples.oneki.net/api/auth/userinfo',
      callback: 'securityContext', // the body of the response is the profile of the user
    },
    external: {
      type: "external",
      externalLoginEndpoint: "https://examples.oneki.net/auth/external-login",
      userinfoEndpoint: "https://examples.oneki.net/api/auth/userinfo", 
    },
    google: {
      type: 'oidc_server',
      clientId: '519201240542-gk79ts8svme25ve4sfuoksjvdupv7fhe.apps.googleusercontent.com', // id given by the IDP. Example: 1eb5cq6p7d8dm8g4q9jk6qdvd8
      authorizeEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth', // a redirect is done to this relative URL, a absolute URL or a function returning a URL ((idp, context) => 'https://example.com/oauth2/authorize?.....'). If it's a relative URL, it's prefixed by the server.baseUrl. Example: https://auth.oneki.net/oauth2/authorize
      tokenEndpoint: 'https://examples.oneki.net/api/oauth2/google/token',
      userinfoEndpoint: 'https://examples.oneki.net/api/oauth2/google/userinfo', // can be token://<token_prop> or an URL or a function (idp, context) => { return {email: 'foo@example.com', roles: ['ADMIN']}}) returning the securityContext (can be a Promise). If not set, defaults to token://id_token if response_type contains id_token or token://access_token if repsonse_type contains only token
      externalLogoutEndpoint: 'https://examples.oneki.net/api/oauth2/google/logout', // a redirect is done to this relative URL, a absolute URL or a function returning a URL ((idp, context) => 'https://example.com/oauth2/logout?.....'). If it's a relative URL, it's prefixed by the server.baseUrl . Example: https://auth.oneki.net/logout
      scope: 'openid email profile',
      persist: 'localStorage', // by default, the access token is only stored in memory
    },
  }
}

export default settings;
