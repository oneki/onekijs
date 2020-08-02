import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { render, TestAppProps } from '../../__tests__/customRenderer';
import { idTokenClaims, loginTokenEndpoint, logoutTokenEndpoint, token } from '../../__tests__/utils/auth';
import { IdpStorage, LoginOptions } from '../typings';
import { idpForm } from '../utils';
import LogoutNotificationWidget from './components/LogoutNotificationWidget';
import UseLogoutWidget from './components/UseLogoutWidget';

type TestProps = {
  title: string;
  props?: TestAppProps;
  options?: LoginOptions;
};

const { location } = window;

beforeEach((): void => {
  delete window.location;
  (window as any).location = {
    href: '',
  };
  const idToken = token(idTokenClaims);
  localStorage.setItem('onekijs.id_token', idToken);
  localStorage.setItem('onekijs.access_token', token({}));
  localStorage.setItem('onekijs.token_type', 'bearer');
  localStorage.setItem('onekijs.idpName', 'default');
  localStorage.setItem('onekijs.expires_at', `${new Date().getTime() + 86400000}`);
});

afterEach((): void => {
  window.location = location;
  localStorage.removeItem('onekijs.id_token');
  localStorage.removeItem('onekijs.token_type');
  localStorage.removeItem('onekijs.idpName');
  localStorage.removeItem('onekijs.expires_at');
});

const tests: TestProps[] = [
  {
    title: 'logout with redirect to routes.home',
    props: {
      settings: {
        idp: {
          default: idpForm({
            loginEndpoint: loginTokenEndpoint,
            logoutEndpoint: logoutTokenEndpoint,
            userinfoEndpoint: 'token://id_token',
            callback: 'token',
            persist: IdpStorage.LocalStorage,
          }),
        },
        routes: {
          home: 'http://localhost/logged-out',
        },
      },
    },
    options: {
      onError: jest.fn(),
    },
  },
  {
    title: 'logout with onSuccess callback',
    props: {
      settings: {
        idp: {
          default: idpForm({
            loginEndpoint: loginTokenEndpoint,
            logoutEndpoint: logoutTokenEndpoint,
            userinfoEndpoint: 'token://id_token',
            callback: 'token',
            persist: IdpStorage.LocalStorage,
          }),
        },
        routes: {
          home: 'http://localhost/logged-out',
        },
      },
    },
    options: {
      onError: jest.fn(),
      onSuccess: jest.fn(),
    },
  },
];

describe('it logs out successfully', () => {
  tests.forEach((test) => {
    it(`${test.title}`, async () => {
      const { getByTestId, findByText } = render(
        <>
          <UseLogoutWidget options={test.options} />
          <NotificationWidget />
        </>,
        test.props,
      );
      // user is logged
      await findByText(idTokenClaims.email, undefined, { timeout: 200 });
      expect(getByTestId('logged-user')).toHaveTextContent(idTokenClaims.email);

      // logout has been realized -> user is not logged in
      await findByText('not logged', undefined, { timeout: 200 });
      expect(getByTestId('logged-user')).toHaveTextContent('not logged');

      if (test.options?.onSuccess) {
        expect(test.options.onSuccess).toHaveBeenCalled();
      } else {
        // if username/password is correct, user should be redirected to settings.routes.home
        expect(test.options?.onError).not.toHaveBeenCalled();
        const href = window.location.href;
        expect(href).toBeDefined();
        expect(href).toBe('http://localhost/logged-out');
      }
    });
  });
});

const errorTests: TestProps[] = [
  {
    title: 'Error handling via onError',
    props: {
      settings: {
        idp: {
          default: idpForm({
            loginEndpoint: loginTokenEndpoint,
            logoutEndpoint: 'http://localhost/error',
            userinfoEndpoint: 'token://id_token',
            callback: 'token',
            persist: IdpStorage.LocalStorage,
          }),
        },
        routes: {
          home: 'http://localhost/logged-out',
        },
      },
    },
    options: {
      onError: jest.fn(),
      onSuccess: jest.fn(),
    },
  },
  {
    title: 'Error handling via notification center',
    props: {
      settings: {
        idp: {
          default: idpForm({
            loginEndpoint: loginTokenEndpoint,
            logoutEndpoint: 'http://localhost/error',
            userinfoEndpoint: 'token://id_token',
            callback: 'token',
            persist: IdpStorage.LocalStorage,
          }),
        },
        routes: {
          home: 'http://localhost/logged-out',
        },
      },
    },
  },
];

describe('it logs out unsuccessfully (server error)', () => {
  errorTests.forEach((test) => {
    it(`${test.title}`, async () => {
      const { getByTestId, findByText, findByTestId } = render(
        <>
          <UseLogoutWidget options={test.options} />
          <LogoutNotificationWidget />
        </>,
        test.props,
      );
      // user is logged
      await findByText(idTokenClaims.email, undefined, { timeout: 200 });
      expect(getByTestId('logged-user')).toHaveTextContent(idTokenClaims.email);

      // logout has been realized -> user is not logged in
      await findByTestId('error-container', undefined, { timeout: 200 });
      expect(getByTestId('logged-user')).toHaveTextContent(idTokenClaims.email);
      expect(getByTestId('error-container')).toHaveTextContent('this is the error message');

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
