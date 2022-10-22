import React from 'react';
import { TimerProps } from '../typings';
import ControlledTimerComponent from './ControlledTimerComponent';
import UncontrolledTimerComponent from './UncontrolledTimerComponent';

const TimerComponent: React.FC<TimerProps> = (props) => {
  const controller = props.controller;
  if (controller === undefined) {
    if (!props.timeMs) {
      throw new Error('timeMs must be defined for an uncontrolled Timer');
    }
    return <UncontrolledTimerComponent {...props} timeMs={props.timeMs} />;
  }
  return <ControlledTimerComponent {...props} controller={controller} />;
};

export default TimerComponent;
