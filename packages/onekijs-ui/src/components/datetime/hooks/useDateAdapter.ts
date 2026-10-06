import { useRef } from 'react';
import { DateAdapter } from '../typings';
import { dateToString } from '../util';

export const dateAdapter = {
    fromDate: (date) => date === null ? null : new Date(date),
    toDate: (value) => !value ? null : dateToString(value),
  } as DateAdapter<Date | null>;

const useDateAdapter = () => {
  return dateAdapter;
};

export default useDateAdapter;
