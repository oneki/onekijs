import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import NotificationWidget from '../../__tests__/components/NotificationWidget';
import { act, render, TestAppProps } from '../../__tests__/customRenderer';
import { externalLoginEndpoint } from '../../__tests__/utils/auth';
import { wait } from '../../__tests__/utils/timeout';
import { LoginOptions } from '../typings';
import { external } from '../utils';
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

const externalTests: TestProps[] = [
  {
    title: 'redirect to external Login (onError not called)',
    props: {
      settings: {
        idp: {
          default: external({
            externalLoginEndpoint: externalLoginEndpoint,
            loginCallbackRoute: 'http://localhost/login/callback',
          }),
        },
      },
    },
    options: {
      onError: jest.fn(),
    },
  },
  {
    title: 'redirect to external Login (no notification error)',
    props: {
      settings: {
        idp: {
          default: external({
            externalLoginEndpoint: externalLoginEndpoint,
            loginCallbackRoute: 'http://localhost/login/callback',
          }),
        },
      },
    },
  },
];

describe('it builds external login URL', () => {
  externalTests.forEach((test) => {
    it(`${test.title}`, async () => {
      const { queryByTestId } = render(
        <>
          <UseLoginWidget idpName="default" options={test.options} />
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
        expect(href).toBe(
          `${
            (test.props?.settings as any).idp.default.externalLoginEndpoint
          }?redirect_uri=http://localhost/login/callback`,
        );
        if (test.options?.onError) {
          expect(test.options.onError).not.toHaveBeenCalled();
        } else {
          expect(queryByTestId('notifications-error-container')).toBeNull();
        }
      });
    });
  });
});
