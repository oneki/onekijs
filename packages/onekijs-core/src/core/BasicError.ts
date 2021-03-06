import { BasicError } from '../typings/error';
import { AnonymousObject } from '../typings/object';

export default class DefaultBasicError extends Error implements BasicError {
  code: string | number;
  payload: AnonymousObject;
  constructor(message: string, code?: string | number, payload: AnonymousObject = {}) {
    super(message);
    this.code = code || 'default';
    this.payload = payload;
  }
}
