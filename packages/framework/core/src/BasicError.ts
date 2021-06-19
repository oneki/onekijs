import { AnonymousObject, BasicError } from '@oneki/types';

export default class DefaultBasicError extends Error implements BasicError {
  code: string | number;
  payload: AnonymousObject;
  constructor(message: string, code?: string | number, payload: AnonymousObject = {}) {
    super(message);
    this.code = code || 'default';
    this.payload = payload;
  }
}
