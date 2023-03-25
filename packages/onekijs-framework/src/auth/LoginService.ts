import { call } from 'redux-saga/effects';
import DefaultLocalService from '../app/LocalService';
import { reducer, saga, service } from '../core/annotations';
import DefaultBasicError from '../core/BasicError';
import { asyncHttp, asyncPost } from '../core/xhr';
import NotificationService from '../notification/NotificationService';
import { OidcToken } from '../types/auth';
import { SuccessCallback } from '../types/callback';
import { BasicError, ErrorCallback } from '../types/error';
import { AnonymousObject } from '../types/object';
import { SagaEffect } from '../types/saga';
import { sha256 } from '../utils/crypt';
import { get } from '../utils/object';
import { absoluteUrl } from '../utils/router';
import AuthService from './AuthService';
import { LoginState } from './typings';
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateNonce,
  generateState,
  getIdp,
  getIdpStorage,
  isExternal,
  isOauth,
  parseHashToken,
  parseJwt,
} from './utils';

@service
export default class LoginService extends DefaultLocalService<LoginState> {
  notificationService: NotificationService;
  authService: AuthService;

  constructor(notificationService: NotificationService, authService: AuthService) {
    super();
    this.notificationService = notificationService;
    this.authService = authService;
  }

  /**
   * Inform the user if there is a loading task
   *
   * @param {boolean} loading
   */

  @reducer
  setLoading(loading: boolean): void {
    this.state.loading = loading;
  }

  /**
   * Inform the user if there is an error
   *
   * @param {object} error
   */

  @reducer
  onError(error: DefaultBasicError): void {
    this.state.error = error;
    this.state.loading = false;
  }

  /**
   * Reset the loading and error message after a successful operation
   *
   */

  @reducer
  onSuccess(): void {
    this.state.loading = false;
    this.state.error = undefined;
  }

  /**
   * Submit the login form
   *
   * @param action:
   *    - username: the value from the username field
   *    - password: the value from the password field
   *    - rememberMe: the value from the rememberMe checkbox
   *    - idpName: name of the IDP (as found in the settings)
   *    - onError: callback for catching possible errors
   * @param context:
   *    - router: an OnekiJS router
   *    - settings: the full settings object passed to the application
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *formLogin(data: AnonymousObject, idpName?: string, onError?: ErrorCallback, onSuccess?: SuccessCallback) {
    const { settings } = this.context;
    try {
      // forward to reducer to set the loading flag to true
      yield this.setLoading(true);

      // build the IDP configuration from the settings and some default values
      const idp = getIdp(settings, idpName);

      // will contain the result of the submit
      let response: unknown;

      if (typeof idp.loginEndpoint === 'function') {
        // if the user specifies a function as loginEndpoint, we delegate to
        // this function the task of submitting the form
        response = yield idp.loginEndpoint(data, idp, this.context);
      } else {
        // create the submit request
        const method = idp.loginMethod || 'POST';
        const usernameKey = idp.usernameKey || 'username';
        const passwordKey = idp.passwordKey || 'password';
        const rememberMeKey = idp.rememberMeKey || 'rememberMe';
        const contentType = idp.loginContentType || 'application/json';
        let url = idp.loginEndpoint;
        if (!url) {
          throw new DefaultBasicError(`Invalid loginEndpoint for IDP ${idp.name}`);
        }
        let body;

        if (method === 'GET') {
          url += `?${usernameKey}=${data.username}&${passwordKey}=${data.password}&${rememberMeKey}=${data.rememberMe}`;
        } else {
          body = {
            [usernameKey]: data.username,
            [passwordKey]: data.password,
            [rememberMeKey]: data.rememberMe,
          };
        }

        response = yield asyncHttp(absoluteUrl(url, get(settings, 'server.baseUrl')), method, body, {
          headers: {
            'Content-Type': contentType,
          },
        });
      }

      // try to parse the token and the security context from the response
      let token = null,
        securityContext = null;
      if (typeof idp.callback === 'function') {
        // when the user specifies a function as the callback, we delegate to this
        // function the task of parsing the token and the security context from
        // the response
        [token, securityContext] = yield idp.callback(response, idp, this.context);
      } else if (idp.callback === 'token') {
        // when the callback is set to "token", the response is the token
        token = response;
      } else if (idp.callback === 'securityContext') {
        // when the callback is set to "securityContext", the response is the
        // security context
        securityContext = response;
      }
      yield this.successLogin(token, securityContext, idpName, onError, onSuccess);
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Form login error', e);
      }
      yield this.onError(e as BasicError);
      if (onError) {
        // the caller is not an async or generator function and manages error
        // via a callback
        yield onError(e as BasicError);
      } else {
        // the caller is an async or generator function and manages error
        // via a try/catch
        throw e;
      }
    }
  }
  /**
   * Redirect the user to an external login page
   *
   * @param action:
   *    - idpName: name of the IDP (as found in the settings)
   *    - onError: callback for catching possible errors
   * @param context:
   *    - store: the Redux store
   *    - router: an OnekiJS router
   *    - settings: the full settings object passed to the application
   */
  @saga(SagaEffect.Latest)
  *externalLogin(idpName?: string, onError?: ErrorCallback): Generator<string | void | Promise<string>, void, unknown> {
    const { router, settings } = this.context;
    try {
      // build the IDP configuration from the settings and some default values
      const idp = getIdp(settings, idpName);
      const identity = idp.identity ?? 'default';

      // get the loginCallback route the settings
      const redirectUri = absoluteUrl(idp.loginCallbackRoute || `${router.pathname}/callback`);
      if (!isExternal(idp)) {
        throw Error(`IDP type ${idp.type} is not valid for an external authentication`);
      }

      if (isOauth(idp)) {
        if (!idp.clientId) {
          throw new DefaultBasicError(`Cannot find a valid client_id for IDP ${idp.name}`);
        }
        const params: AnonymousObject = {
          client_id: idp.clientId,
          response_type: idp.responseType,
        };
        if (idp.postLoginRedirectKey) {
          params[idp.postLoginRedirectKey] = redirectUri;
        }
        if (idp.scope) {
          params.scope = idp.scope;
        }

        if (idp.nonce || (idp.responseType && idp.responseType.includes('id_token'))) {
          const nonce = generateNonce();
          getIdpStorage(idp).setItem(`onekijs.${identity}.nonce`, nonce);
          const hash = yield sha256(nonce);
          params.nonce = hash;
        } else {
          getIdpStorage(idp).removeItem(`onekijs.${identity}.nonce`);
        }
        if (idp.state) {
          const state = generateState();
          getIdpStorage(idp).setItem(`onekijs.${identity}.state`, state);

          const hash = yield sha256(state);
          params.state = hash;
        } else {
          getIdpStorage(idp).removeItem(`onekijs.${identity}.state`);
        }

        if (idp.responseType === 'code' && idp.pkce) {
          const verifier = generateCodeVerifier();
          getIdpStorage(idp).setItem(`onekijs.${identity}.verifier`, verifier);
          const challenge = yield generateCodeChallenge(verifier);
          params.code_challenge = challenge;
          params.code_challenge_method = idp.codeChallengeMethod;
        } else {
          getIdpStorage(idp).removeItem(`onekijs.${identity}.verifier`);
        }

        if (typeof idp.authorizeEndpoint === 'function') {
          // if the user specifies a function as authorizeEndpoint, we delegate to
          // this function the task of building the URL of the external login page
          const url = yield idp.authorizeEndpoint(params, idp, this.context);
          window.location.href = `${absoluteUrl(url as string, get(settings, 'server.baseUrl'))}`;
        } else if (idp.authorizeEndpoint) {
          // build the URL based on the spec
          // https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
          // const responseType = idp.responseType;
          // const redirectKey = idp.postLoginRedirectKey;
          // const scope = idp.scope;
          const search = Object.keys(params).reduce((accumulator, key) => {
            accumulator += accumulator.length > 1 ? '&' : '';
            return `${accumulator}${key}=${params[key]}`;
          }, '?');

          window.location.href = `${absoluteUrl(idp.authorizeEndpoint, get(settings, 'server.baseUrl'))}${search}`;
        } else {
          throw new DefaultBasicError(`Cannot find a valid authorizeEndpoint for IDP ${idp.name}`);
        }
      } else if (typeof idp.externalLoginEndpoint === 'function') {
        // if the user specifies a function as externalLoginEndpoint, we delegate to
        // this function the task of building the URL of the external login page
        const url = yield idp.externalLoginEndpoint(idp, this.context);
        window.location.href = `${absoluteUrl(url as string, get(settings, 'server.baseUrl'))}`;
      } else if (idp.externalLoginEndpoint) {
        // we don't actually have a spec to follow. Just use the externalLoginEndpoint
        // and add the callback URL
        const search = idp.postLoginRedirectKey ? `?${idp.postLoginRedirectKey}=${redirectUri}` : '';
        window.location.href = `${absoluteUrl(idp.externalLoginEndpoint, get(settings, 'server.baseUrl'))}${search}`;
      } else {
        throw new DefaultBasicError(`Cannot find a valid externalLoginEndpoint for IDP ${idp.name}`);
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('External login error', e);
      }
      yield this.onError(e as BasicError);
      if (onError) {
        // the caller is not an async or generator function and manages error
        // via a callback
        yield onError(e as BasicError);
      } else {
        // the caller is an async or generator function and manages error
        // via a try/catch
        throw e;
      }
    }
  }
  /**
   * Parse the token and the security context from the response of the
   * external login
   *
   * @param action:
   *    - idpName: name of the IDP (as found in the settings)
   *    - onError: callback for catching possible errors
   * @param context:
   *    - store: the Redux store
   *    - router: an OnekiJS router
   *    - settings: the full settings object passed to the application
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *externalLoginCallback(idpName?: string, onError?: ErrorCallback, onSuccess?: SuccessCallback) {
    const { router, settings } = this.context;
    try {
      // build the IDP configuration from the settings and some default values
      const idp = getIdp(settings, idpName);
      const identity = idp.identity ?? 'default';

      // by default, the response is the current location containing all
      // parameters found in the URL
      let response: Location | unknown = router.location;

      // the callback found in the IDP configuration is a custom function
      // for parsing the reponse of the exernal login
      let callback = idp.callback;

      // Will contain the token from the response (if found)
      let token: unknown = null;

      // Will contain the security context found in the response (if found)
      let securityContext = null;

      if (isOauth(idp)) {
        const responseType = idp.responseType || 'code';
        if (responseType === 'code') {
          if (typeof idp.tokenEndpoint === 'function') {
            // if the user specifies a function as tokenEndpoint, we delegate to
            // this function the task of validating the authorizeEndpoint response
            // and getting the token from the tokenEndpoint
            token = yield idp.tokenEndpoint('authorization_code', idp, this.context);
          } else if (idp.tokenEndpoint) {
            // validating the authorizeEndpoint response based on spec
            // https://openid.net/specs/openid-connect-core-1_0.html#AuthResponseValidation
            const params = router.query;
            const state = getIdpStorage(idp).getItem(`onekijs.${identity}.state`);
            getIdpStorage(idp).removeItem(`onekijs.${identity}.state`);

            if (!params) {
              throw new DefaultBasicError('Cannot parse the URL');
            }

            if (params.error) {
              throw new DefaultBasicError(params.error_description?.toString() || '', params.error?.toString());
            }

            if (!params.code) {
              throw new DefaultBasicError(
                'No authorization code received from Identity Provider',
                'missing_authorization_code',
              );
            }

            const hash: string = yield sha256(state || undefined);
            if (idp.state && hash !== params.state) {
              throw new DefaultBasicError('Invalid oauth2 state', 'invalid_state');
            }

            // build the token request based on spec
            // https://openid.net/specs/openid-connect-core-1_0.html#TokenRequest
            const headers: AnonymousObject = {
              'Content-Type': 'application/x-www-form-urlencoded',
            };
            const body: AnonymousObject = {
              grant_type: 'authorization_code',
              client_id: idp.clientId,
              redirect_uri: absoluteUrl(idp.loginCallbackRoute || `${router.pathname}`),
              code: params.code,
            };
            if (idp.clientSecret) {
              if (idp.clientAuth === 'body') {
                body.client_secret = idp.clientSecret;
              } else {
                headers.auth = {
                  basic: {
                    user: idp.clientId,
                    password: idp.clientSecret,
                  },
                };
              }
            }

            if (idp.pkce) {
              body.code_verifier = getIdpStorage(idp).getItem(`onekijs.${identity}.verifier`);
              getIdpStorage(idp).removeItem(`onekijs.${identity}.verifier`);
            }

            // get the token from the tokenEndpoint
            token = yield asyncPost(idp.tokenEndpoint, body, { headers });
          } else {
            throw new DefaultBasicError(`Cannot find a valid tokenEndpoint for IDP ${idp.name}`);
          }

          // use the token instead of the location as the response
          response = token;
        } else if (!callback || callback === 'token') {
          // create a default callback assuming that the response is a location
          // and parsing the token from the URL hash
          callback = (location) => {
            return [parseHashToken(location.hash), undefined];
          };
        }
      }

      if (typeof callback === 'function') {
        // delegate to the callback the task of parsing the token and the
        // security context from the response
        [token, securityContext] = yield callback(response, idp, this.context);
      }

      if (isOauth(idp) && idp.nonce && get(token, 'id_token')) {
        // validates the nonce found in the id_token
        // https://openid.net/specs/openid-connect-core-1_0.html#TokenResponseValidation
        const id_token = parseJwt((token as { id_token: string }).id_token);
        const nonce = getIdpStorage(idp).getItem(`onekijs.${identity}.nonce`);
        const hash: string = yield sha256(nonce || undefined);
        getIdpStorage(idp).removeItem(`onekijs.${identity}.nonce`);
        if (hash !== id_token.nonce) {
          throw Error('Invalid oauth2 nonce');
        }
      }

      yield this.successLogin(token as any, securityContext, idpName, onError, onSuccess);
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('External login callback error', e);
      }
      yield this.onError(e as BasicError);
      if (onError) {
        // the caller is not an async or generator function and manages error
        // via a callback
        yield onError(e as BasicError);
      } else {
        // the caller is an async or generator function and manages error
        // via a try/catch
        throw e;
      }
    }
  }
  /**
   * Save the token and the security context
   *
   * @param action:
   *    - idpName: name of the IDP (as found in the settings)
   *    - onError: callback for catching possible errors
   * @param context:
   *    - router: an OnekiJS router
   *    - settings: the full settings object passed to the application
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *successLogin(
    token?: string | AnonymousObject,
    securityContext?: AnonymousObject,
    idpName?: string,
    onError?: ErrorCallback,
    onSuccess?: SuccessCallback,
  ) {
    const { settings, router } = this.context;
    try {
      // build the IDP configuration from the settings and some default values
      const idp = getIdp(settings, idpName);
      const identity = idp.identity ?? 'default';
      if (token) {
        // save the IDP and the token
        yield this.authService.saveToken(token, idp);
      } else {
        // save only the IDP
        yield this.authService.setIdp(idp);
      }

      if (securityContext) {
        // save the securityContext
        yield this.authService.setSecurityContext(securityContext, identity);
      } else {
        // get the securityContext from the userInfo endpoint and save it
        yield this.authService.fetchSecurityContext(undefined, undefined, identity);
      }
      // call the reducer to update the local state
      yield this.onSuccess();
      yield this.notificationService.clearTopic('login-error');

      // get the original route
      const { from } = router.getOrigin();
      router.deleteOrigin();

      if (onSuccess) {
        // the caller manages the success login
        yield onSuccess([token, securityContext, from]);
      } else {
        // redirect the user to the original route
        yield call([router, router.push], from);
      }
    } catch (e) {
      console.error(e);
      if (process.env.NODE_ENV === 'development') {
        console.error('Success login error', e);
      }
      yield this.onError(e as BasicError);
      if (onError) {
        // the caller is not an async or generator function and manages error
        // via a callback
        yield onError(e as BasicError);
      } else {
        // the caller is an async or generator function and manages error
        // via a try/catch
        throw e;
      }
    }
  }
  /**
   * Check if a login is necessary.
   *
   * @param action:
   *    - idpName: name of the IDP (as found in the settings)
   *    - onError: callback for catching possible errors
   * @param context:
   *    - router: an OnekiJS router
   *    - settings: the full settings object passed to the application
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *login(idpName?: string, onError?: ErrorCallback, onSuccess?: SuccessCallback) {
    const { router, settings } = this.context;
    try {
      router.saveOrigin(false);

      // build the IDP configuration from the settings and some default values
      const idp = getIdp(settings, idpName);
      const identity = idp.identity ?? 'default';

      if (isOauth(idp)) {
        // ask the authService to load the token in the store from the
        // localStorage (if not yet loaded)
        const token: OidcToken = yield this.authService.loadToken(undefined, undefined, identity);
        if (token && token.expires_at && parseInt(token.expires_at) >= Date.now()) {
          // do a success login because the token was found and is still valid
          yield this.successLogin(token, undefined, idpName, onError, onSuccess);
          return;
        }
      }

      // try to fetch the security context to see if we are already logged in
      try {
        const securityContext: AnonymousObject | undefined = yield this.authService.fetchSecurityContext(
          undefined,
          undefined,
          identity,
        );
        // We didn't receive an 401 while loading the context, meaning that we are
        // already logged => do a success login
        yield this.successLogin(undefined, securityContext, idpName, onError, onSuccess);
        return;
      } catch (e) {
        // for any technical error (50X), we stop here and forward the error
        // to the caller
        // for any business error (40X), we bypass the error (it's likely an
        // unauthenticate error, so we continue the login process)
        if ((e as BasicError).code >= 500) {
          throw e;
        }
      }

      if (isExternal(idp)) {
        // do not render anything and redirect to an external login page
        yield this.externalLogin(idpName, onError);
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Login error', e);
      }
      yield this.onError(e as BasicError);
      if (onError) {
        // the caller is not an async or generator function and manages error
        // via a callback
        yield onError(e as BasicError);
      } else {
        // the caller is an async or generator function and manages error
        // via a try/catch
        throw e;
      }
    }
  }
}
