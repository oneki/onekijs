import { useRef } from 'react';
import { DateRangeAdapter, TimestampFormat } from '../typings';
import { dateToString } from '../util';
import { fromTimestamp, toTimestamp } from './useTimestampAdapter';

export const timestampRangeAdapter = (format: TimestampFormat = 'milliseconds') => ({
    fromDateRange: (range) => {
      return {
        from: toTimestamp(range.from, format),
        to: toTimestamp(range.to, format),
        label: range.label,
      };
    },
    toDateRange: (value) => {
      return {
        from: fromTimestamp(value.from, format),
        to: fromTimestamp(value.to, format),
        label: value.label,
      };
    },
  } as DateRangeAdapter<{ from: number | null; to: number | null; label?: string | null }>
)

export const timestampSecondRangeAdapter = timestampRangeAdapter('seconds');
export const timestampMilliSecondRangeAdapter = timestampRangeAdapter('milliseconds');

const useTimestampRangeAdapter = (format: TimestampFormat = 'milliseconds') => {
  const ref = useRef(timestampRangeAdapter(format));
  return ref.current;
};

export default useTimestampRangeAdapter;
