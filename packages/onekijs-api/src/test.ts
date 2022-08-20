import { FC } from 'react';

export type MyGenericType<T> = {
  foo: T;
};

export type ComponentProps = {
  name: string | number;
  lastname?: string;
  type: Promise<MyGenericType<string>>;
};

export const MyComponent: FC<ComponentProps> = ({ name }) => {
  return null;
};
