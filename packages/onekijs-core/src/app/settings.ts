import { AnonymousObject } from '../core/typings';
import { get } from '../core/utils/object';
import { trimEnd } from '../core/utils/string';
import { I18nLocale, I18nLocaleDomain, I18nLocalePath } from '../i18n/typings';
import { Location } from '../router/typings';
import AppContext from './AppContext';
import { AppSettings } from './typings';

export const defaultSettings = {
  contextPath: '/',
  i18n: {
    locales: [],
    defaultLocale: undefined,
    url: '/locales',
    slug: '[lang]',
    localeFromLocation: (location: Location, settings: AppSettings): string | undefined => {
      const { contextPath, i18n } = settings;
      const length = contextPath.endsWith('/') ? contextPath.length : contextPath.length + 1;
      const locale = location.pathname.substring(length).split('/')[0];
      if (i18n.locales.includes(locale)) return locale;
      return undefined;
    },
    addLocaleToLocation: (locale: string, location: Location, settings: AppSettings): Location => {
      const pathname = location.pathname;
      // const relativeUrl = toRelativeUrl(location);
      const hasLocale = settings.i18n.locales.find((l: any) => pathname.startsWith(`/${l}`));
      if (!hasLocale) {
        location.pathname = `/${locale}${pathname}`;
        if (location.pathname.endsWith('/')) location.pathname = location.pathname.slice(0, -1);
      }
      // if (Object.keys(location).includes('route')) {
      //   const route = location.route || relativeUrl;
      //   if (route && !route.startsWith(`/${settings.i18n.slug}`)) {
      //     location.route = `/${settings.i18n.slug}${route}`;
      //     if (location.route.endsWith('/')) location.route = location.route.slice(0, -1);
      //   }
      // }
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
    cookiePath: '/',
    cookieCrypt: true,
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
    cookiePath: '/',
    cookieCrypt: true,
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

export const indexedLocalesSymbol = Symbol();
export const localesModeSymbol = Symbol();
export const defaultLocaleSymbol = Symbol();
export const localeNoPathSymbol = Symbol();

export const indexLocales = (settings: AppSettings): AppSettings => {
  const locales: any[] = settings.i18n?.locales;
  const index: any = {
    [defaultLocaleSymbol]: settings.i18n?.defaultLocale,
  };
  if (locales && locales[0]) {
    if (typeof locales[0] === 'string') {
      index[localesModeSymbol] = 'simple';
      locales.forEach((locale) => (index[locale] = locale));
    } else if (locales[0].domain) {
      index[localesModeSymbol] = 'domain';
      locales.forEach((locale) => {
        index[locale.locale] = locale.domain;
        index[locale.domain] = locale.locale;
      });
    } else {
      index[localesModeSymbol] = 'path';
      locales.forEach((locale) => {
        if (locale.path) {
          index[locale.locale] = locale.path;
          index[locale.path] = locale.locale;
        } else {
          index[locale.locale] = localeNoPathSymbol;
          index[localeNoPathSymbol] = locale.locale;
        }
      });
    }
  }
  settings.i18n[indexedLocalesSymbol] = index;
  return settings;
};

export const isLocalePath = (settings: AppSettings): boolean => {
  return settings.i18n[indexedLocalesSymbol][localesModeSymbol] === 'path';
};

export const isLocaleSimple = (settings: AppSettings): boolean => {
  return settings.i18n[indexedLocalesSymbol][localesModeSymbol] === 'simple';
};

export const isLocaleDomain = (settings: AppSettings): boolean => {
  return settings.i18n[indexedLocalesSymbol][localesModeSymbol] === 'domain';
};

export const indexedLocales = (settings: AppSettings): any => {
  return settings.i18n[indexedLocalesSymbol];
};

// export const getLocaleSettings = (
//   locale: string,
//   settings: AppSettings,
// ): I18nLocalePath | I18nLocaleDomain | undefined => {
//   return get<(I18nLocalePath | I18nLocaleDomain)[]>(settings, 'i18n.locales', []).find(
//     (l: I18nLocale) => l.locale === locale,
//   );
// };

// export const getLocaleSettingsByPath = (
//   path: string,
//   settings: AppSettings,
// ): I18nLocalePath | I18nLocaleDomain | undefined => {
//   return get<(I18nLocalePath | I18nLocaleDomain)[]>(settings, 'i18n.locales', []).find(
//     (l: I18nLocalePath | I18nLocaleDomain) =>
//       !isLocaleDomain(l) && l.path && trimEnd(l.path, '/') === trimEnd(path, '/'),
//   );
// };

// export const isLocaleDomain = (locale: I18nLocalePath | I18nLocaleDomain | undefined): locale is I18nLocaleDomain => {
//   return (locale as any)?.domain !== undefined;
// };
