import React from 'react';
import { DatePickerProps } from '../typings';
import BaseDatePickerComponent from './BaseDatePickerComponent';


const TimePickerComponent: React.FC<DatePickerProps> = (props) => {
  return <BaseDatePickerComponent {...props} range={false} time={true} date={false} />
}

export default TimePickerComponent;
