import React from 'react';
import { DatePickerType, DateTimePickerProps } from '../typings';
import BaseDatePickerComponent from './BaseDatePickerComponent';

const type: DatePickerType = {
  date: true,
  time: true,
  range: false
}

const DateTimePickerComponent: React.FC<DateTimePickerProps> = (props) => {
  return <BaseDatePickerComponent {...props} type={type} />
}

export default DateTimePickerComponent;
