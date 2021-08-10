export interface AnonymousObject<T = any> {
  [propName: string]: T;
}
export type Class<T> = { new (...args: any[]): T };
