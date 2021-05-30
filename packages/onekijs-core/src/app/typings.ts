import { ComponentType, ElementType, ErrorInfo } from 'react';
import { DefaultRootState } from 'react-redux';
import DefaultBasicError from '../core/BasicError';
import DefaultService from '../core/Service';
import { AppContext, AppSettings, AppStore } from '../typings/app';
import { BasicError } from '../typings/error';
import { AnonymousObject, Class } from '../typings/object';
import { Router } from '../typings/router';
import { AnyState } from '../typings/state';

export const CONTEXT_ID = Symbol();
export type AppErrorCallback<T extends BasicError = DefaultBasicError> = AppResultCallback<T>;
export interface AppProps {
  settings?: AppSettings | Promise<AppSettings>;
  store?: AppStore;
  initialState?: AnyState | Promise<AnyState>;
  services?: Class<DefaultService>[];
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
export type AppResultCallback<T = any> = string | ((result: T, context: AppContext) => void);
export interface AppStateProps extends AppProps {
  router: Router;
}
// export interface AppStore<S = any, A extends Action = AnyAction> extends Store<S, A> {
//   [reducersSymbol]: AnonymousObject;
//   [sagasSymbol]: AnonymousObject;
//   runSaga: (namespace: string, saga: Saga<any[]>, name: string) => void;
//   cancelSaga: (namespace: string, name: string) => void;
//   injectReducers: (bind: DefaultService, namespace: string, reducers: AnonymousObject) => void;
//   removeReducers: (namespace: string, reducers: AnonymousObject) => void;
// }
export type AppSuccessCallback<T = any> = AppResultCallback<T>;
export type ErrorBoundaryComponentProps = {
  error?: Error;
  errorInfo?: ErrorInfo;
};
export type GlobalModifierFunction = (key: string, value: unknown) => void;
export type GlobalSelectorFunction = (state: DefaultRootState) => unknown;
export type SetGlobalStateFunction<T> = (value?: T | null | undefined) => void;
