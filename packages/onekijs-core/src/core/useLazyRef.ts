import { useRef } from 'react';
import { isFunction } from './utils/type';

const useLazyRef = <T>(initialValue: T | (() => T)): React.MutableRefObject<T> => {
  const ref: React.MutableRefObject<unknown> = useRef(null);

  const initializeRef = () => {
    if (ref.current === null) {
      ref.current = isFunction(initialValue) ? (initialValue as () => T)() : initialValue;
    }
  };

  initializeRef();

  return ref as React.MutableRefObject<T>;
};

export default useLazyRef;
