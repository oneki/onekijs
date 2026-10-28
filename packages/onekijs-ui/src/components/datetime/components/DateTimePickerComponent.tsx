import React from 'react';
import { dateAdapter } from '../hooks/useDateAdapter';
import { timestampMilliSecondAdapter } from '../hooks/useTimestampAdapter';
import { DatePickerType, DateTimePickerProps, PickerComponentProps } from '../typings';
import PickerComponent from './PickerComponent';

const type: DatePickerType = {
  date: true,
  time: true,
  range: false,
};

const DateTimePickerComponent: React.FC<DateTimePickerProps> = (props) => {
  const { onChange: forwardChange, value: externalValue, adapter, ...datePickerProps } = props;

  const _adapter = adapter === 'timestamp' ? timestampMilliSecondAdapter : adapter === 'date' ? dateAdapter : adapter;

  const onChange: PickerComponentProps['onChange'] = forwardChange
    ? (value) => {
        if (value === null || !_adapter) {
          forwardChange(value);
        } else {
          forwardChange(_adapter.fromDate(value));
        }
      }
    : undefined;

  let value: PickerComponentProps['value'] = externalValue
    ? _adapter
      ? _adapter.toDate(externalValue)
      : externalValue
    : null;

  return <PickerComponent {...datePickerProps} value={value} onChange={onChange} type={type} />;
};

export default DateTimePickerComponent;
