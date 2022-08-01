import { FCC } from 'onekijs-framework';
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { addClassname } from '../../../utils/style';
import { CardProps } from '../typings';
import CardTitle from './CardTitle';

const CardComponent: FCC<CardProps> = ({
  TitleComponent = CardTitle,
  initialOpen = true,
  className,
  title,
  animate = 150,
  icon,
  collapsable = true,
  children,
}) => {
  const classNames = addClassname('o-card', className);
  const [open, setOpen] = useState(initialOpen);
  const toggle = () => {
    if (collapsable) {
      setOpen(!open);
    }
  };

  const onEntering = (node: HTMLElement) => {
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

  return (
    <div className={classNames}>
      <TitleComponent
        title={title}
        icon={icon}
        onToggle={toggle}
        open={open}
        collapsable={collapsable}
        animate={animate}
      />

      <CSSTransition
        in={open}
        appear={false}
        classNames="o-card-animate"
        timeout={animate}
        mountOnEnter={true}
        unmountOnExit={true}
        onExiting={onExiting}
        onEntering={onEntering}
        onEntered={onEntered}
      >
        <div>
          <div className="o-card-content">{children}</div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default CardComponent;
