import React from 'react';
import { DatePickerProps, DatePickerType } from '../typings';
import BaseDatePickerComponent from './BaseDatePickerComponent';

const type: DatePickerType = {
  date: true,
  time: false,
  range: true
}

const DateRangePickerComponent: React.FC<DatePickerProps> = (props) => {
  return <BaseDatePickerComponent {...props} type={type} />
}

export default DateRangePickerComponent;
