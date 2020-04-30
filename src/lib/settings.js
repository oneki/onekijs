export const defaultSettings = {
  router: {
    type: 'browser'
  },
  routes: {
    login: '/login',
    loginCallback: '/login/callback',
    logout: '/logout',
    logoutCallback: '/logout/callback',
    home: '/'
  },
  idp: {},
  notification: {
    default: {
      ttl: 5000,
      max: 5
    },
    error: {
      ttl: 0,
      max: 0
    }
  }
};

export const defaultIdpSettings = {
  oidc_server: {
    oidc: true,
    oauth2: true,
    external: true,
    postLoginRedirectKey: 'redirect_uri',
    postLogoutRedirectKey: 'post_logout_redirect_uri',
    scope: 'openid',
    pkce: true,
    nonce: false,
    state: true,
    responseType: 'code',
    codeChallengeMethod: 'S256'
  }
}
