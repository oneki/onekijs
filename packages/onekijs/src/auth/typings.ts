import { ErrorCallback, SuccessCallback, State, AnonymousObject } from '../core/typings';
import BasicError from '../core/BasicError';
import { ComponentPropsWithoutRef, ElementType } from 'react';
import AppContext from '../app/AppContext';

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
  callback?: string | ((response: any, idp: Idp, context: AppContext) => [any?, AnonymousObject?]);
  clientAuth?: IdpClientAuth;
  clientId?: string;
  clientSecret?: string;
  clockSkew?: number;
  codeChallengeMethod?: IdpCodeChallengeMethod;
  cookieTTL?: number;
  external?: boolean;
  externalLoginEndpoint?: string | ((idp: Idp, context: AppContext) => string);
  externalLogoutEndpoint?: string | ((idp: Idp, context: AppContext) => string);
  jwksEndpoint?: string | ((token: any, idp: Idp, context: AppContext) => string);
  loginCallbackRoute?: string;
  loginContentType?: IdpContentType;
  loginEndpoint?: string | ((data: AnonymousObject, idp: Idp, context: AppContext) => string);
  loginMethod?: IdpMethod;
  logoutMethod?: IdpMethod;
  logoutCallbackRoute?: string;
  logoutEndpoint?: string | ((idp: Idp, context: AppContext) => string);
  name?: string;
  nonce?: boolean;
  oauth2?: boolean;
  oidc?: boolean;
  passwordKey?: string;
  rememberMeKey?: string;
  usernameKey?: string;
  persist?: IdpStorage;
  pkce?: boolean;
  postLoginRedirectKey?: string;
  postLogoutRedirectKey?: string;
  pubKeyAlgorithm?: IdpPubKeyAlgorithm;
  responseType?: IdpResponseType;
  scope?: string;
  state?: boolean;
  type?: IdpType;
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
  onError?: ErrorCallback;
  onSuccess?: SuccessCallback;
  callback?: boolean;
}

export interface LogoutOptions {
  onError?: ErrorCallback;
  onSuccess?: SuccessCallback;
  callback?: boolean;
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
