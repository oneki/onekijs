import styled from 'styled-components';
import { datePickerStyle } from './style';
import DatePickerComponent from './components/DatePickerComponent';
import DateRangePickerComponent from './components/DateRangePickerComponent';
import DateTimePickerComponent from './components/DateTimePickerComponent';
import DateTimeRangePickerComponent from './components/DateTimeRangePickerComponent';
import TimePickerComponent from './components/TimePickerComponent';
import TimeRangePickerComponent from './components/TimeRangePickerComponent';

export const DatePicker = styled(DatePickerComponent)`
  ${datePickerStyle}
`;

export const DateRangePicker = styled(DateRangePickerComponent)`
  ${datePickerStyle}
`;

export const DateTimePicker = styled(DateTimePickerComponent)`
  ${datePickerStyle}
`;

export const DateTimeRangePicker = styled(DateTimeRangePickerComponent)`
  ${datePickerStyle}
`;

export const TimePicker = styled(TimePickerComponent)`
  ${datePickerStyle}
`;

export const TimeRangePicker = styled(TimeRangePickerComponent)`
  ${datePickerStyle}
`;
