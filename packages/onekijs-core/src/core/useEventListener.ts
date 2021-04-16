import { useEffect } from "react";

const useEventListener = <K extends keyof DocumentEventMap>(eventName: K, handler: (e: DocumentEventMap[K]) => void, capture: boolean = false) => {
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
      [handler, eventName, document] // Re-run if eventName or element changes
    );
  };

  export default useEventListener;