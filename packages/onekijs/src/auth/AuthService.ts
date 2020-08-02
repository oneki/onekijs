import { delay, spawn } from 'redux-saga/effects';
import { reducer, saga, service } from '../core/annotations';
import BasicError from '../core/BasicError';
import GlobalService from '../core/GlobalService';
import HTTPError from '../core/HTTPError';
import { AnonymousObject, ErrorCallback, SagaEffect, SuccessCallback } from '../core/typings';
import { del, get, isNull, set } from '../core/utils/object';
import { getItem, onStorageChange, removeItem, setItem } from '../core/utils/storage';
import { absoluteUrl } from '../core/utils/url';
import { asyncGet, asyncPost } from '../fetch/utils';
import { Idp } from './typings';
import { getIdp, getIdpName, oauth2Keys, parseJwt, validateToken } from './utils';

@service
export default class AuthService extends GlobalService {
  /**
   * Save the security context in the redux store
   *
   * @param {object} securityContext : the security context to save
   */
  @reducer
  setSecurityContext(securityContext: AnonymousObject | null): void {
    set(this.state, 'auth.securityContext', securityContext);
  }

  /**
   * Save the token in the redux store
   *
   * @param {string|object} token : the token to save
   */
  @reducer
  setToken(token: string | AnonymousObject | null): void {
    const idpName = getIdpName(this.state);
    const idp = getIdp(this.context.settings, idpName);
    const persist: string | null = get(idp, 'persist', null);

    let toCookie: string | null = null;
    // we only persist in the cookie the refresh token and if not specified, the access token
    if (persist === 'cookie') {
      for (const type of ['refresh_token', 'access_token', 'token']) {
        if (token && token.hasOwnProperty(type)) {
          toCookie = type;
          break;
        }
      }
    }

    // any other key will not be saved in the cookie but in the sessionStorage
    const storage = (k: string) => {
      if (!token || persist === null || persist === 'memory') return persist;
      if (k === toCookie) return 'cookie';

      return persist === 'localStorage' ? 'localStorage' : 'sessionStorage';
    };

    if (token === null || persist === null) {
      // if the token is null or the config specifies to persist nothing,
      // we remove to token from the persistent storage
      oauth2Keys.forEach((k: string) => {
        removeItem(`onekijs.${k}`, storage(k));
      });
      removeItem('onekijs.token', storage('token'));
      // remove the token from the redux state.
      del(this.state, 'auth.token');
    } else if (persist === 'memory') {
      set(this.state, 'auth.token', token);
    } else if (typeof token === 'string') {
      // it's not a oauth2 token but a simple "string" token. Persist as it is
      setItem('onekijs.token', token, storage('token'));
      // persist the token in the redux state. It can be added as a bearer to any ajax request.
      set(this.state, 'auth.token', token);
    } else {
      // it's an oauth2 token, persist all keys
      oauth2Keys.forEach((k) => {
        if (token[k]) {
          setItem(`onekijs.${k}`, `${token[k]}`, storage(k));
        }
      });
      // create a expirtes_at key for convenience
      if (token.expires_in && !token.expires_at) {
        token.expires_at = Date.now() + parseInt(token.expires_in) * 1000;
        setItem('onekijs.expires_at', `${token.expires_at}`, storage('expires_at'));
      }
      // persist the token in the redux state. It can be added as a bearer to any ajax request.
      set(this.state, 'auth.token', token);
    }
  }

  /**
   * Save the idp name in the redux store
   *
   * @param {object} idp : the IDP to save (full object). Can be null for removal
   */
  @reducer
  setIdp(idp?: Idp): void {
    const { router, settings } = this.context;
    const nextIdp = idp;

    if (isNull(idp)) {
      // if it's a removal, we need to check in which storage the idp name was saved
      // get the current idpName from the redux store
      const idpName = getIdpName(this.state);
      // if not found, the idp was already removed
      if (isNull(idpName)) return;
      // build the full IDP object from the settings
      idp = getIdp(settings, idpName);
    }

    // get the persistence storage specified by the IDP (null means that
    // nothing related to authentication is persisted on the client side)
    const persist = get(idp, 'persist', null);

    // the idpName is always persisted (in the localStorage except if persist is sessionStorage)
    // This allows a user to refresh the tab (always) and open a new tab (if persist is not sessionStorage)
    const storage = persist === 'sessionStorage' ? 'sessionStorage' : 'localStorage';

    if (nextIdp === null || nextIdp === undefined) {
      // it's a removal, just remove from the redux store
      set(this.state, 'auth.idpName', null);
      // and the persistence storage
      removeItem('onekijs.idpName', storage);
    } else {
      // save the idp name in the redux store
      set(this.state, 'auth.idpName', nextIdp.name);
      // and in the persistence storage
      setItem('onekijs.idpName', nextIdp.name, storage);
      if (storage === 'localStorage') {
        // listen to change on the idpName key and logout every other tab
        onStorageChange('onekijs.idpName', (value: string) => {
          if (value !== nextIdp.name) {
            router.push(get(settings, 'routes.logout') || '/logout');
          }
        });
      }
    }
  }

  /**
   * Clear all authentication data from the redux store
   * and the persistence storage
   *
   * @param {object} action :
   *    - onError: callback for any error
   *    - onSuccess: callback for any success
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *clear(onError?: ErrorCallback, onSuccess?: SuccessCallback) {
    try {
      yield this.setSecurityContext(null);
      yield this.setToken(null);
      yield this.setIdp();
      if (onSuccess) {
        yield onSuccess({}, this.context);
      }
    } catch (e) {
      if (onError) {
        yield onError(e, this.context);
      } else {
        throw e;
      }
    }
  }

  /**
   * Get the security context from the server and save it
   *
   * @param {object} action :
   *    - onError: callback for any error
   *    - onSuccess: callback for any success
   * @param {object} context :
   *    - store: the redux store
   *    - router: the OnekiJS router of the application
   *    - settings: the full settings object passed to the application
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Leading)
  *fetchSecurityContext(onError?: ErrorCallback, onSuccess?: SuccessCallback) {
    const { store, settings } = this.context;
    try {
      const idpName = getIdpName(store.getState());
      if (!idpName || idpName === 'null') {
        // not idp name in the stage or the persistence storage => not yet authenticated
        throw new HTTPError(401);
      }

      const idp = getIdp(settings, idpName);
      if (!idp) {
        throw new HTTPError(500, `Could not find the configuration for IDP ${idpName} in the settings`);
      }

      const userinfoEndpoint = idp.userinfoEndpoint;
      if (!userinfoEndpoint) {
        throw new HTTPError(500, `Could not find a valid userinfo endpoint for idp ${idpName}`);
      }

      let securityContext = null;
      // we fetch the token from the redux store
      let token = get(store.getState(), 'auth.token');

      // or from the persistence storage
      if (!token) {
        // try to load it from the localStorage
        yield this.loadToken();
        token = get(store.getState(), 'auth.token');
      }
      if (typeof userinfoEndpoint === 'function') {
        // delegate the security context fetching to the user-passed function
        securityContext = yield userinfoEndpoint(idp, this.context);
      } else if (userinfoEndpoint.startsWith('token://')) {
        // from the userinfo endpoint, we check which property of the token
        // contains the security context (usually the id_token)
        // if no property was specified, the full token is the security context
        const token_prop = userinfoEndpoint.split('/')[2];
        if (!token) {
          // if the token was not found, we are not yet authenticated
          throw new HTTPError(401);
        }
        securityContext = token_prop ? parseJwt(token[token_prop]) : parseJwt(token);
      } else {
        // the userinfo endpoint is an URL, do a ajax call to
        // get the security context
        securityContext = yield asyncGet(absoluteUrl(userinfoEndpoint, get(settings, 'server.baseUrl')), {
          // we add a bearer auth if a token was saved in the redux store
          auth: get(store.getState(), 'auth'),
        });
      }

      // save the security context in the store
      yield this.setSecurityContext(securityContext);

      if (onSuccess) {
        // call the success callback
        yield onSuccess(securityContext, this.context);
      }
      return securityContext;
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('fetchSecurityContext error', e);
      }
      if (onError) {
        yield onError(e, this.context);
      } else {
        throw e;
      }
    }
  }

  /**
   * Load the token from the persistence storage to the redux store
   *
   * @param {object} action :
   *    - onError: callback for any error
   *    - onSuccess: callback for any success
   * @param {object} context :
   *    - store: the redux store
   *    - settings: the full settings object passed to the application
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *loadToken(onError?: ErrorCallback, onSuccess?: SuccessCallback) {
    const { store, settings } = this.context;
    try {
      let result = get(store.getState(), 'auth.token', null);
      if (isNull(result)) {
        const idpName = getIdpName(store.getState());
        if (!idpName || idpName === 'null') {
          // not authenticated
          return null;
        }
        const idp = getIdp(settings, idpName);
        const persist = get(idp, 'persist');
        if (!persist) {
          // the token is not persisted in the store
          return null;
        }

        // TODO: manage cookie storage
        const storage = persist === 'localStorage' ? 'localStorage' : 'sessionStorage';

        const expires_at = parseInt(yield getItem('onekijs.expires_at', storage));
        const clockSkew = idp.clockSkew || 60;
        const access_token = yield getItem('onekijs.access_token', persist);
        const refresh_token = yield getItem('onekijs.refresh_token', persist);
        if (access_token && expires_at >= Date.now() + clockSkew * 1000) {
          // the token is still valid
          const token: AnonymousObject = {
            access_token,
            refresh_token,
          };
          // build the token
          for (const k of oauth2Keys) {
            if (!token[k]) {
              token[k] = yield getItem(`onekijs.${k}`, storage);
            }
          }
          // save it
          result = yield this.saveToken(token, idp);
        } else if (refresh_token) {
          // the access token is not still valid but we have a refresh token
          // use the refresh token to get a new valid token
          result = yield this.refreshToken({ refresh_token }, idp, true);
        } else {
          const token = yield getItem('onekijs.token', persist);
          if (token) {
            result = yield this.saveToken(token, idp);
          }
        }
      }

      if (onSuccess) {
        // call the success callback
        yield onSuccess(result, this.context);
      }

      return result;
    } catch (e) {
      if (onError) {
        yield onError(e, this.context);
      } else {
        throw e;
      }
    }
  }

  /**
   * Refresh the token against an IDP
   *
   * @param {object} action :
   *    - token: the current oauth token
   *    - idp: the IDP used to refresh the token
   *    - force: refresh the token even the current one is not expired
   *    - onError: callback for any error
   * @param {object} context :
   *    - store: the redux store
   *    - settings: the full settings object passed to the application
   */
  @saga(SagaEffect.Every)
  *refreshToken(token: AnonymousObject, idp: Idp, force = false, onError?: ErrorCallback): AnonymousObject {
    const { store } = this.context;
    try {
      if (!force && !token.hasOwnProperty('expires_at')) {
        // the token has no expiration time, so it's still valid
        return token;
      }

      if (!force) {
        // clockSkew is the delay before the end of token validity triggering
        // the refreshing of the token
        const clockSkew = idp.clockSkew || 60;
        const expires_at = parseInt(token.expires_at);
        const to_delay = expires_at - clockSkew * 1000 - Date.now();

        if (to_delay > 0) {
          // we don't need to refresh yet the token => sleep the saga until then
          yield delay(to_delay);
        }

        // check that the token has not been revoked or changed
        const actualToken = get(store.getState(), 'auth.token');
        if (token !== actualToken) {
          // another method has refresh / change the token (during the nap of this saga)
          // just return the actual one
          return actualToken;
        }
      }

      // refresh the token
      let nextToken;
      if (typeof idp.tokenEndpoint === 'function') {
        // delegate to the function the task of refreshing the token
        nextToken = yield idp.tokenEndpoint('refreshToken', idp, this.context);
      } else {
        // build the request for refreshing the token
        const body: AnonymousObject = {
          grant_type: 'refresh_token',
          client_id: idp.clientId,
          refresh_token: token.refresh_token,
        };
        const headers: AnonymousObject = {
          'Content-Type': 'application/x-www-form-urlencoded',
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
        if (idp.tokenEndpoint) {
          nextToken = yield asyncPost(idp.tokenEndpoint, body, {
            headers,
          });
        }
      }
      if (!nextToken) {
        throw new BasicError('Cannot refresh token');
      }
      // add to the result the refresh token (when refreshing a token,
      // the result don't have the refresh token)
      nextToken.refresh_token = token.refresh_token;

      // add a expires_at property to the token for convenience
      if (nextToken.expires_in && !nextToken.expires_at) {
        nextToken.expires_at = Date.now() + parseInt(token.expires_in) * 1000;
      }
      return yield this.saveToken(nextToken, idp);
    } catch (e) {
      if (onError) {
        yield onError(e, this.context);
      } else {
        throw e;
      }
    }
  }

  /**
   * Validate the token and save it in the store and persistence storage and
   * trigger the refreshing of the token if applicable
   *
   * @param {object} action :
   *    - token: the current oauth token
   *    - idp: the IDP used to refresh the token
   *    - onError: callback for any error
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *saveToken(token: AnonymousObject | string, idp: Idp, onError?: ErrorCallback) {
    try {
      if (idp.validate) {
        if (!idp.jwksEndpoint) {
          throw new HTTPError(500, 'A jwksEndpoint is required to validate tokens');
        }
        if (!(token instanceof String) && (token as AnonymousObject).id_token) {
          const isValidIdToken = yield validateToken(
            (token as AnonymousObject).id_token,
            idp.jwksEndpoint,
            idp,
            this.context,
          );
          if (!isValidIdToken) {
            throw new HTTPError(400, 'Invalid id token');
          }
        } else if (!(token instanceof String) && (token as AnonymousObject).access_token) {
          const isValidAccessToken = yield validateToken(
            (token as AnonymousObject).access_token,
            idp.jwksEndpoint,
            idp,
            this.context,
          );
          if (!isValidAccessToken) {
            throw new HTTPError(400, 'Invalid access token');
          }
        }
      }

      yield this.setIdp(idp);
      yield this.setToken(token);

      if (!(token instanceof String) && (token as AnonymousObject).refresh_token) {
        yield spawn([this, this.refreshToken], token as AnonymousObject, idp, false, onError);
      }
      return token;
    } catch (e) {
      if (onError) {
        yield onError(e, this.context);
        return null;
      } else {
        throw e;
      }
    }
  }
}
