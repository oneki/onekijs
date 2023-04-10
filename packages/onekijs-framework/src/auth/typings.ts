import { ComponentPropsWithoutRef, ElementType } from 'react';
import { AppErrorCallback, AppSuccessCallback } from '../app/typings';
import BasicError from '../core/BasicError';
import { AppContext } from '../types/app';
import { Auth } from '../types/auth';
import { AnonymousObject } from '../types/object';
import { State } from '../types/state';

export interface AuthErrorProps {
  error: { code: number };
}

export enum IdpClientAuth {
  Basic = 'basic',
  Body = 'body',
}

export enum IdpCodeChallengeMethod {
  S256 = 'S256',
}

export enum IdpPubKeyAlgorithm {
  RS256 = 'RS256',
}

export enum IdpStorage {
  LocalStorage = 'localStorage',
  SessionStorage = 'sessionStorage',
  Cookie = 'cookie',
  Memory = 'memory',
}

export enum IdpType {
  OidcBrowser = 'oidc_browser',
  OidcServer = 'oidc_server',
  Oauth2Browser = 'oauth2_browser',
  Oauth2Server = 'oauth2_server',
  Form = 'form',
  External = 'external',
}

export enum IdpResponseType {
  Code = 'code',
}

export enum IdpContentType {
  Json = 'application/json',
  Xml = 'application/xml',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export enum IdpMethod {
  Get = 'GET',
  Post = 'POST',
}

export interface IdpSettings extends AnonymousObject {
  authorizeEndpoint?: string | ((params: AnonymousObject, idp: Idp, context: AppContext) => string | Promise<string>);
  callback?: 'token' | 'securityContext' | ((response: any, idp: Idp, context: AppContext) => [any?, AnonymousObject?]);
  clientAuth?: IdpClientAuth;
  clientId?: string;
  clientSecret?: string;
  clockSkew?: number;
  codeChallengeMethod?: IdpCodeChallengeMethod;
  cookieCrypt?: boolean;
  cookiePath?: string;
  cookieSecure?: boolean;
  cookieTTL?: number;
  external?: boolean;
  externalLoginEndpoint?: string | ((idp: Idp, context: AppContext) => string);
  externalLogoutEndpoint?: string | ((idp: Idp, context: AppContext) => string);
  identity?: string;
  jwksEndpoint?: string | ((token: any, idp: Idp, context: AppContext) => string);
  loginCallbackRoute?: string;
  loginContentType?: IdpContentType;
  loginEndpoint?: string | ((data: AnonymousObject, idp: Idp, context: AppContext) => unknown);
  loginMethod?: IdpMethod;
  logoutMethod?: IdpMethod;
  logoutCallbackRoute?: string;
  logoutEndpoint?: string | ((idp: Idp, context: AppContext) => string);
  logoutRoute?: string;
  name?: string;
  nonce?: boolean;
  oauth2?: boolean;
  oidc?: boolean;
  passwordKey?: string;
  rememberMeKey?: string;
  usernameKey?: string;
  persist?: 'localStorage' | 'sessionStorage' | 'cookie' | 'memory';
  pkce?: boolean;
  postLoginRedirectKey?: string;
  postLogoutRedirectKey?: string;
  pubKeyAlgorithm?: IdpPubKeyAlgorithm;
  responseType?: IdpResponseType;
  scope?: string;
  state?: boolean;
  type?: 'oidc_browser' | 'oidc_server' | 'form' | 'external' | 'oauth2_browser' | 'oauth2_server';
  tokenEndpoint?: string | ((grant_type: string, idp: Idp, context: AppContext) => string);
  userinfoEndpoint?: string | ((idp: Idp, context: AppContext) => string);
  validate?: boolean;
}

export interface Idp extends IdpSettings {
  external: boolean;
  name: string;
  oauth2: boolean;
  oidc: boolean;
  type: IdpType;
  tokenEndpoint?: string | ((grant_type: string, idp: Idp, context: AppContext) => string);
  userinfoEndpoint?: string | ((idp: Idp, context: AppContext) => string);
  validate?: boolean;
}

export interface LoginOptions {
  /**
   * Called if the login request failed.
   * Mainly used for Form based authentication
   *
   * @defaultvalue 'a function that sends a notification on the topic `login-error`'
   */
  onError?: AppErrorCallback;
  /**
   * alled if the login request was successful.<br/>Mainly used for Form based authentication
   *
   * @defaultvalue 'a function that redirects the user to the original requested page or the homepage'
   */
  onSuccess?: AppSuccessCallback;
  callback?: boolean;
}

export interface LogoutOptions {
  onError?: AppErrorCallback;
  onSuccess?: AppSuccessCallback;
  callback?: boolean;
  identity?: string;
}

export interface LoginState extends State {
  loading?: boolean;
  error?: BasicError;
}

export interface LogoutState {
  loading?: boolean;
  error?: BasicError;
}

export type SecureRouteProps = ComponentPropsWithoutRef<any> & {
  component: ElementType;
};

export interface SecurePageProps<T = any> {
  securityContext: T;
  auth: Auth;
}
