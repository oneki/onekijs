import { useRef } from 'react';
import { DateRangeAdapter } from '../typings';
import { dateToString } from '../util';

const useTimestampRangeAdapter = () => {
  const toTimestamp = (date: string | undefined | null): number | null => {
    if (!date) return null;
    const d = new Date(date);
    if(isNaN(d as any)) return null;
    return d.getTime();
  }

  const fromTimestamp = (timestamp: number | undefined | null) => {
    if (timestamp === null || timestamp === undefined) return null;
    const d = new Date(timestamp);
    if(isNaN(d as any)) return null;
    return dateToString(d);
  }

  const ref = useRef({
    fromDateRange: (range) => {
      return {
        from: toTimestamp(range.from),
        to: toTimestamp(range.to),
      }
    },
    toDateRange: (value) => {
      return {
        from: fromTimestamp(value.from),
        to: fromTimestamp(value.to),
      }
    }
  } as DateRangeAdapter<{ from: number | null, to: number | null}>)
  return ref.current;
}

export default useTimestampRangeAdapter;
