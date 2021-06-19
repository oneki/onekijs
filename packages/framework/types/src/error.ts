import { ResultCallback } from './callback';
import { AnonymousObject } from './object';

export interface BasicError extends Error {
  code: string | number;
  payload: AnonymousObject;
}

export type ErrorCallback<T extends BasicError = BasicError> = ResultCallback<T>;
