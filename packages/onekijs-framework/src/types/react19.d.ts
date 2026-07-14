import type { RefObject } from 'react';

declare module 'react' {
  /** Compatibility overload for legacy Oneki hooks that initialize a ref lazily. */
  function useRef<T = undefined>(): RefObject<T | undefined>;
}

export {};
