import React, { FC } from 'react';
import { Switch as RouterSwitch, useLocation } from 'react-router-dom';
import { SwitchTransition, Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

type FadeSwitchProps = {
  duration?: number;
};

const defaultDuration = 300;

const FadeSwitch: FC<FadeSwitchProps> = ({ duration, children }) => {
  const location = useLocation();
  if (duration === undefined) duration = defaultDuration;
  return (
    <SwitchTransition>
      <Transition key={location.key} appear={true} timeout={duration}>
        {(state) => (
          <div style={transitionStyles(state, duration)}>
            <RouterSwitch location={location}>{children}</RouterSwitch>
          </div>
        )}
      </Transition>
    </SwitchTransition>
  );
};

const transitionStyles = (state: TransitionStatus, duration = defaultDuration) => {
  switch (state) {
    case 'entering':
      return {
        opacity: 1,
        transition: `opacity ${duration}ms ease-in`,
      };
    case 'entered':
      return {
        opacity: 1,
      };
    case 'exiting':
      return {
        opacity: 0,
        transition: `opacity 0ms ease-out`,
      };
    case 'exited':
      return {
        opacity: 0,
      };
    default: {
      return {
        opacity: 1,
      };
    }
  }
};

export default FadeSwitch;
