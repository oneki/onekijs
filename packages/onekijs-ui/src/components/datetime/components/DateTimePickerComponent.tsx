import React from 'react';
import { DatePickerProps } from '../typings';
import BaseDatePickerComponent from './BaseDatePickerComponent';


const DateTimePickerComponent: React.FC<DatePickerProps> = (props) => {
  return <BaseDatePickerComponent {...props} range={false} time={true} date={true} />
}

export default DateTimePickerComponent;
