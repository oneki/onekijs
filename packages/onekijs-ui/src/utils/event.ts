import { toArray } from 'onekijs-framework';
import { useEffect } from 'react';

export const useClickOutside = (
  ref: React.MutableRefObject<HTMLElement | null> | React.MutableRefObject<HTMLElement | null>[],
  onClickOutside: (e: any) => void,
): void => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      const refs = toArray(ref);
      let outside = true;
      for (const r of refs) {
        const element = r.current;
        if (element && element.contains(event.target as Node)) {
          outside = false;
          break;
        }
      }
      if (outside) {
        onClickOutside(event);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside]);
};

export const useFocusOutside = (
  ref: React.MutableRefObject<HTMLElement | null> | React.MutableRefObject<HTMLElement | null>[],
  onFocusOutside: (e: FocusEvent) => void,
): void => {
  useEffect(() => {
    function handleFocusOutside(event: FocusEvent) {
      const refs = toArray(ref);
      let outside = true;
      for (const r of refs) {
        const element = r.current;
        if (element && element.contains(event.target as Node)) {
          outside = false;
          break;
        }
      }
      if (outside) {
        onFocusOutside(event);
      }
    }

    // Bind the event listener
    document.addEventListener('focusin', handleFocusOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('focusin', handleFocusOutside);
    };
  }, [ref, onFocusOutside]);
};
