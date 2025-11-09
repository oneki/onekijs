import React, { FC } from 'react';
import TogglerIcon from '../../icon/TogglerIcon';
import { AccordionPanelTitleProps } from '../typings';

const AccordionPanelTitle: FC<AccordionPanelTitleProps<any>> = ({ title, active, onClick }) => {
  return (
    <div className="o-accordion-panel-title" onClick={onClick}>
      <TogglerIcon open={active} />
      <span>{title}</span>
    </div>
  );
};

export default AccordionPanelTitle;
