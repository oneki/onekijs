import { url2locale } from "./i18n";

export const defaultSettings = {
  contextPath: "/",
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    url: "/locales",
    localeFromLocation: (location, settings ) => {
      const { contextPath, i18n } = settings;
      const length = contextPath.endsWith("/")
        ? contextPath.length
        : contextPath.length + 1;
      const locale = location.pathname.substring(length).split("/")[0];
      if (i18n.locales.includes(locale)) return locale;
      return null;
    },
    addLocaleToPath: (locale, path) => {
      return `/${locale}${path}`;
    },
    changeLocale: (locale, { router, settings, i18n}) => {
      const { contextPath } = settings;
      const length = contextPath.endsWith("/")
        ? contextPath.length
        : contextPath.length + 1;
      const currentLocale = i18n.locale;
      console.log("currentLocale", currentLocale);
      const pathTokens = router.pathname.substring(length).split("/");
      console.log("pathTokens", pathTokens);
      if (pathTokens[0] === currentLocale) {
        pathTokens[0] = locale;
        router.push(Object.assign({}, router.location, { pathname: `${router.pathname.substring(0, length)}${pathTokens.join('/')}`}))
      }
    } 
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
  },  
  router: {
    type: 'browser'
  },
  routes: {
    login: '/login',
    loginCallback: '/login/callback',
    logout: '/logout',
    logoutCallback: '/logout/callback',
    home: '/'
  }
};

export const defaultIdpSettings = {
  external: {
    callback: null,
    external: true,
    oauth2: false,
    oidc: false,
    postLoginRedirectKey: 'redirect_uri',
    postLogoutRedirectKey: 'redirect_uri',    
  },  
  form: {
    callback: null,
    external: false,
    loginContentType: 'application/json',
    loginMethod: 'POST',
    logoutMethod: 'GET',
    oauth2: false,
    oidc: false,
    passwordKey: 'password',
    rememberMeKey: 'rememberMe',
    usernameKey: 'username',
  },  
  oauth2_browser: {
    callback: null,
    clientAuth: 'basic',
    clockSkew: 60,
    codeChallengeMethod: 'S256',
    cookieTTL: null,
    external: true,
    oauth2: true,
    oidc: false,
    pkce: true,
    nonce: false,
    persist: 'localStorage',
    postLoginRedirectKey: 'redirect_uri',
    postLogoutRedirectKey: 'post_logout_redirect_uri',
    pubKeyAlgorithm: 'RS256',
    responseType: 'code',
    scope: null,
    state: true,
    validate: true,
  },  
  oauth2_server: {
    callback: null,
    codeChallengeMethod: 'S256',
    external: true,
    oauth2: true,
    oidc: false,
    pkce: true,
    nonce: false,
    postLoginRedirectKey: 'redirect_uri',
    postLogoutRedirectKey: 'post_logout_redirect_uri',
    responseType: 'code',
    scope: null,
    state: true,
    validate: false,
  },  
  oidc_browser: {
    callback: null,
    clientAuth: 'basic',
    clockSkew: 60,
    codeChallengeMethod: 'S256',
    cookieTTL: null,
    external: true,
    oauth2: true,
    oidc: true,
    pkce: true,
    nonce: true,
    persist: 'localStorage',
    postLoginRedirectKey: 'redirect_uri',
    postLogoutRedirectKey: 'post_logout_redirect_uri',
    pubKeyAlgorithm: 'RS256',
    responseType: 'code',
    scope: 'openid',
    state: true,
    validate: true,
  },  
  oidc_server: {
    callback: null,
    codeChallengeMethod: 'S256',
    external: true,
    oauth2: true,
    oidc: true,
    pkce: true,
    nonce: false,
    postLoginRedirectKey: 'redirect_uri',
    postLogoutRedirectKey: 'post_logout_redirect_uri',
    responseType: 'code',
    scope: 'openid',
    state: true,
    validate: false,
  },
}