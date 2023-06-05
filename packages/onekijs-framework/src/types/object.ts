export interface AnonymousObject<T = any> {
  [propName: string]: T;
}

export type Class<T> = { new (...args: any[]): T };

// copyright Pedro Figueiredo
// https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
export type NestedKeyOf<T> = T extends AnonymousObject<any>
  ? string
  : T extends object
  ? {
      [Key in keyof T & (string | number)]: T[Key] extends object
        ? `${Key}` | `${Key}.${NestedKeyOf<T[Key]>}`
        : `${Key}`;
    }[keyof T & (string | number)]
  : string;

type ArrayPathType<A extends Array<any>, S extends string> = S extends `${infer K extends number}.${infer R}`
  ? A[K] extends Array<any>
    ? ArrayPathType<A[K], R>
    : A[K] extends object
    ? ObjectPathType<A[K], R>
    : never
  : S extends `${infer K extends number}`
  ? A[K]
  : any;

type ObjectPathType<O extends object, S extends string> = {
  [Key in keyof O]: S extends `${infer K}.${infer R}`
    ? K extends Key
      ? O[K] extends Array<infer E>
        ? ArrayPathType<Array<E>, R>
        : O[K] extends object
        ? ObjectPathType<O[K], R>
        : O[K]
      : O extends AnonymousObject<infer E>
      ? PathType<E, R>
      : never
    : Key extends S
    ? O[Key]
    : O extends AnonymousObject<infer E>
    ? E
    : never;
}[keyof O];

export type PathType<T, S extends string> = T extends Array<any>
  ? ArrayPathType<T, S>
  : T extends object
  ? ObjectPathType<T, S>
  : T extends any
  ? any
  : never;

export type AnonymousPathObject<T> = {
  [P in NestedKeyOf<T>]?: PathType<T, P>;
};
