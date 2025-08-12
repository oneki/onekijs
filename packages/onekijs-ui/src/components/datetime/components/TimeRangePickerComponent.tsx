import React from 'react';
import { DatePickerType, TimePickerProps } from '../typings';
import PickerComponent from './PickerComponent';

const type: DatePickerType = {
  date: false,
  time: true,
  range: true
}

const TimeRangePickerComponent: React.FC<TimePickerProps> = (props) => {
  return <PickerComponent {...props} type={type} />
}

export default TimeRangePickerComponent;
