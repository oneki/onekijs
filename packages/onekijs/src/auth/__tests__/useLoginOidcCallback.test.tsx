import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render, TestAppProps } from '../../__tests__/customRenderer';
import {
  authorizationCode,
  authorizeEndpoint,
  clientId,
  nonce,
  oauthLogoutEndpoint,
  redirectUri,
  state,
  stateSha,
  tokenEndpoint,
  userinfoEndpoint,
  verifier,
} from '../../__tests__/utils/auth';
import { IdpStorage, IdpType, LoginOptions } from '../typings';
import { oidcServer } from '../utils';
import LoginNotificationWidget from './components/LoginNotificationWidget';
import UseLoginCallbackWidget from './components/UseLoginCallbackWidget';

type TestProps = {
  title: string;
  props?: TestAppProps;
  options?: LoginOptions;
  state?: string;
  code?: string;
};

const { location } = window;
const from = 'http://localhost/admin';

beforeEach((): void => {
  delete window.location;
  (window as any).location = {
    href: '',
    search: `?code=${authorizationCode}&state=${stateSha}`,
    hash: '',
  };
  localStorage.setItem('onekijs.from', from);
  localStorage.setItem('onekijs.nonce', nonce);
  localStorage.setItem('onekijs.state', state);
  localStorage.setItem('onekijs.verifier', verifier);
});

afterEach((): void => {
  window.location = location;
  localStorage.removeItem('onekijs.from');
  localStorage.removeItem('onekijs.nonce');
  localStorage.removeItem('onekijs.state');
  localStorage.removeItem('onekijs.verifier');
});

// const tests: TestProps[] = [
//   {
//     title: 'oidc_server/default config',
//     props: {
//       settings: {
//         idp: {
//           default: oidcServer({
//             type: IdpType.OidcServer,
//             clientId: clientId,
//             authorizeEndpoint,
//             tokenEndpoint,
//             userinfoEndpoint,
//             logoutEndpoint: oauthLogoutEndpoint,
//             scope: 'openid email profile',
//             loginCallbackRoute: redirectUri,
//             persist: IdpStorage.Memory,
//           }),
//         },
//       },
//     },
//   },
//   {
//     title: 'oidc_server/nonce=true',
//     props: {
//       settings: {
//         idp: {
//           default: oidcServer({
//             type: IdpType.OidcServer,
//             clientId: clientId,
//             authorizeEndpoint,
//             tokenEndpoint: tokenWithPkceEndpoint,
//             userinfoEndpoint,
//             logoutEndpoint: oauthLogoutEndpoint,
//             scope: 'openid email profile',
//             loginCallbackRoute: redirectUri,
//             persist: IdpStorage.Memory,
//             nonce: true,
//           }),
//         },
//       },
//     },
//   },
//   {
//     title: 'oidc_browser/default config',
//     props: {
//       settings: {
//         idp: {
//           default: oidcBrowser({
//             type: IdpType.OidcBrowser,
//             clientId: clientId,
//             authorizeEndpoint,
//             tokenEndpoint: tokenWithPkceEndpoint,
//             userinfoEndpoint,
//             logoutEndpoint: oauthLogoutEndpoint,
//             jwksEndpoint,
//             scope: 'openid email profile',
//             loginCallbackRoute: redirectUri,
//             persist: IdpStorage.Memory,
//           }),
//         },
//       },
//     },
//   },
// ];

// describe('it handles OIDC auth callback', () => {
//   tests.forEach((test) => {
//     it(`${test.title}`, async () => {
//       render(
//         <>
//           <UseLoginCallbackWidget idpName="default" />
//           <NotificationWidget />
//         </>,
//         test.props,
//       );
//       await act(async () => {
//         await wait(() => {
//           return window.location.href !== '';
//         }, 500);
//         // const settings = test.props?.settings as AppSettings;
//         const href = window.location.href;
//         expect(href).toBeDefined();
//         expect(href).toBe(from);
//       });
//     });
//   });
// });

const errorTests: TestProps[] = [
  {
    title: 'handle invalid state via onError',
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
    options: {
      onError: jest.fn(),
    },
    code: authorizationCode,
    state: 'invalid_state',
  },
  // {
  //   title: 'handle invalid state via notification center',
  //   props: {
  //     settings: {
  //       idp: {
  //         default: oidcServer({
  //           type: IdpType.OidcServer,
  //           clientId: clientId,
  //           authorizeEndpoint,
  //           tokenEndpoint,
  //           userinfoEndpoint,
  //           logoutEndpoint: oauthLogoutEndpoint,
  //           scope: 'openid email profile',
  //           loginCallbackRoute: redirectUri,
  //           persist: IdpStorage.Memory,
  //         }),
  //       },
  //     },
  //   },
  //   code: authorizationCode,
  //   state: 'invalid_state',
  // },
  // {
  //   title: 'handle invalid code via onError',
  //   props: {
  //     settings: {
  //       idp: {
  //         default: oidcServer({
  //           type: IdpType.OidcServer,
  //           clientId: clientId,
  //           authorizeEndpoint,
  //           tokenEndpoint,
  //           userinfoEndpoint,
  //           logoutEndpoint: oauthLogoutEndpoint,
  //           scope: 'openid email profile',
  //           loginCallbackRoute: redirectUri,
  //           persist: IdpStorage.Memory,
  //         }),
  //       },
  //     },
  //   },
  //   options: {
  //     onError: jest.fn(),
  //   },
  //   code: 'invalid_code',
  //   state: stateSha,
  // },
  // {
  //   title: 'handle invalid code via notification center',
  //   props: {
  //     settings: {
  //       idp: {
  //         default: oidcServer({
  //           type: IdpType.OidcServer,
  //           clientId: clientId,
  //           authorizeEndpoint,
  //           tokenEndpoint,
  //           userinfoEndpoint,
  //           logoutEndpoint: oauthLogoutEndpoint,
  //           scope: 'openid email profile',
  //           loginCallbackRoute: redirectUri,
  //           persist: IdpStorage.Memory,
  //         }),
  //       },
  //     },
  //   },
  //   code: 'invalid_code',
  //   state: stateSha,
  // },
];

describe('it handles invalid callback URL', () => {
  errorTests.forEach((test) => {
    it(`${test.title}`, async () => {
      (window as any).location = {
        href: '',
        search: `?code=${test.code}&state=${test.state}`,
        hash: '',
      };
      const { findByTestId, getByTestId } = render(
        <>
          <UseLoginCallbackWidget idpName="default" options={test.options} />
          <LoginNotificationWidget />
        </>,
        test.props,
      );
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
