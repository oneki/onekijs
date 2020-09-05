import { rest } from 'msw';
import { anyMethod, mutationMethod } from '../utils/handler';
import {
  formAuthLoginCustomKeyHandler,
  formAuthLoginHandler,
  formAuthLoginTokenHandler,
  formAuthLogoutTokenHandler,
  oidcJwksHandler,
  oidcNonPkceTokenHandler,
  oidcPkceTokenHandler,
  oidcUserInfoHandler,
} from './handlers/auth';
import { echoHandler, mutationEchoHandler } from './handlers/echo';
import { errorHandler } from './handlers/error';
import { i18nCommonEnHandler, i18nCommonFrHandler, i18nUsersEnHandler, i18nUsersFrHandler } from './handlers/i18n';
import { delaySuccessHandler, successHandler } from './handlers/success';
import { collectionUrlHandler, collectionQueryHandler } from './handlers/collection';

export const handlers = [
  // ECHO
  rest.get('/echo**', echoHandler),
  ...mutationMethod(rest, '/echo', mutationEchoHandler),

  // SUCCESS
  ...anyMethod(rest, '/success', successHandler),
  ...anyMethod(rest, '/success-with-delay', delaySuccessHandler),

  // ERROR
  ...anyMethod(rest, '/error', errorHandler),

  // I18N
  rest.get('/locales/en/common.json', i18nCommonEnHandler),
  rest.get('/locales/en/users.json', i18nUsersEnHandler),
  rest.get('/locales/fr/common.json', i18nCommonFrHandler),
  rest.get('/locales/fr/users.json', i18nUsersFrHandler),

  // FORM BASED AUTH
  rest.post('/auth/login-token', formAuthLoginTokenHandler),
  rest.post('/auth/login', formAuthLoginHandler),
  rest.post('/auth/login-custom-key', formAuthLoginCustomKeyHandler),
  rest.get('/auth/logout-token', formAuthLogoutTokenHandler),

  // OIDC AUTH
  rest.post('/oauth2/token', oidcNonPkceTokenHandler),
  rest.post('/oauth2/token-with-pkce', oidcPkceTokenHandler),

  rest.get('/oauth/userinfo', oidcUserInfoHandler),
  rest.get('/.well-known/jwks.json', oidcJwksHandler),

  // COLLECTIONS
  rest.get('/collection-url', collectionUrlHandler),
  rest.get('/collection', collectionQueryHandler),
];
