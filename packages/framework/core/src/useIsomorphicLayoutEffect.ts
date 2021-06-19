import { useEffect, useLayoutEffect } from 'react';

// https://github.com/reduxjs/react-redux/blob/master/LICENSE.md
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? useLayoutEffect
    : useEffect;
