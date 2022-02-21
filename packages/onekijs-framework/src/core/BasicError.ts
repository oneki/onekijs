import { BasicError } from '../types/error';
import { AnonymousObject } from '../types/object';

export default class DefaultBasicError extends Error implements BasicError {
  code: string | number;
  payload: AnonymousObject;
  constructor(message: string, code?: string | number, payload: AnonymousObject = {}) {
    super(message);
    this.code = code || 'default';
    this.payload = payload;
  }
  static of(error: unknown): BasicError {
    if (error instanceof Error) {
      return new DefaultBasicError(error.message, error.name, { stack: error.stack });
    }
    if ((error as any).constructor === Object) {
      return new DefaultBasicError((error as any)['message'], (error as any)['code'], (error as any)['payload']);
    }
    return new DefaultBasicError('Unexpected exception', 'unexpected', { original: error });
  }
}
