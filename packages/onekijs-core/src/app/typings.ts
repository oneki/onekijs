import { ComponentType, ElementType, ErrorInfo } from 'react';
import { DefaultRootState } from 'react-redux';
import { Action, AnyAction, Store } from 'redux';
import { Saga } from 'redux-saga';
import BasicError from '../core/BasicError';
import Service from '../core/Service';
import { AnonymousObject, AnyState, Class } from '../core/typings';
import Router from '../router/Router';
import AppContext from './AppContext';

export const CONTEXT_ID = Symbol();
export const reducersSymbol = Symbol('onekijs.store.reducers');
export const sagasSymbol = Symbol('onekijs.store.sagas');
export type AppErrorCallback<T extends BasicError = BasicError> = AppResultCallback<T>;
export interface AppProps {
  settings?: AppSettings | Promise<AppSettings>;
  store?: AppStore;
  initialState?: AnyState | Promise<AnyState>;
  services?: Class<Service>[];
  LoadingComponent?: ElementType;
  initialLocale?: string;
  translations?: AnonymousObject<AnonymousObject<string>>;
  i18nNs?: string[];
  ErrorBoundaryComponent?: ComponentType<ErrorBoundaryComponentProps>;
}
export interface AppProviderProps extends Omit<AppProps, 'initialState' | 'LoadingComponent'> {
  settings: AppSettings;
  store: AppStore;
  router: Router;
}
export type AppResultCallback<T = any> = string | [string, string] | ((result: T, context: AppContext) => void);
export interface AppSettings {
  [propName: string]: any;
}
export interface AppStateProps extends AppProps {
  router: Router;
}
export interface AppStore<S = any, A extends Action = AnyAction> extends Store<S, A> {
  [reducersSymbol]: AnonymousObject;
  [sagasSymbol]: AnonymousObject;
  runSaga: (namespace: string, saga: Saga<any[]>, name: string) => void;
  cancelSaga: (namespace: string, name: string) => void;
  injectReducers: (bind: Service, namespace: string, reducers: AnonymousObject) => void;
  removeReducers: (namespace: string, reducers: AnonymousObject) => void;
}
export type AppSuccessCallback<T = any> = AppResultCallback<T>;
export type ErrorBoundaryComponentProps = {
  error?: Error;
  errorInfo?: ErrorInfo;
};
export type GlobalModifierFunction = (key: string, value: unknown) => void;
export type GlobalSelectorFunction = (state: DefaultRootState) => unknown;
export type SetGlobalStateFunction<T> = (value?: T | null | undefined) => void;
