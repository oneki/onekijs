import { AnonymousObject } from 'onekijs-core';
import React, { FC } from 'react';
import { Switch as RouterSwitch, useLocation } from 'react-router-dom';
import { SwitchTransition, Transition } from 'react-transition-group';

const Switch: FC = ({ children }) => {
  const location = useLocation();
  return (
    <SwitchTransition>
      <Transition key={location.key} appear={true} timeout={duration}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state as any],
            }}
          >
            <RouterSwitch location={location}>{children}</RouterSwitch>
          </div>
        )}
      </Transition>
    </SwitchTransition>
    // <TransitionGroup>
    //   <CSSTransition key={location.key} timeout={{ enter: 300, exit: 300 }} classNames={'fade'}>
    //     <section className="route-section">{children}</section>
    //   </CSSTransition>
    // </TransitionGroup>
  );
};

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles: AnonymousObject = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export default Switch;
