import React from 'react';
import useTimerController from '../hooks/useTimerController';
import { TimerProps } from '../typings';
import ControlledTimerComponent from './ControlledTimerComponent';

const UncontrolledTimerComponent: React.FC<Omit<TimerProps, 'controller'> & { timeMs: number }> = (props) => {
  const controller = useTimerController(props);
  return <ControlledTimerComponent {...props} controller={controller} />;
};

export default UncontrolledTimerComponent;
