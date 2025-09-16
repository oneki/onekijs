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

  const onChange: PickerComponentProps['onChange'] = forwardChange ? (value, label) => {
    const dateRange = toDateRange(value, label);
    if (dateRange === null || !adapter) {
      forwardChange(dateRange);
    } else {
      forwardChange(adapter.fromDateRange(dateRange))
    }
  } : undefined;

  let value: PickerComponentProps['value'] = null;
  let valueLabel: string | null | undefined;
  if (externalValue) {
    if (adapter) {
      const { from, to, label } = adapter.toDateRange(externalValue);
      value = `${from || ''} to ${to || ''}`
      valueLabel = label;
    } else {
      value = `${externalValue.from || ''} to ${externalValue.to || ''}`
      valueLabel = externalValue.label;
    }
  }

  return <PickerComponent {...datePickerProps} value={value} onChange={onChange} type={type} label={valueLabel} />
}

export default DateRangePickerComponent;
