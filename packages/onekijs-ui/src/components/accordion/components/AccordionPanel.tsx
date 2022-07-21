import { FCC } from 'onekijs-framework';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import useAccordionPanel from '../hooks/useAccordionPanel';
import useAccordionService from '../hooks/useAccordionService';
import { useAccordionState } from '../hooks/useAccordionState';
import { AccordionPanelProps } from '../typings';
import AccordionPanelTitle from './AccordionPanelTitle';

const AccordionPanel: FCC<AccordionPanelProps<any>> = ({
  title,
  initialActive,
  children,
  Component = AccordionPanelTitle,
}) => {
  const panel = useAccordionPanel(initialActive);
  const service = useAccordionService();
  const { animate } = useAccordionState();

  const toggle = () => {
    if (!panel) return;
    if (panel.active) {
      service.collapse(panel.uid);
    } else {
      service.expand(panel.uid);
    }
  };

  const onEntering = (node: HTMLElement) => {
    console.log(node);
    const currentHeight = node.getBoundingClientRect().height;
    node.style.height = '0px';
    setTimeout(() => {
      node.style.height = `${currentHeight}px`;
    }, 0);
  };

  const onEntered = (node: HTMLElement) => {
    node.style.height = '';
  };

  const onExiting = (node: HTMLElement) => {
    node.style.height = `${node.getBoundingClientRect().height}px`;
    setTimeout(() => {
      node.style.height = '0px';
    }, 0);
  };

  if (!panel) {
    return null;
  }

  return (
    <div className={`o-accordion-panel${panel.active ? ' o-accordion-panel-active' : ''}`}>
      <Component title={title} active={panel.active} onClick={toggle} />
      <CSSTransition
        in={panel.active}
        classNames="o-tree-item-children"
        timeout={animate}
        mountOnEnter={false}
        appear={false}
        unmountOnExit={true}
        onExiting={onExiting}
        onEntering={onEntering}
        onEntered={onEntered}
      >
        <div className="o-tree-item-children">{children}</div>
      </CSSTransition>
    </div>
  );
};

export default AccordionPanel;
