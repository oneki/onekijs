import { ResultCallback } from './callback';
import { AnonymousObject } from './object';

export interface BasicError extends Error {
  code: string | number;
  payload: AnonymousObject;
  message: string;
}

export type ErrorCallback<T extends BasicError = BasicError> = ResultCallback<T>;
