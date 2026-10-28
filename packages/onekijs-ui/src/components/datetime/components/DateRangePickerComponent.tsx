import React from 'react';
import { DatePickerType, DateRangePickerProps, PickerComponentProps } from '../typings';
import { toDateRange } from '../util';
import PickerComponent from './PickerComponent';
import { timestampMilliSecondRangeAdapter } from '../hooks/useTimestampRangeAdapter';
import { dateRangeAdapter } from '../hooks/useDateRangeAdapter';

const type: DatePickerType = {
  date: true,
  time: false,
  range: true,
};

const DateRangePickerComponent: React.FC<DateRangePickerProps> = (props) => {
  const { onChange: forwardChange, value: externalValue, adapter, ...datePickerProps } = props;

  const _adapter = adapter === 'timestamp' ? timestampMilliSecondRangeAdapter : adapter === 'date' ? dateRangeAdapter : adapter;

  const onChange: PickerComponentProps['onChange'] = forwardChange
    ? (value, label) => {
        const dateRange = toDateRange(value, label);
        if (dateRange === null || !_adapter) {
          forwardChange(dateRange);
        } else {
          forwardChange(_adapter.fromDateRange(dateRange));
        }
      }
    : undefined;

  let value: PickerComponentProps['value'] = null;
  let valueLabel: string | null | undefined;
  if (externalValue) {
    if (_adapter) {
      const { from, to, label } = _adapter.toDateRange(externalValue);
      value = `${from || ''} to ${to || ''}`;
      valueLabel = label;
    } else {
      value = `${externalValue.from || ''} to ${externalValue.to || ''}`;
      valueLabel = externalValue.label;
    }
  }

  return <PickerComponent {...datePickerProps} value={value} onChange={onChange} type={type} label={valueLabel} />;
};

export default DateRangePickerComponent;
