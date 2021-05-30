import { State, AnonymousObject } from '../core/typings';
import DefaultBasicError from '../core/BasicError';
import { ComponentPropsWithoutRef, ElementType } from 'react';
import BasicAppContext from '../app/AppContext';
import { AppErrorCallback, AppSuccessCallback } from '../app/typings';

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
  authorizeEndpoint?: string | ((params: AnonymousObject, idp: Idp, context: BasicAppContext) => string | Promise<string>);
  callback?: 'token' | 'securityContext' | ((response: any, idp: Idp, context: BasicAppContext) => [any?, AnonymousObject?]);
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
  externalLoginEndpoint?: string | ((idp: Idp, context: BasicAppContext) => string);
  externalLogoutEndpoint?: string | ((idp: Idp, context: BasicAppContext) => string);
  jwksEndpoint?: string | ((token: any, idp: Idp, context: BasicAppContext) => string);
  loginCallbackRoute?: string;
  loginContentType?: IdpContentType;
  loginEndpoint?: string | ((data: AnonymousObject, idp: Idp, context: BasicAppContext) => string);
  loginMethod?: IdpMethod;
  logoutMethod?: IdpMethod;
  logoutCallbackRoute?: string;
  logoutEndpoint?: string | ((idp: Idp, context: BasicAppContext) => string);
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
  tokenEndpoint?: string | ((grant_type: string, idp: Idp, context: BasicAppContext) => string);
  userinfoEndpoint?: string | ((idp: Idp, context: BasicAppContext) => string);
  validate?: boolean;
}

export interface Idp extends IdpSettings {
  external: boolean;
  name: string;
  oauth2: boolean;
  oidc: boolean;
  type: IdpType;
  tokenEndpoint?: string | ((grant_type: string, idp: Idp, context: BasicAppContext) => string);
  userinfoEndpoint?: string | ((idp: Idp, context: BasicAppContext) => string);
  validate?: boolean;
}

export interface LoginOptions {
  onError?: AppErrorCallback;
  onSuccess?: AppSuccessCallback;
  callback?: boolean;
}

export interface LogoutOptions {
  onError?: AppErrorCallback;
  onSuccess?: AppSuccessCallback;
  callback?: boolean;
}

export interface LoginState extends State {
  loading?: boolean;
  error?: DefaultBasicError;
}

export interface LogoutState {
  loading?: boolean;
  error?: DefaultBasicError;
}

export type SecureRouteProps = ComponentPropsWithoutRef<any> & {
  component: ElementType;
};

export interface OidcToken {
  access_token: string;
  id_token?: string;
  refresh_token?: string;
  token_type: string;
  expires_in: string;
  expires_at?: string;
}

export type Token = string | OidcToken;

export interface BasicAuth {
  user: string;
  password: string;
}

export interface Auth {
  token?: Token;
  basic?: BasicAuth;
}

export interface SecurePageProps<T = any> {
  securityContext: T;
  auth: Auth;
}
