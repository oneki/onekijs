import { FC } from 'react';

export type MyGenericType<T> = {
  foo: T;
};

export type ComponentProps = {
  /**
   * The name of the user
   *
   * ```
   * this is a block
   *   with multi line
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

/**
 * This is the documentation of the component
 * The goal is to have **markdown** tag in the descrition
 *
 * This description could be quite long
 *
 * @group Components
 */
export const MyComponent: FC<ComponentProps> = ({ name }) => {
  return null;
};

// export interface Notification {
//   payload: any;
//   id: string | number;
//   topic: string;
//   timestamp: number;
//   expires: number | null;
//   persist: boolean;
//   ttl?: number;
//   remove: () => void;
// }

// /**
//  * This is the description
//  *
//  * @param topic the topic with
//  * multiple lines ?
//  * ```
//  * test
//  * ```
//  * @returns
//  *
//  * @group Framework
//  * @category Notification
//  */
// export const useNotifications = (topic: string, firstname = 'toto'): Notification[] => {
//   return [];
// };
