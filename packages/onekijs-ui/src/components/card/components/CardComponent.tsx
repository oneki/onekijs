import { FCC } from 'onekijs-framework';
import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { addClassname } from '../../../utils/style';
import { CardProps } from '../typings';
import CardTitle from './CardTitle';

const CardComponent: FCC<CardProps> = ({
  TitleComponent = CardTitle,
  open = true,
  className,
  title,
  animate = 150,
  icon,
  collapsable = true,
  children,
  onToggle,
}) => {
  const classNames = addClassname('o-card', className);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // if onToggle is undefined, the component is not controlled.
  // we use this useState to do the action
  const [internalOpen, setOpen] = useState(open);
  const toggle = () => {
    if (collapsable) {
      if (onToggle !== undefined) {
        onToggle();
      } else {
        setOpen(!internalOpen);
      }
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

  return (
    <div className={classNames}>
      <TitleComponent
        title={title}
        icon={icon}
        onToggle={toggle}
        open={onToggle ? open : internalOpen}
        collapsable={collapsable}
        animate={animate}
      />

      <CSSTransition
        in={onToggle ? open : internalOpen}
        nodeRef={contentRef}
        appear={false}
        classNames="o-card-animate"
        timeout={animate}
        mountOnEnter={true}
        unmountOnExit={true}
        onExiting={onExiting}
        onEntering={onEntering}
        onEntered={onEntered}
      >
        <div ref={contentRef}>
          <div className="o-card-content">{children}</div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default CardComponent;
