import React, { useContext } from 'react';
import { AccordionService } from '../AccordionService';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AccordionServiceContext = React.createContext<AccordionService>(null!);

const useAccordionService = (): AccordionService => {
  return useContext(AccordionServiceContext);
};

export default useAccordionService;
