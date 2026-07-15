import { FCC, useTryRouter } from 'onekijs-framework';
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
  initialExpand,
  children,
  Component = AccordionPanelTitle,
  link,
}) => {
  initialExpand = initialExpand ?? initialActive;
  const panel = useAccordionPanel(initialActive, initialExpand);
  const service = useAccordionService();
  const { animate } = useAccordionState();
  const router = useTryRouter();
  const contentRef = React.useRef<HTMLDivElement | null>(null);


  const toggle = () => {
    if (!panel) return;
    if (link) {
      if (!panel.active && router) {
        service.expand(panel.uid);
        router.push(link);
      }
    } else if (panel.active) {
      service.collapse(panel.uid);
    } else {
      service.expand(panel.uid);
    }
  };

  const onEntering = () => {
    const node = contentRef.current;
    if (!node) return;
    const currentHeight = node.getBoundingClientRect().height;
    node.style.height = '0px';
    setTimeout(() => {
      node.style.height = `${currentHeight}px`;
    }, 0);
  };

  const onEntered = () => {
    const node = contentRef.current;
    if (!node) return;
    node.style.height = '';
  };

  const onExiting = () => {
    const node = contentRef.current;
    if (!node) return;
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
      <Component title={title} active={panel.active} onClick={toggle} link={link} />
      <CSSTransition
        in={panel.expanded}
        nodeRef={contentRef}
        classNames="o-accordion-animate"
        timeout={animate}
        mountOnEnter={false}
        appear={false}
        unmountOnExit={true}
        onExiting={onExiting}
        onEntering={onEntering}
        onEntered={onEntered}
      >
        <div ref={contentRef}>{<div className="o-accordion-content">{children}</div>}</div>
      </CSSTransition>
    </div>
  );
};

export default AccordionPanel;
