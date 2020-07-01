// https://github.com/reduxjs/react-redux/blob/master/LICENSE.md
import { useEffect, useLayoutEffect, useRef } from 'react';
import { isFunction } from './type';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? useLayoutEffect
    : useEffect;

export const useLazyRef = initialValue => {
  const ref = useRef(null);

  const initializeRef = () => {
    if (ref.current === null) {
      ref.current = isFunction(initialValue) ? initialValue() : initialValue;
    }
  };

  initializeRef();

  return ref;
};
