import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { act, fireEvent, render, TestAppProps } from '../../__tests__/customRenderer';
import { loginEndpoint, logoutEndpoint, userinfoEndpoint } from '../../__tests__/utils/auth';
import { wait } from '../../__tests__/utils/timeout';
import { idpForm } from '../utils';
import UseLoginFormWidget from './components/UseLoginFormWidget';
import { IdpStorage, LoginOptions } from '../typings';

type TestProps = {
  title: string;
  props?: TestAppProps;
  options?: LoginOptions;
};

const tests: TestProps[] = [
  {
    title: 'server returns tokens (access, refresh, id)',
    props: {
      settings: {
        idp: {
          default: idpForm({
            loginEndpoint,
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
      const { getByText } = render(
        <>
          <UseLoginFormWidget idpName="default" options={test.options} />
          <NotificationWidget />
        </>,
        test.props,
      );
      fireEvent.click(getByText(`Submit`));
      await act(async () => {
        await wait(() => {
          return window.location.href !== '';
        }, 500);
        // const settings = test.props?.settings as AppSettings;
        const href = window.location.href;
        expect(href).toBeDefined();
        expect(href).toBe(from);
        expect(test.options?.onError).not.toHaveBeenCalled();
        // expect(query.client_id).toBe(settings.idp.default.clientId);
        // expect(query.code_challenge).toBeDefined();
        // expect(query.code_challenge_method).toBe('S256');
        // expect(query.redirect_uri).toBeDefined();
        // expect(query.response_type).toBe('code');
        // expect(query.scope).toBe(settings.idp.default.scope);
        // expect(query.state).toBeDefined();

        localStorage.removeItem('onekijs.from');
      });
    });
  });
});
