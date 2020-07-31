import '@testing-library/jest-dom/extend-expect';
import qs from 'query-string';
import * as React from 'react';
import { AppSettings } from '../../app/typings';
import { render, TestAppProps } from '../../__tests__/customRenderer';
import asyncTimeout from '../../__tests__/utils/timeout';
import { IdpType } from '../typings';
import { oidcBrowser, oidcServer } from '../utils';
import UseLoginWidget from './components/UseLoginWidget';
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
            clientId: 'mock_client_id',
            authorizeEndpoint: 'https://mockidp.com/oauth2/auth',
            scope: 'openid email profile',
            loginCallbackRoute: 'http://localhost/login/callback',
          }),
        },
      },
    },
  },
  {
    title: 'type = default oidc_browser configuration',
    props: {
      settings: {
        idp: {
          default: oidcBrowser({
            clientId: 'mock_client_id',
            authorizeEndpoint: 'https://mockidp.com/oauth2/auth',
            scope: 'openid email',
            loginCallbackRoute: 'http://localhost/callback',
          }),
        },
      },
    },
  },
  {
    title: 'authorization endpoint as a function in settings',
    props: {
      settings: {
        idp: {
          default: oidcServer({
            type: IdpType.OidcServer,
            clientId: 'mock_client_id',
            authorizeEndpoint: (params, idp, _context) => {
              const search = Object.keys(params).reduce((accumulator, key) => {
                accumulator += accumulator.length > 1 ? '&' : '';
                return `${accumulator}${key}=${params[key]}`;
              }, '?');
              return `${idp.authorizeUrl}${search}`;
            },
            scope: 'openid email profile',
            loginCallbackRoute: 'http://localhost/login/callback',
            authorizeUrl: 'https://mockidp.com/oauth2/auth',
          }),
        },
      },
    },
  },
  {
    title: 'async authorization endpoint as a function in settings',
    props: {
      settings: {
        idp: {
          default: oidcServer({
            type: IdpType.OidcServer,
            clientId: 'mock_client_id',
            authorizeEndpoint: async (params, idp, _context) => {
              const search = Object.keys(params).reduce((accumulator, key) => {
                accumulator += accumulator.length > 1 ? '&' : '';
                return `${accumulator}${key}=${params[key]}`;
              }, '?');
              await asyncTimeout(1); // simulate 1ms delay
              return `${idp.authorizeUrl}${search}`;
            },
            scope: 'openid email profile',
            loginCallbackRoute: 'http://localhost/login/callback',
            authorizeUrl: 'https://mockidp.com/oauth2/auth',
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
  };
});

afterAll((): void => {
  window.location = location;
});

describe('it builds OIDC authorization URL', () => {
  tests.forEach((test) => {
    it(`${test.title}`, async () => {
      render(
        <>
          <UseLoginWidget idpName="default" onError={test.onError} />
          <NotificationWidget />
        </>,
        test.props,
      );
      await asyncTimeout(5);
      const href = window.location.href;
      const settings = test.props?.settings as AppSettings;
      expect(href).toBeDefined();
      const url = new URL(href);
      const query = qs.parse(url.search);
      if (typeof settings.idp.default.authorizeEndpoint === 'string') {
        expect(`${url.origin}${url.pathname}`).toBe(settings.idp.default.authorizeEndpoint);
      } else {
        expect(`${url.origin}${url.pathname}`).toBe(settings.idp.default.authorizeUrl);
      }
      expect(query.client_id).toBe(settings.idp.default.clientId);
      expect(query.code_challenge).toBeDefined();
      expect(query.code_challenge_method).toBe('S256');
      expect(query.redirect_uri).toBeDefined();
      expect(query.response_type).toBe('code');
      expect(query.scope).toBe(settings.idp.default.scope);
      expect(query.state).toBeDefined();
    });
  });
});
