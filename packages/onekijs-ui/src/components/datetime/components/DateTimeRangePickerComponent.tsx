import React from 'react';
import { DatePickerType, DateTimeRangePickerProps, PickerComponentProps } from '../typings';
import { toDateRange } from '../util';
import PickerComponent from './PickerComponent';

const type: DatePickerType = {
  date: true,
  time: true,
  range: true
}

const DateTimeRangePickerComponent: React.FC<DateTimeRangePickerProps> = (props) => {
  const { onChange: forwardChange, value: externalValue, adapter, ...datePickerProps } = props;

  const onChange: PickerComponentProps['onChange'] = forwardChange ? (value) => {
    const dateRange = toDateRange(value);
    if (dateRange === null || !adapter) {
      forwardChange(dateRange);
    } else {
      forwardChange(adapter.fromDateRange(dateRange))
    }
  } : undefined;

  let value: PickerComponentProps['value'] = null;
  if (externalValue) {
    if (adapter) {
      const {from, to} = adapter.toDateRange(externalValue);
      value = `${from || ''} to ${to || ''}`
    } else {
      value = `${externalValue.from || ''} to ${externalValue.to || ''}`
    }
  }

  return <PickerComponent {...datePickerProps} value={value} onChange={onChange} type={type} />
}

export default DateTimeRangePickerComponent;
