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

class EventLock {
  protected locks: AnonymousObject<(string | number)[]> = {};

  lock(type: string, id: string | number): void {
    const locks = this.locks[type] || [];
    if (!locks.find((l) => l === id)) {
      locks.unshift(id);
    }
    this.locks[type] = locks;
  }

  unlock(type: string, id: string | number): void {
    const locks = this.locks[type] || [];
    const index = locks.findIndex((l) => l === id);
    if (index >= 0) {
      locks.splice(index, 1);
    }
    this.locks[type] = locks;
  }

  isLockedBy(type: string, id: string | number): boolean {
    if (this.locks[type] === undefined) return true; // the lock if free for everybody
    return this.locks[type][0] === id;
  }
}

export const eventLocks = new EventLock();

export default useEventListener;
