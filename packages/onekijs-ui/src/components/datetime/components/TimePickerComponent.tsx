import React from 'react';
import { DatePickerProps, DatePickerType } from '../typings';
import BaseDatePickerComponent from './BaseDatePickerComponent';

const type: DatePickerType = {
  date: false,
  time: true,
  range: false
}

const TimePickerComponent: React.FC<DatePickerProps> = (props) => {
  return <BaseDatePickerComponent {...props} type={type} />
}

export default TimePickerComponent;
