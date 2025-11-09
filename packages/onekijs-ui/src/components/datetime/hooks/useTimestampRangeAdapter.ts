import { useRef } from 'react';
import { DateRangeAdapter } from '../typings';
import { dateToString } from '../util';

const useTimestampRangeAdapter = (format: 'seconds' | 'milliseconds' = 'milliseconds') => {
  const toTimestamp = (date: string | undefined | null): number | null => {
    if (!date) return null;
    const d = new Date(date);
    if(isNaN(d as any)) return null;
    const timestamp = d.getTime();
    return format === 'milliseconds' ? timestamp : Math.floor(timestamp / 1000);
  }

  const fromTimestamp = (timestamp: number | undefined | null) => {
    if (timestamp === null || timestamp === undefined) return null;
    if (format === 'seconds') {
      timestamp = timestamp * 1000;
    }
    const d = new Date(timestamp);
    if(isNaN(d as any)) return null;
    return dateToString(d);
  }

  const ref = useRef({
    fromDateRange: (range) => {
      return {
        from: toTimestamp(range.from),
        to: toTimestamp(range.to),
        label: range.label,
      }
    },
    toDateRange: (value) => {
      return {
        from: fromTimestamp(value.from),
        to: fromTimestamp(value.to),
        label: value.label,
      }
    }
  } as DateRangeAdapter<{ from: number | null, to: number | null, label?: string | null}>)
  return ref.current;
}

export default useTimestampRangeAdapter;
