import { FC } from 'react';

/**
 * Comment of NotificationService class
 */
export class NotificationService {
  constructor(public indexer: string) {
    console.log('test');
  }

  init(): void {
    console.log('test');
  }

  /**
   * Comment of the add operation
   * @param notification the notification to send
   * @returns a string indicating the status
   */
  add(notification: string): string {
    return 'test';
  }

  *error(payload: any) {
    yield console.log(payload.test);
  }
}

// export enum BreakpointKeys {
//   /**
//    * Extra small
//    */
//   xs = 'xs',
//   sm = 'sm',
//   md = 'md',
//   lg = 'lg',
//   xl = 'xl',
// }

// /**
//  * Doc of TestInterface
//  */
// export interface TestInterface {
//   /**
//    * This is the doc of test
//    */
//   test: boolean;
//   /**
//    * This is the doc of test2
//    *
//    * @remarks #doc#
//    */
//   test2?: ComponentOptions;
// }
// /**
//  * This is the description of testFuncArrow
//  * This function is awesone
//  *
//  * @example
//  * ```
//  * const { test } = testFunctionArray('foo');
//  * ```
//  *
//  * @returns
//  * An array of two elements :
//  * - test: flag
//  * - test2: flag
//  */
// export const testFuncArrow = (name: string): TestInterface => {
//   return {
//     test: true,
//   };
// };

// /**
//  *
//  * This is the description
//  * of testFunc
//  *
//  * ```
//  * Example code
//  * ```
//  *
//  * @typeParam T - the identity type
//  * @param name description of param
//  *
//  * @returns
//  * The result is something
//  *
//  * ```
//  * this is some code in the result
//  * ```
//  */
// export function testFunc<T>(name: TestInterface): string | undefined | MyGenericType<T> {
//   if (name.test) {
//     return 'test';
//   } else {
//     return 'tmp';
//   }
// }

// /**
//  * @typeParam T - the identity type
//  */
// export type MyGenericType<T> = {
//   foo: T;
// };

// export type ComponentOptions = {
//   /**
//    * Flag to determine if the component is transferable
//    */
//   transferable: boolean;

//   /**
//    * this is the alias
//    */
//   alias: string;
// };

// export type ComponentProps = {
//   /**
//    * The name of the user
//    *
//    * ```
//    * <div>
//    *  <Input name="lastname" />
//    * </div>
//    * ```
//    *
//    * After the block code ><><>
//    *
//    * @example
//    * Here is an example
//    * ```
//    * this is the example block code
//    * ```
//    */
//   name: string | number;
//   /**
//    * The last name of the user
//    *
//    * @defaultValue Doe
//    */
//   lastname?: string;
//   /**
//    * The type of the user
//    */
//   type: Promise<MyGenericType<string>>;

//   /**
//    * Optional options
//    *
//    * @remarks #doc#
//    */
//   options?: ComponentOptions;
// };

// /**
//  * This is the documentation of the component
//  * The goal is to have **markdown** tag in the descrition
//  *
//  * This description could be quite long
//  *
//  * ```
//  * const test = useForm('toto):
//  * ```
//  * <br/>
//  *
//  * @example
//  * ```
//  * <MyCompnent name="foo" />
//  * ```
//  *
//  * @remarks
//  * This is a useful remark !
//  *
//  * ```
//  * With some code in it !
//  * ```
//  *
//  * @group Form
//  * @category Components
//  */
// export const MyComponent: FC<ComponentProps> = ({ name }) => {
//   return null;
// };

// // export interface Notification {
// //   payload: any;
// //   id: string | number;
// //   topic: string;
// //   timestamp: number;
// //   expires: number | null;
// //   persist: boolean;
// //   ttl?: number;
// //   remove: () => void;
// // }

// // /**
// //  * This is the description
// //  *
// //  * @param topic the topic with
// //  * multiple lines ?
// //  * ```
// //  * test
// //  * ```
// //  * @returns
// //  *
// //  * @group Framework
// //  * @category Notification
// //  */
// // export const useNotifications = (topic: string, firstname = 'toto'): Notification[] => {
// //   return [];
// // };
