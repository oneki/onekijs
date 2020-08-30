import qs from 'query-string';
import { ElementType } from 'react';
import { Action, AnyAction, Store } from 'redux';
import { Saga } from 'redux-saga';
import BasicError from '../core/BasicError';
import Service from '../core/Service';
import { AnonymousObject, AnyState, Class } from '../core/typings';
import AppContext from './AppContext';
import AppRouter from './AppRouter';

export const CONTEXT_ID = Symbol();
export const reducersSymbol = Symbol('onekijs.store.reducers');
export const sagasSymbol = Symbol('onekijs.store.sagas');

export interface AppProps {
  settings?: AppSettings | Promise<AppSettings>;
  store?: AppStore;
  initialState?: AnyState | Promise<AnyState>;
  services?: Class<Service>[];
  LoadingComponent?: ElementType;
  initialLocale?: string;
  translations?: AnonymousObject<AnonymousObject<string>>;
  i18nNs?: string[];
}

export interface AppStateProps extends AppProps {
  router: AppRouter;
}

export interface AppProviderProps extends Omit<AppProps, 'initialState' | 'LoadingComponent'> {
  settings: AppSettings;
  store: AppStore;
  router: AppRouter;
}

export interface AppStore<S = any, A extends Action = AnyAction> extends Store<S, A> {
  [reducersSymbol]: AnonymousObject;
  [sagasSymbol]: AnonymousObject;
  runSaga: (namespace: string, saga: Saga<any[]>, name: string) => void;
  cancelSaga: (namespace: string, name: string) => void;
  injectReducers: (bind: Service, namespace: string, reducers: AnonymousObject) => void;
  removeReducers: (namespace: string, reducers: AnonymousObject) => void;
}

export interface AppSettings {
  [propName: string]: any;
}

export interface Location {
  protocol?: string | null;
  hostname?: string;
  port?: string;
  pathname: string;
  query?: qs.ParsedQuery<string>;
  hash?: qs.ParsedQuery<string>;
  host?: string;
  href?: string;
  relativeurl?: string;
  baseurl?: string;
  state?: string;
  route?: string;
  params?: AnonymousObject;
}

export type LocationChangeCallback = (location: Location) => void;
export type AppResultCallback<T = any> = string | [string, string] | ((result: T, context: AppContext) => void);
export type AppErrorCallback<T extends BasicError = BasicError> = AppResultCallback<T>;
export type AppSuccessCallback<T = any> = AppResultCallback<T>;
