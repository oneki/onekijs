export interface AnonymousObject<T = any> {
  [propName: string]: T;
}

export type Class<T> = { new (...args: any[]): T };

type Decrement<N extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][N];
type Continue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// copyright Pedro Figueiredo
// https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
export type NestedKeyOf<T, I extends number = 1> = T extends object
  ? {
      [Key in keyof T & (string | number)]: I extends Continue
        ? T[Key] extends null | undefined
          ? `${Key}`
          : T[Key] extends Array<infer E> | null | undefined
          ? E extends object | null | undefined
            ? `${Key}` | `${Key}.${number}` | `${Key}.${number}.${NestedKeyOf<E, Decrement<I>>}`
            : `${Key}` | `${Key}.${number}`
          : T[Key] extends object | null | undefined
          ? `${Key}` | `${Key}.${NestedKeyOf<Exclude<T[Key], null | undefined>, Decrement<I>>}`
          : `${Key}`
        : T[Key] extends null | undefined
        ? `${Key}`
        : T[Key] extends Array<infer E> | null | undefined
        ? E extends object | null | undefined
          ? `${Key}` | `${Key}.${number}` | `${Key}.${number}.${string}`
          : `${Key}` | `${Key}.${number}`
        : T[Key] extends object | null | undefined
        ? `${Key}` | `${Key}.${string}`
        : `${Key}`;
    }[keyof T & (string | number)]
  : string;

type ArrayPathType<A extends Array<any>, S extends string> = S extends `${infer K extends number}.${infer R}`
  ? A[K] extends Array<any>
    ? ArrayPathType<A[K], R>
    : A[K] extends Array<any> | null
    ? ArrayPathType<Exclude<A[K], null>, R> | null
    : A[K] extends Array<any> | undefined
    ? ArrayPathType<Exclude<A[K], undefined>, R> | undefined
    : A[K] extends Array<any> | null | undefined
    ? ArrayPathType<Exclude<A[K], null | undefined>, R> | null | undefined
    : A[K] extends object
    ? ObjectPathType<A[K], R>
    : A[K] extends object | null
    ? ObjectPathType<Exclude<A[K], null>, R> | null
    : A[K] extends object | undefined
    ? ObjectPathType<Exclude<A[K], undefined>, R> | undefined
    : A[K] extends object | null | undefined
    ? ObjectPathType<Exclude<A[K], null | undefined>, R> | null | undefined
    : never
  : A extends Array<infer E>
  ? E
  : never;

type ObjectPathType<O extends object, S extends string> = {
  [Key in keyof O]: S extends `${infer K}.${infer R}`
    ? K extends Key
      ? O[K] extends Array<infer E>
        ? ArrayPathType<Array<E>, R>
        : O[K] extends Exclude<Array<infer E>, null>
        ? ArrayPathType<Array<E>, R> | null
        : O[K] extends Exclude<Array<infer E>, undefined>
        ? ArrayPathType<Array<E>, R> | undefined
        : O[K] extends Exclude<Array<infer E>, null | undefined>
        ? ArrayPathType<Array<E>, R> | null | undefined
        : O[K] extends object
        ? ObjectPathType<O[K], R>
        : O[K] extends object | null
        ? ObjectPathType<Exclude<O[K], null>, R> | null
        : O[K] extends object | undefined
        ? ObjectPathType<Exclude<O[K], undefined>, R> | undefined
        : O[K] extends object | null | undefined
        ? ObjectPathType<Exclude<O[K], null | undefined>, R> | null | undefined
        : O[K]
      : string extends NestedKeyOf<O>
      ? O extends AnonymousObject<infer E>
        ? PathType<E, R>
        : never
      : never
    : Key extends S
    ? O[Key]
    : string extends NestedKeyOf<O>
    ? O extends AnonymousObject<infer E>
      ? E
      : never
    : never;
}[keyof O];

export type PathType<T, S extends string> = T extends Array<any>
  ? ArrayPathType<T, S>
  : T extends Array<infer E> | null
  ? ArrayPathType<Array<E>, S> | null
  : T extends Array<infer E> | undefined
  ? ArrayPathType<Array<E>, S> | undefined
  : T extends Array<infer E> | null | undefined
  ? ArrayPathType<Array<E>, S> | null | undefined
  : T extends object
  ? ObjectPathType<T, S>
  : T extends object | null
  ? ObjectPathType<Exclude<T, null>, S>
  : T extends object | undefined
  ? ObjectPathType<Exclude<T, undefined>, S>
  : T extends object | null | undefined
  ? ObjectPathType<Exclude<T, null | undefined>, S>
  : any;

export type AnonymousPathObject<T> = {
  [P in NestedKeyOf<T>]?: PathType<T, P>;
};

export type AnonymousKeyObject<T, V> = {
  [P in NestedKeyOf<T>]?: V;
};

export type ArrayElement<A> = A extends readonly (infer ElementType)[] ? ElementType : never;
