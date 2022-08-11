import { FCC } from 'onekijs-framework';
import React from 'react';
import { Routes as RouterRoutes, RoutesProps, useLocation } from 'react-router-dom';
import { SwitchTransition, Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

type FadeRoutesProps = RoutesProps & {
  duration?: number;
  fadeOn?: 'pathnameChange' | 'urlChange';
};

const defaultDuration = 150; //TODO get that via useSetting
const defaultFadeOn = 'pathnameChange'; //TODO get that via useSetting

const FadeRoutes: FCC<FadeRoutesProps> = ({
  duration = defaultDuration,
  children,
  fadeOn = defaultFadeOn,
  ...routeProps
}) => {
  const location = useLocation();
  const key = fadeOn === 'pathnameChange' ? location.pathname : `${location.pathname}${location.search}`;

  return (
    <SwitchTransition>
      <Transition key={key} appear={true} timeout={duration}>
        {(state) => (
          <div style={transitionStyles(state, duration)}>
            <RouterRoutes {...routeProps} location={location}>
              {children}
            </RouterRoutes>
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
        transition: `opacity ${duration}ms ease-out`,
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

export default FadeRoutes;
