import { useRef } from 'react';
import { DateRangeAdapter } from '../typings';
import { dateToString } from '../util';

const useDateRangeAdapter = () => {
  const ref = useRef({
    fromDateRange: (range) => {
      return {
        from: range.from === null ? null : new Date(range.from),
        to: range.to === null ? null : new Date(range.to),
      }
    },
    toDateRange: (value) => {
      return {
        from: !value.from ? null : dateToString(value.from),
        to: !value.to ? null : dateToString(value.to),
      }
    }
  } as DateRangeAdapter<{ from: Date | null, to: Date | null}>)
  return ref.current;
}

export default useDateRangeAdapter;
