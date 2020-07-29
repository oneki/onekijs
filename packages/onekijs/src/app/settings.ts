import { toRelativeUrl } from '../core/utils/url';
import { AnonymousObject } from '../core/typings';
import { AppSettings, Location } from './typings';
import AppContext from './AppContext';

export const defaultSettings = {
  contextPath: '/',
  i18n: {
    locales: [],
    defaultLocale: null,
    url: '/locales',
    slug: '[lang]',
    localeFromLocation: (location: Location, settings: AppSettings): string | null => {
      const { contextPath, i18n } = settings;
      const length = contextPath.endsWith('/') ? contextPath.length : contextPath.length + 1;
      const locale = location.pathname.substring(length).split('/')[0];
      if (i18n.locales.includes(locale)) return locale;
      return null;
    },
    addLocaleToLocation: (locale: string, location: Location, settings: AppSettings): Location => {
      const pathname = location.pathname;
      const relativeUrl = toRelativeUrl(location);
      const hasLocale = settings.i18n.locales.find((l: any) => pathname.startsWith(`/${l}`));
      if (!hasLocale) {
        location.pathname = `/${locale}${pathname}`;
        if (location.pathname.endsWith('/')) location.pathname = location.pathname.slice(0, -1);
      }
      if (Object.keys(location).includes('route')) {
        const route = location.route || relativeUrl;
        if (route && !route.startsWith(`/${settings.i18n.slug}`)) {
          location.route = `/${settings.i18n.slug}${route}`;
          if (location.route.endsWith('/')) location.route = location.route.slice(0, -1);
        }
      }
      return location;
    },
    changeLocale: (locale: string, { router, settings, i18n }: AppContext): void => {
      // TODO define context
      const { contextPath } = settings;
      const length = contextPath.endsWith('/') ? contextPath.length : contextPath.length + 1;
      const currentLocale = i18n.locale;
      const pathTokens = router.pathname ? router.pathname.substring(length).split('/') : [];
      if (router.pathname && pathTokens[0] === currentLocale) {
        pathTokens[0] = locale;
        router.push(
          Object.assign({}, router.location, {
            pathname: `${router.pathname.substring(0, length)}${pathTokens.join('/')}`,
          }),
        );
      }
    },
  },
  idp: {},
  notification: {
    default: {
      ttl: 5000,
      max: 5,
    },
    error: {
      ttl: 0,
      max: 0,
    },
    'login-error': {
      ttl: 0,
      max: 1,
    },
    'logout-error': {
      ttl: 0,
      max: 1,
    },
  },
  router: {
    type: 'browser',
  },
  routes: {
    login: '/login',
    loginCallback: '/login/callback',
    logout: '/logout',
    logoutCallback: '/logout/callback',
    home: '/',
  },
};

export const defaultIdpSettings: AnonymousObject = {
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
};
