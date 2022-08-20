import { FC } from 'react';

export type MyGenericType<T> = {
  foo: T;
};

export type ComponentProps = {
  /**
   * The name of the user
   *
   * ```ts
   * this is a block
   * with multi line
   * ```
   *
   * After the block code
   *
   * @example
   * Here is an example
   * ```
   * this is the example block code
   * ```
   */
  name: string | number;
  /**
   * The last name of the user
   *
   * @defaultValue Doe
   */
  lastname?: string;
  /**
   * The type of the user
   */
  type: Promise<MyGenericType<string>>;
};

export const MyComponent: FC<ComponentProps> = ({ name }) => {
  return null;
};
