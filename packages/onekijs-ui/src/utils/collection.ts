import { Collection } from '../lib/typings';

export const isCollection = <T>(data: T[] | Collection<T>): data is Collection<T> => {
  return !Array.isArray(data);
};
