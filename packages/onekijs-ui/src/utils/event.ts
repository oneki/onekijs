import { useEffect } from 'react';

export const useClickOutside = (
  ref: React.MutableRefObject<HTMLElement> | HTMLElement | null,
  onClickOutside: (e: MouseEvent) => void,
): void => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const element = ref && !(ref instanceof HTMLElement) ? ref.current : ref;
      if (element && !element.contains(event.target as Node)) {
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
  ref: React.MutableRefObject<HTMLElement> | HTMLElement | null,
  onFocusOutside: (e: FocusEvent) => void,
): void => {
  useEffect(() => {
    function handleFocusOutside(event: FocusEvent) {
      const element = ref && !(ref instanceof HTMLElement) ? ref.current : ref;
      if (element && !element.contains(event.target as Node)) {
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
