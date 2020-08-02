import '@testing-library/jest-dom/extend-expect';
import qs from 'query-string';
import * as React from 'react';
import { AppSettings } from '../../app/typings';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { act, render, TestAppProps } from '../../__tests__/customRenderer';
import { asyncTimeout, wait } from '../../__tests__/utils/timeout';
import { IdpType, LoginOptions } from '../typings';
import { oidcBrowser, oidcServer } from '../utils';
import LoginNotificationWidget from './components/LoginNotificationWidget';
import UseLoginWidget from './components/UseLoginWidget';

type TestProps = {
  title: string;
  props?: TestAppProps;
  options?: LoginOptions;
  idpName?: string;
};

const { location } = window;

beforeEach((): void => {
  delete window.location;
  (window as any).location = {
    href: '',
  };
});

afterEach((): void => {
  window.location = location;
});

const oidcTests: TestProps[] = [
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

describe('it builds OIDC authorization URL', () => {
  oidcTests.forEach((test) => {
    it(`${test.title}`, async () => {
      render(
        <>
          <UseLoginWidget idpName="default" />
          <NotificationWidget />
        </>,
        test.props,
      );
      await act(async () => {
        await wait(() => {
          return window.location.href !== '';
        }, 500);
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
});

const oidcErrorTests: TestProps[] = [
  {
    title: 'invalid idpName (error via onError)',
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
    options: {
      onError: jest.fn(),
    },
    idpName: 'invalid',
  },
  {
    title: 'invalid idpName (error via Notification Center)',
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
    idpName: 'invalid',
  },
  {
    title: 'authorizeEndpoint not defined',
    props: {
      settings: {
        idp: {
          default: oidcServer({
            clientId: 'mock_client_id',
            scope: 'openid email profile',
            loginCallbackRoute: 'http://localhost/login/callback',
          }),
        },
      },
    },
    options: {
      onError: jest.fn(),
    },
    idpName: 'default',
  },
  {
    title: 'client_id not defined',
    props: {
      settings: {
        idp: {
          default: oidcServer({
            authorizeEndpoint: 'https://mockidp.com/oauth2/auth',
            scope: 'openid email profile',
            loginCallbackRoute: 'http://localhost/login/callback',
          }),
        },
      },
    },
    options: {
      onError: jest.fn(),
    },
    idpName: 'default',
  },
];

describe('it handles error when building OIDC authorization URL', () => {
  oidcErrorTests.forEach((test) => {
    it(`${test.title}`, async () => {
      const { findByTestId, getByTestId } = render(
        <>
          <UseLoginWidget idpName={test.idpName} options={test.options} />
          <LoginNotificationWidget />
        </>,
        test.props,
      );
      // logout has been realized -> user is not logged in
      await findByTestId('error-container', undefined, { timeout: 200 });
      expect(getByTestId('error-container')).toBeDefined();

      const href = window.location.href;
      expect(href).toBeDefined();
      expect(href).toBe('');
      if (test.options?.onError) {
        expect(test.options.onError).toHaveBeenCalled();
      } else {
        expect(getByTestId('notifications-error-container')).toBeDefined();
      }
    });
  });
});
