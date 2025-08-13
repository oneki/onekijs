import { AnonymousObject, useLazyRef } from 'onekijs-framework';
import { DateQuickRange, DateStringRange, DefaultQuickRange } from '../typings';
import { dateToString, defaultQuickRanges, qr } from '../util';

const useQuickRanges = (ranges: DateQuickRange | DefaultQuickRange| ((DateQuickRange | DefaultQuickRange)[])): AnonymousObject<DateStringRange> => {
  const ref = useLazyRef(() => {
    if (!Array.isArray(ranges)) {
      ranges = [ranges];
    }
    return ranges.reduce((accumulator, range) => {
      if (typeof(range) === 'string') {
        if (range === 'all') {
          accumulator = Object.assign(accumulator, defaultQuickRanges());
        } else {
          const dateRange = qr(range);
          if (dateRange !== null) {
            accumulator[range] = dateRange;
          }
        }
      } else {
        accumulator[range.label] = {
          from: dateToString(range.from),
          to: dateToString(range.to),
        }
      }
      return accumulator;
    }, {} as AnonymousObject<DateStringRange>)
  });

  return ref.current;
}

export default useQuickRanges;
