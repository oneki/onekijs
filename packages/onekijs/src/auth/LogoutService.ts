import { call } from 'redux-saga/effects';

import NotificationService from '../notification/NotificationService';
import { SuccessCallback, ErrorCallback, SagaEffect } from '../core/typings';
import { asyncHttp } from '../fetch/utils';
import AuthService from './AuthService';
import { LogoutState } from './typings';
import { getIdp, getIdpName, isOauth, isExternal } from './utils';
import { get } from '../core/utils/object';
import LocalService from '../core/LocalService';
import { reducer, saga } from '../core/annotations';
import BasicError from '../core/BasicError';
import { absoluteUrl } from '../core/utils/url';

export default class LogoutService extends LocalService<LogoutState> {
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
  onError(error: BasicError): void {
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
   * Logout the user or redirect to an external logout page
   *
   * @param onError callback for catching possible errors
   * @param onSuccess callback called after a success logout
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *logout(onError?: ErrorCallback, onSuccess?: SuccessCallback) {
    const { router, settings, store } = this.context;
    try {
      const idpName = getIdpName(store.getState());
      if (!idpName) {
        return yield this.successLogout(onError, onSuccess);
      }

      // forward to reducer to set loading flag
      yield this.setLoading(true);

      // build the IDP configuration from the settings and some default values
      const idp = getIdp(settings, idpName);

      if (isExternal(idp)) {
        if (typeof idp.externalLogoutEndpoint === 'function') {
          // if the user specifies a function as externalLogoutEndpoint, we delegate to
          // this function the task of building the URL of the external logout
          // page
          const url = yield idp.externalLogoutEndpoint(idp, this.context);
          window.location.href = `${absoluteUrl(url, get(settings, 'server.baseUrl'))}`;
        } else if (idp.externalLogoutEndpoint) {
          // Build the logout URL
          const redirectUri = absoluteUrl(idp.logoutCallbackRoute || `${router.pathname}/callback`);
          let search = '';
          if (isOauth(idp)) {
            // Build the logout URL based on specs
            // https://openid.net/specs/openid-connect-frontchannel-1_0.html
            const redirectKey = idp.postLogoutRedirectKey || 'post_logout_redirect_uri';
            search = `?${redirectKey}=${redirectUri}&client_id=${idp.clientId}`;
          } else if (idp.postLogoutRedirectKey) {
            search = `?${idp.postLogoutRedirectKey}=${redirectUri}`;
          }

          window.location.href = `${absoluteUrl(idp.externalLogoutEndpoint, get(settings, 'server.baseUrl'))}${search}`;
        } else {
          // nothing to do, just call successLogout
          yield this.successLogout(onError, onSuccess);
        }
      } else {
        if (typeof idp.logoutEndpoint === 'function') {
          // if the user specifies a function as logoutEndpoint, we delegate to
          // this function the task of doing the logout request
          yield idp.logoutEndpoint(idp, this.context);
        } else if (idp.logoutEndpoint) {
          // call the server
          const method = idp.logoutMethod || 'GET';
          yield asyncHttp(absoluteUrl(idp.logoutEndpoint, get(settings, 'server.baseUrl')), method, undefined, {
            auth: store.getState().auth,
          });
        }

        // the logout is done => call successLogout
        yield this.successLogout(onError, onSuccess);
      }
    } catch (e) {
      yield this.onError(e);
      if (onError) {
        // the caller is not an async or generator function and manages error
        // via a callback
        yield onError(e, this.context);
      } else {
        // the caller is an async or generator function and manages error
        // via a try/catch
        throw e;
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *successLogout(onError?: ErrorCallback, onSuccess?: SuccessCallback) {
    const { router, settings } = this.context;
    try {
      // clear the token and the security context
      yield this.authService.clear();

      // call the reducer to update the local state
      yield this.onSuccess();
      yield this.notificationService.clearTopic('logout-error');

      if (onSuccess) {
        // the caller manages the success logout
        yield onSuccess({}, this.context);
      } else {
        // redirect to the home page
        yield call([router, router.push], get(settings, 'routes.home', '/'));
      }
    } catch (e) {
      yield this.onError(e);
      if (onError) {
        // the caller is not an async or generator function and manages error
        // via a callback
        yield onError(e, this.context);
      } else {
        // the caller is an async or generator function and manages error
        // via a try/catch
        throw e;
      }
    }
  }
}
