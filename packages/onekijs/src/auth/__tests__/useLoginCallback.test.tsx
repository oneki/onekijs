import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render, TestAppProps } from '../../__tests__/customRenderer';
import asyncTimeout from '../../__tests__/utils/timeout';
import { IdpType } from '../typings';
import { oidcServer } from '../utils';
import UseLoginCallbackWidget from './components/UseLoginCallbackWidget';
import NotificationWidget from '../../__tests__/components/NotificationWidget';

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
            clientId: 'mock_client_id',
            authorizeEndpoint: 'https://mockidp.com/oauth2/auth',
            tokenEndpoint: 'http://localhost/oauth2/token',
            userinfoEndpoint: 'http://localhost/oauth/userinfo',
            logoutEndpoint: 'http://localhost/oauth/logout',
            scope: 'openid email profile',
            loginCallbackRoute: 'http://localhost/login/callback',
          }),
        },
      },
    },
  },
];

const { location } = window;
const verifier =
  'v84WMRlVj2GrIL-hXWhQ7ex5qbD3tay~~aKwW8pIf967rseOAvxkmo~iqdrNOLe8TDwuxyhAvUz0qo8Tytb2y_3aL4NojS8_ItfnhmHl1IQlI5AF-d';
const codeChallenge = '7wPlckuvoJlcHXJQ1hxUEV1V4avvPX5dFiKdV1Ul9D8';
const nonce = 'mock_nonce';
const nonceSha = '040cf074626aae20f354e328977ad24ff74aad09715d99804aaf34bb8cb48b16';
const state = 'mock_state';
const stateSha = '20a34d84fd572a5f2b6d4c51c9e79209aed9f265d0e142ec6c72ffa85074c296';
const code = 'mockcode';

beforeAll((): void => {
  console.log(nonceSha, codeChallenge);
  delete window.location;
  (window as any).location = {
    href: '',
    search: `?code=${code}&state=${stateSha}`,
    hash: '',
  };
});

afterAll((): void => {
  window.location = location;
});

describe('it handles OIDC auth callback', () => {
  tests.forEach((test) => {
    it(`${test.title}`, async () => {
      localStorage.setItem('onekijs.from', 'http://localhost/admin');
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
      await asyncTimeout(10);

      // const settings = test.props?.settings as AppSettings;
      // expect(href).toBeDefined();
      // const url = new URL(href);
      // const query = qs.parse(url.search);
      // if (typeof settings.idp.default.authorizeEndpoint === 'string') {
      //   expect(`${url.origin}${url.pathname}`).toBe(settings.idp.default.authorizeEndpoint);
      // } else {
      //   expect(`${url.origin}${url.pathname}`).toBe(settings.idp.default.authorizeUrl);
      // }
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
