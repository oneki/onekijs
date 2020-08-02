import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { act, render, TestAppProps } from '../../__tests__/customRenderer';
import { idTokenClaims, loginTokenEndpoint, logoutTokenEndpoint, token } from '../../__tests__/utils/auth';
import { IdpStorage, LoginOptions } from '../typings';
import { idpForm } from '../utils';
import UseLogoutWidget from './components/UseLogoutWidget';
import { wait } from '../../__tests__/utils/timeout';

type TestProps = {
  title: string;
  props?: TestAppProps;
  options?: LoginOptions;
};

const tests: TestProps[] = [
  {
    title: 'server returns tokens',
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
];

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

describe('it authenticates via a form', () => {
  tests.forEach((test) => {
    it(`${test.title}`, async () => {
      const idToken = token(idTokenClaims);
      localStorage.setItem('onekijs.id_token', idToken);
      localStorage.setItem('onekijs.access_token', token({}));
      localStorage.setItem('onekijs.token_type', 'bearer');
      localStorage.setItem('onekijs.idpName', 'default');
      localStorage.setItem('onekijs.expires_at', `${new Date().getTime() + 86400000}`);
      const { getByTestId, findByText } = render(
        <>
          <UseLogoutWidget options={test.options} />
          <NotificationWidget />
        </>,
        test.props,
      );
      // user is not yet logged in
      await findByText(idTokenClaims.email, undefined, { timeout: 200 });
      expect(getByTestId('logged-user')).toHaveTextContent(idTokenClaims.email);

      await act(async () => {
        await wait(() => {
          return window.location.href !== '';
        }, 500);
        // if username/password is correct, user should be redirected to the original page (= from)
        expect(test.options?.onError).not.toHaveBeenCalled();
        const href = window.location.href;
        expect(href).toBeDefined();
        expect(href).toBe('http://localhost/logged-out');

        // The security context should contain the data of the user
        await findByText('not logged', undefined, { timeout: 200 });
        expect(getByTestId('logged-user')).toHaveTextContent('not logged');

        localStorage.removeItem('onekijs.id_token');
        localStorage.removeItem('onekijs.token_type');
        localStorage.removeItem('onekijs.idpName');
        localStorage.removeItem('onekijs.expires_at');
      });
    });
  });
});
