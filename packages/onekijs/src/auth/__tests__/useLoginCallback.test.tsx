import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { render, TestAppProps } from '../../__tests__/customRenderer';
import {
  authorizationCode,
  authorizeEndpoint,
  clientId,
  jwksEndpoint,
  oauthLogoutEndpoint,
  nonce,
  redirectUri,
  state,
  stateSha,
  tokenEndpoint,
  tokenWithPkceEndpoint,
  userinfoEndpoint,
  verifier,
} from '../../__tests__/utils/auth';
import { wait } from '../../__tests__/utils/timeout';
import { IdpStorage, IdpType } from '../typings';
import { oidcBrowser, oidcServer } from '../utils';
import UseLoginCallbackWidget from './components/UseLoginCallbackWidget';

type TestProps = {
  title: string;
  props?: TestAppProps;
};

const tests: TestProps[] = [
  {
    title: 'oidc_server/default config',
    props: {
      settings: {
        idp: {
          default: oidcServer({
            type: IdpType.OidcServer,
            clientId: clientId,
            authorizeEndpoint,
            tokenEndpoint,
            userinfoEndpoint,
            logoutEndpoint: oauthLogoutEndpoint,
            scope: 'openid email profile',
            loginCallbackRoute: redirectUri,
            persist: IdpStorage.Memory,
          }),
        },
      },
    },
  },
  {
    title: 'oidc_server/nonce=true',
    props: {
      settings: {
        idp: {
          default: oidcServer({
            type: IdpType.OidcServer,
            clientId: clientId,
            authorizeEndpoint,
            tokenEndpoint: tokenWithPkceEndpoint,
            userinfoEndpoint,
            logoutEndpoint: oauthLogoutEndpoint,
            scope: 'openid email profile',
            loginCallbackRoute: redirectUri,
            persist: IdpStorage.Memory,
            nonce: true,
          }),
        },
      },
    },
  },
  {
    title: 'oidc_browser/default config',
    props: {
      settings: {
        idp: {
          default: oidcBrowser({
            type: IdpType.OidcBrowser,
            clientId: clientId,
            authorizeEndpoint,
            tokenEndpoint: tokenWithPkceEndpoint,
            userinfoEndpoint,
            logoutEndpoint: oauthLogoutEndpoint,
            jwksEndpoint,
            scope: 'openid email profile',
            loginCallbackRoute: redirectUri,
            persist: IdpStorage.Memory,
          }),
        },
      },
    },
  },
];

const { location } = window;

beforeEach((): void => {
  delete window.location;
  (window as any).location = {
    href: '',
    search: `?code=${authorizationCode}&state=${stateSha}`,
    hash: '',
  };
});

afterEach((): void => {
  window.location = location;
});

describe('it handles OIDC auth callback', () => {
  tests.forEach((test) => {
    it(`${test.title}`, async () => {
      const from = 'http://localhost/admin';
      localStorage.setItem('onekijs.from', from);
      localStorage.setItem('onekijs.nonce', nonce);
      localStorage.setItem('onekijs.state', state);
      localStorage.setItem('onekijs.verifier', verifier);
      render(
        <>
          <UseLoginCallbackWidget idpName="default" />
          <NotificationWidget />
        </>,
        test.props,
      );
      await act(async () => {
        await wait(() => {
          return window.location.href !== '';
        }, 500);
        // const settings = test.props?.settings as AppSettings;
        const href = window.location.href;
        expect(href).toBeDefined();
        expect(href).toBe(from);
        // expect(query.client_id).toBe(settings.idp.default.clientId);
        // expect(query.code_challenge).toBeDefined();
        // expect(query.code_challenge_method).toBe('S256');
        // expect(query.redirect_uri).toBeDefined();
        // expect(query.response_type).toBe('code');
        // expect(query.scope).toBe(settings.idp.default.scope);
        // expect(query.state).toBeDefined();

        localStorage.removeItem('onekijs.from');
        localStorage.removeItem('onekijs.nonce');
        localStorage.removeItem('onekijs.state');
        localStorage.removeItem('onekijs.verifier');
      });
    });
  });
});
