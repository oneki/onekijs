import { useRef } from 'react';
import { DateAdapter, TimestampFormat } from '../typings';
import { dateToString } from '../util';

export const toTimestamp = (date: string | undefined | null, format: TimestampFormat): number | null => {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d as any)) return null;
  const timestamp = d.getTime();
  return format === 'milliseconds' ? timestamp : Math.floor(timestamp / 1000);
};

export const fromTimestamp = (timestamp: number | undefined | null, format: TimestampFormat) => {
  if (timestamp === null || timestamp === undefined) return null;
  if (format === 'seconds') {
    timestamp = timestamp * 1000;
  }
  const d = new Date(timestamp);
  if (isNaN(d as any)) return null;
  return dateToString(d);
};

export const timestampAdapter = (format: TimestampFormat = 'milliseconds') => ({
    fromDate: (date) => toTimestamp(date, format),
    toDate: (value) => fromTimestamp(value, format),
  } as DateAdapter<number | null>
)

export const timestampSecondAdapter = timestampAdapter('seconds');
export const timestampMilliSecondAdapter = timestampAdapter('milliseconds');

const useTimestampAdapter = (format: TimestampFormat = 'milliseconds') => {
  const ref = useRef(timestampAdapter(format));
  return ref.current;
};

export default useTimestampAdapter;
