import { AnonymousObject } from 'onekijs-framework';
import { DateQuickRange, DateRange } from './typings';

export const toDateRange = (value: string | null): DateRange | null => {
    if (value) {
      const [from, to] = value.trim().split(/ to\s*/);
      return {
        from: from && from.trim() ? from.trim() : null,
        to: from && to.trim() ? to.trim() : null,
      };
    } else {
      return null;
    }
}

export const qr = (quickRange: string): DateQuickRange | null => {
  if (typeof quickRange === 'string') {
    const from = new Date();
    const to = new Date();
    switch(quickRange) {
      case 'Last hour': from.setHours(from.getHours() - 1); break;
      case 'Last day': from.setDate(from.getDate() - 1); break;
      case 'Last week': from.setDate(from.getDate() - 7); break;
      case 'Last month': from.setMonth(from.getMonth() - 1); break;
      case 'Last year': from.setFullYear(from.getFullYear() - 1); break;
      default: return null;
    }

    return { from, to };
  }
  return quickRange;
}

export const defaultQuickRanges = (): AnonymousObject<DateQuickRange>  => {
  return ['Last hour', 'Last day', 'Last week', 'Last month', 'Last year'].reduce((accumulator, label) => {
    const quickRange = qr(label);
    if (quickRange) {
      accumulator[label] = quickRange;
    }
    return accumulator;
  }, {} as AnonymousObject<DateQuickRange>)
}

export const findQuickRangeLabel = (quickRanges: AnonymousObject<DateQuickRange> | undefined, dateRange: DateRange | string | null | undefined): string | undefined => {
  if (!quickRanges || !dateRange) return;
  const dr = typeof dateRange === 'string' ? toDateRange(dateRange) : dateRange;
  if (dr === null) return;
  if (!dr.from || !dr.to) return;

  const fromDate = new Date(dr.from);
  const toDate = new Date(dr.to);
  return Object.keys(quickRanges).find((label) => {
    console.log(label, fromDate.toString() === quickRanges[label].from.toString() && toDate.toString() === quickRanges[label].to.toString());
    return fromDate.toString() === quickRanges[label].from.toString() && toDate.toString() === quickRanges[label].to.toString();
  })
}
