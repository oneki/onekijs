import { AnonymousObject, useLazyRef } from 'onekijs-framework';
import { DateQuickRange, DateStringRange, QuickRange } from '../typings';
import { dateToString, defaultQuickRanges, qr } from '../util';


const useQuickRanges = (ranges: QuickRange | QuickRange[]): AnonymousObject<DateStringRange> => {
  const result = useLazyRef(() => {
    if (!Array.isArray(ranges)) {
      ranges = [ranges];
    }
    const quickRanges = ranges.reduce((accumulator, range) => {
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
        accumulator[range.label] = range;
      }
      return accumulator;
    }, {} as AnonymousObject<DateQuickRange>)


    const target: AnonymousObject<DateStringRange> = Object.keys(quickRanges).reduce((accumulator, label) => {
      accumulator[label] = {
        from: null,
        to: null,
        label
      };
      return accumulator;
    }, {} as AnonymousObject<DateStringRange>);

    const handler = {
      get: function (_: AnonymousObject<DateStringRange> , prop: string | number | symbol): DateStringRange | undefined {
        if (typeof prop === 'string') {
          const quickRange = quickRanges[prop];
          if (quickRange) {
            return {
              from: dateToString(quickRange.from),
              to: dateToString(quickRange.to),
              label: quickRange.label,
            }
          }
        }
        return undefined;
      }
    };
    return new Proxy(target, handler);
  });

  return result.current;
}

export default useQuickRanges;
