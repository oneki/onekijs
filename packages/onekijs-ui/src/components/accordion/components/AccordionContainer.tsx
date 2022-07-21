import { FCC } from 'onekijs-framework';
import { AccordionProps } from '../typings';
import React from 'react';
import { addClassname } from '../../../utils/style';

const AccordionContainer: FCC<Omit<AccordionProps, 'Component'>> = ({ className, children }) => {
  const classNames = addClassname('o-accordion-container', className);
  return <div className={classNames}>{children}</div>;
};

export default AccordionContainer;
