import React, { useContext } from 'react';
import { AccordionState } from '../typings';

export const AccordionStateContext = React.createContext<AccordionState>(null!);
export const useAccordionState = (): AccordionState => {
  return useContext(AccordionStateContext);
};
