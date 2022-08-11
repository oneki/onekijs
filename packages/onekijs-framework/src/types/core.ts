import { PropsWithChildren, FC } from 'react';
export type AnyFunction<T = any> = (...args: any[]) => T;

export type Primitive = string | number | boolean;

// Custom Type for a React functional component with props AND CHILDREN
export type FCC<P = any> = FC<PropsWithChildren<P>>;
