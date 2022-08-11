/* eslint-disable @typescript-eslint/ban-types */
import { useMemo, useRef } from 'react';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

const useThrottle = <F extends Function>(fn: F, delayMs: number): F => {
  const argsRef = useRef<any[]>();
  const delayRef = useRef(false);

  const result: F = useMemo(() => {
    return (((...args: ArgumentTypes<F>) => {
      if (!delayRef.current) {
        delayRef.current = true;
        fn(...args);
        setTimeout(() => {
          delayRef.current = false;
          if (argsRef.current !== undefined) {
            const args = argsRef.current;
            argsRef.current = undefined;
            fn(...args);
          }
        }, delayMs);
      } else {
        argsRef.current = args;
      }
    }) as unknown) as F;
  }, [fn, delayMs]);

  return result;
};

export default useThrottle;
