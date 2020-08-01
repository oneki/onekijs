import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { render, TestAppProps } from '../../__tests__/customRenderer';
import { wait } from '../../__tests__/utils/timeout';
import { IdpType, IdpStorage } from '../typings';
import { oidcServer } from '../utils';
import UseLoginCallbackWidget from './components/UseLoginCallbackWidget';
import {
  authorizationCode,
  stateSha,
  nonce,
  state,
  verifier,
  clientId,
  redirectUri,
  authorizeEndpoint,
  tokenEndpoint,
  userinfoEndpoint,
  logoutEndpoint,
} from '../../__tests__/utils/oidc';

type TestProps = {
  title: string;
  props?: TestAppProps;
  onError?: boolean;
  onSucces?: boolean;
};

const tests: TestProps[] = [
  {
    title: 'type = default oidc_server configuration',
    props: {
      settings: {
        idp: {
          default: oidcServer({
            type: IdpType.OidcServer,
            clientId: clientId,
            authorizeEndpoint,
            tokenEndpoint,
            userinfoEndpoint,
            logoutEndpoint,
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

beforeAll((): void => {
  delete window.location;
  (window as any).location = {
    href: '',
    search: `?code=${authorizationCode}&state=${stateSha}`,
    hash: '',
  };
});

afterAll((): void => {
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
          <UseLoginCallbackWidget idpName="default" onError={test.onError} />
          <NotificationWidget />
        </>,
        test.props,
      );
      await act(async () => {
        await wait(() => {
          return window.location.href !== '';
        }, 200);
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
