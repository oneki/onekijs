import React from 'react';
import { DatePickerProps } from '../typings';
import BaseDatePickerComponent from './BaseDatePickerComponent';


const DateTimeRangePickerComponent: React.FC<DatePickerProps> = (props) => {
  return <BaseDatePickerComponent {...props} range={true} time={true} date={true} />
}

export default DateTimeRangePickerComponent;
