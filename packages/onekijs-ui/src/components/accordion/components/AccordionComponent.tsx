import { FCC, useService } from 'onekijs-framework';
import React from 'react';
import { AccordionService } from '../AccordionService';
import { AccordionServiceContext } from '../hooks/useAccordionService';
import { AccordionStateContext } from '../hooks/useAccordionState';
import { AccordionProps, AccordionState } from '../typings';
import AccordionContainer from './AccordionContainer';

/**
 * This is the comment for AccordionComponent
 *
 * @example
 * If there is a code block, then both TypeDoc and VSCode will treat
 * text outside of the code block as regular text.
 * ```ts
 * factorial(1)
 * ```
 *
 * @param param0 test param0
 * @returns a AccordionCompont
 *
 * @group Accordion
 * @category Components
 */
const AccordionComponent: FCC<AccordionProps> = ({ Component = AccordionContainer, ...props }) => {
  const [state, service] = useService(AccordionService, {
    multiActive: props.multiActive,
    panels: {},
    animate: props.animate ?? 150,
  } as AccordionState);

  return (
    <AccordionServiceContext.Provider value={service}>
      <AccordionStateContext.Provider value={state}>
        <Component {...props} />
      </AccordionStateContext.Provider>
    </AccordionServiceContext.Provider>
  );
};

export default AccordionComponent;
