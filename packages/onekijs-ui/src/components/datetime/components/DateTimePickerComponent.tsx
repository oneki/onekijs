import React from 'react';
import { DatePickerType, DateTimePickerProps } from '../typings';
import PickerComponent from './PickerComponent';

const type: DatePickerType = {
  date: true,
  time: true,
  range: false
}

const DateTimePickerComponent: React.FC<DateTimePickerProps> = (props) => {
  return <PickerComponent {...props} type={type} />
}

export default DateTimePickerComponent;
