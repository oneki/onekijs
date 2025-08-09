import React from 'react';
import { DatePickerProps } from '../typings';
import BaseDatePickerComponent from './BaseDatePickerComponent';


const DatePickerComponent: React.FC<DatePickerProps> = (props) => {
  return <BaseDatePickerComponent {...props} range={false} time={false} date={true} />
}

export default DatePickerComponent;
