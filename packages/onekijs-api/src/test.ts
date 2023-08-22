import React, { FC, PropsWithChildren } from 'react';

export declare type FCC<P = any> = FC<PropsWithChildren<P>>;

// /**
//  * Comment of NotificationService class
//  */
// export class NotificationService {
//   private myPrivateField?: string;
//   myPublicField2?: string;
//   constructor(public indexer: string, public myPublicField?: string) {
//     console.log('test');
//   }

//   init(): void {
//     console.log('test');
//   }

//   /**
//    * Comment of the add operation
//    * @param notification the notification to send
//    * @returns a string indicating the status
//    */
//   protected add(notification: string): string {
//     return 'test';
//   }

//   *error(payload: any) {
//     yield console.log(payload.test);
//   }
// }

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

/**
 * @typeParam T - the identity type
 */
export type MyGenericType<T> = {
  foo: T;
};

/**
 * TEst
 *
 * @see ComponentProps
 */
export type ComponentOptions = {
  /**
   * Flag to determine if the component is transferable
   */
  transferable: boolean;

  /**
   * this is the alias
   *
   * @defaultValue test
   */
  alias?: string;
};

export type Class<T> = {
  new (...args: any[]): T;
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
  name: Class<ComponentOptions>[];
  /**
   * The last name of the user
   *
   * @defaultValue Doe
   */
  lastname?: string[];
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



export const FccMyComponent2: FCC<ComponentProps> = ({ name }) => {
  return null;
};

/**
 * `<App/>` is the main component that bootstraps the **_Oneki.js framework_** on top of **_Create React App_**
 *
 * This component is generally the external component of an application and is responsible for:
 * - creating a Redux store:
 *   - If the `store` property is present, **_App_** doesn't create a Redux store but uses the one referenced by the property.
 *   - Otherwise, **&lt;App/&gt;** creates the Redux store. The initial state of the store is the object referenced by the property `initialState`.
 * - creating a React Router. By default, it creates a **BrowserRouter** that can be changed / configured via the **settings.ts** file
 * - creating and injecting global **services** in the Redux store
 * - creating a context that contains three elements:
 *   - **router**: accessible via useRouter()
 *   - **settings**: accessible via useSettings()
 *   - **redux store**: accessible via useStore()
 *
 * #### Custom redux store
 *
 * A custom Redux store can be created by calling the helper `createReduxStore` from Oneki.js
 *
 * ```ts
 * const store = createReduxStore((initialState = {}), (middlewares = []));
 * ```
 * This helper expects an initial state and an array of Redux middlewares.
 *
 * @group Application
 * @category Components
 */
export const MyComponent2 = React.memo(FccMyComponent2);
MyComponent2.displayName = 'MyComponent2';

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
