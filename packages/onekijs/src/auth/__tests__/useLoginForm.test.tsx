import '@testing-library/jest-dom/extend-expect';
import { JWT } from 'jose';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { act, fireEvent, render, TestAppProps } from '../../__tests__/customRenderer';
import {
  idTokenClaims,
  loginEndpoint,
  loginTokenEndpoint,
  logoutEndpoint,
  userinfoEndpoint,
  loginCustomKeyEndpoint,
} from '../../__tests__/utils/auth';
import { wait } from '../../__tests__/utils/timeout';
import { IdpStorage, LoginOptions } from '../typings';
import { idpForm } from '../utils';
import UseLoginFormWidget from './components/UseLoginFormWidget';

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
            logoutEndpoint,
            userinfoEndpoint,
            callback: 'token',
            persist: IdpStorage.Memory,
          }),
        },
      },
    },
    options: {
      onError: jest.fn(),
    },
  },
  {
    title: 'server returns tokens: custom callback',
    props: {
      settings: {
        idp: {
          default: idpForm({
            loginEndpoint: loginTokenEndpoint,
            logoutEndpoint,
            userinfoEndpoint,
            callback: (response) => {
              // [token, securityContext]
              return [response, JWT.decode(response.id_token)];
            },
            persist: IdpStorage.Memory,
          }),
        },
      },
    },
    options: {
      onError: jest.fn(),
    },
  },
  {
    title: 'server returns the security context',
    props: {
      settings: {
        idp: {
          default: idpForm({
            loginEndpoint,
            logoutEndpoint,
            userinfoEndpoint,
            callback: 'securityContext',
            persist: IdpStorage.Memory,
          }),
        },
      },
    },
    options: {
      onError: jest.fn(),
    },
  },
  {
    title: 'server returns the security context: custom callback',
    props: {
      settings: {
        idp: {
          default: idpForm({
            loginEndpoint,
            logoutEndpoint,
            userinfoEndpoint,
            persist: IdpStorage.Memory,
            callback: (response) => {
              return [undefined, response];
            },
          }),
        },
      },
    },
    options: {
      onError: jest.fn(),
    },
  },
  {
    title: 'custom usernameKey and passwordKey',
    props: {
      settings: {
        idp: {
          default: idpForm({
            loginEndpoint: loginCustomKeyEndpoint,
            logoutEndpoint,
            userinfoEndpoint,
            callback: 'securityContext',
            persist: IdpStorage.Memory,
            usernameKey: 'surname',
            passwordKey: 'pwd',
          }),
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
      const from = 'http://localhost/admin';
      localStorage.setItem('onekijs.from', from);
      const { getByText, getByTestId } = render(
        <>
          <UseLoginFormWidget idpName="default" options={test.options} />
          <NotificationWidget />
        </>,
        test.props,
      );
      // user is not yet logged in
      expect(getByTestId('logged-user')).toHaveTextContent('not logged');

      // user clicks on the submit button
      fireEvent.click(getByText(`Submit`));
      await act(async () => {
        await wait(() => {
          return window.location.href !== '';
        }, 500);
        // if username/password is correct, user should be redirected to the original page (= from)
        expect(test.options?.onError).not.toHaveBeenCalled();
        const href = window.location.href;
        expect(href).toBeDefined();
        expect(href).toBe(from);

        // The security context should contain the data of the user
        expect(getByTestId('logged-user')).toHaveTextContent(idTokenClaims.email);

        localStorage.removeItem('onekijs.from');
      });
    });
  });
});
