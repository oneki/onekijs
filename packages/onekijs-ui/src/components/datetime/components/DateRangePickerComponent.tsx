import React from 'react';
import { DatePickerProps, DatePickerType, DateRangePickerProps } from '../typings';
import BaseDatePickerComponent from './BaseDatePickerComponent';
import { toDateRange } from '../util';

const type: DatePickerType = {
  date: true,
  time: false,
  range: true
}

const DateRangePickerComponent: React.FC<DateRangePickerProps> = (props) => {
  const { onChange: forwardChange, value: externalValue, ...datePickerProps } = props;

  const onChange: DatePickerProps['onChange'] = forwardChange ? (value) => {
    forwardChange(toDateRange(value));
  } : undefined;

  const value = externalValue ? `${externalValue.from || ''} to ${externalValue.to || ''}` : null;

  return <BaseDatePickerComponent {...datePickerProps} value={value} onChange={onChange} type={type} />
}

export default DateRangePickerComponent;
