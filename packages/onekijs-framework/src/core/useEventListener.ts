import { useEffect } from 'react';
import { AnonymousObject } from '../types/object';

const useEventListener = <K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (e: DocumentEventMap[K]) => void,
  capture = false,
): void => {
  // Create a ref that stores handler
  useEffect(
    () => {
      // Create event listener that calls handler function stored in ref
      const eventListener = (event: DocumentEventMap[K]) => handler(event);

      // Add event listener
      document.addEventListener(eventName, eventListener, capture);

      // Remove event listener on cleanup
      return () => {
        document.removeEventListener(eventName, eventListener);
      };
    },
    [handler, eventName, capture], // Re-run if eventName or element changes
  );
};

export const eventLocks: AnonymousObject<string[]> = {};

export default useEventListener;
