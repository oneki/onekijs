import React from 'react';
import { DatePickerProps, DatePickerType } from '../typings';
import PickerComponent from './PickerComponent';

const type: DatePickerType = {
  date: true,
  time: false,
  range: false
}

const DatePickerComponent: React.FC<DatePickerProps> = (props) => {
  return <PickerComponent {...props} type={type} />
}

export default DatePickerComponent;
