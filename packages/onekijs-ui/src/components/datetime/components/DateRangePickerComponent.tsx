import React from 'react';
import { DatePickerType, DateRangePickerProps, PickerComponentProps } from '../typings';
import { toDateRange } from '../util';
import PickerComponent from './PickerComponent';

const type: DatePickerType = {
  date: true,
  time: false,
  range: true
}

const DateRangePickerComponent: React.FC<DateRangePickerProps> = (props) => {
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

export default DateRangePickerComponent;
