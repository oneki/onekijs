import { useRef } from 'react';
import { DateRangeAdapter } from '../typings';
import { dateToString } from '../util';

const useDateRangeAdapter = () => {
  const ref = useRef({
    fromDateRange: (range) => {
      return {
        from: range.from === null ? null : new Date(range.from),
        to: range.to === null ? null : new Date(range.to),
        label: range.label,
      }
    },
    toDateRange: (value) => {
      return {
        from: !value.from ? null : dateToString(value.from),
        to: !value.to ? null : dateToString(value.to),
        label: value.label,
      }
    }
  } as DateRangeAdapter<{ from: Date | null, to: Date | null, label?: string | null}>)
  return ref.current;
}

export default useDateRangeAdapter;
