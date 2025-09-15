import React from 'react';
import { DatePickerType, TimePickerProps } from '../typings';
import PickerComponent from './PickerComponent';

const type: DatePickerType = {
  date: false,
  time: true,
  range: false
}

const TimePickerComponent: React.FC<TimePickerProps> = (props) => {
  return <PickerComponent {...props} type={type} />
}

export default TimePickerComponent;
