import { AnonymousObject } from './typings';

export default class BasicError extends Error {
  code: string | number;
  payload: AnonymousObject;
  constructor(message: string, code?: string | number, payload: AnonymousObject = {}) {
    super(message);
    this.code = code || 'default';
    this.payload = payload;
  }
}
