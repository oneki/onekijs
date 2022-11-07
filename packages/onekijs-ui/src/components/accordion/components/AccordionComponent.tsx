import { FCC, useService } from 'onekijs-framework';
import React from 'react';
import { AccordionService } from '../AccordionService';
import { AccordionServiceContext } from '../hooks/useAccordionService';
import { AccordionStateContext } from '../hooks/useAccordionState';
import { AccordionProps, AccordionState } from '../typings';
import AccordionContainer from './AccordionContainer';

/**
 * This is the comment for AccordionComponent 2
 *
 * @example
 * ```tsx
 * <AccordionComponent multiActive="true" />
 * ```
 *
 * @group Accordion
 * @category Components
 * @remarks #notStyled#
 */
const AccordionComponent: FCC<AccordionProps> = ({ Component = AccordionContainer, ...props }) => {
  const [state, service] = useService(AccordionService, {
    multiActive: props.multiActive,
    panels: {},
    animate: props.animate ?? 150,
    mode: props.mode ?? 'push',
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
