import { FC } from 'react';

export enum BreakpointKeys {
  /**
   * Extra small
   */
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

/**
 * Doc of TestInterface
 */
export interface TestInterface {
  /**
   * This is the doc of test
   */
  test: boolean;
  /**
   * This is the doc of test2
   *
   * @remarks #doc#
   */
  test2?: ComponentOptions;
}
/**
 *
 * @returns
 * An array of two elements :
 * - test: flag
 * - test2: flag
 */
export const testFuncArrow = (name: string): string => {
  return name;
};

/**
 *
 * @param name description of param
 *
 * @returns
 */
export function testFunc(name: TestInterface): string {
  if (name.test) {
    return 'test';
  } else {
    return 'tmp';
  }
}

export type MyGenericType<T> = {
  foo: T;
};

export type ComponentOptions = {
  /**
   * Flag to determine if the component is transferable
   */
  transferable: boolean;

  /**
   * this is the alias
   */
  alias: string;
};

export type ComponentProps = {
  /**
   * The name of the user
   *
   * ```
   * <div>
   *  <Input name="lastname" />
   * </div>
   * ```
   *
   * After the block code ><><>
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

  /**
   * Optional options
   *
   * @remarks #doc#
   */
  options?: ComponentOptions;
};

/**
 * This is the documentation of the component
 * The goal is to have **markdown** tag in the descrition
 *
 * This description could be quite long
 *
 * ### Signature
 * ```
 * const test = useForm('toto):
 * ```
 *
 * @group Form
 * @category Components
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
