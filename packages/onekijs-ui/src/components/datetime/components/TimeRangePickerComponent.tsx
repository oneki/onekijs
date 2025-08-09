import React from 'react';
import { DatePickerProps } from '../typings';
import BaseDatePickerComponent from './BaseDatePickerComponent';


const TimeRangePickerComponent: React.FC<DatePickerProps> = (props) => {
  return <BaseDatePickerComponent {...props} range={true} time={true} date={false} />
}

export default TimeRangePickerComponent;
