import React from 'react';
import { DatePickerType, DateTimePickerProps, PickerComponentProps } from '../typings';
import PickerComponent from './PickerComponent';

const type: DatePickerType = {
  date: true,
  time: true,
  range: false
}

const DateTimePickerComponent: React.FC<DateTimePickerProps> = (props) => {
  const { onChange: forwardChange, value: externalValue, adapter, ...datePickerProps } = props;

  const onChange: PickerComponentProps['onChange'] = forwardChange ? (value) => {
    if (value === null || !adapter) {
      forwardChange(value);
    } else {
      forwardChange(adapter.fromDate(value))
    }
  } : undefined;

  let value: PickerComponentProps['value'] = externalValue ? adapter ? adapter.toDate(externalValue) : externalValue : null;

  return <PickerComponent {...datePickerProps} value={value} onChange={onChange} type={type} />
}

export default DateTimePickerComponent;
