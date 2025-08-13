import { AnonymousObject } from 'onekijs-framework';
import { DateStringRange } from './typings';

export const dateToString = (d: Date | string): string => {
  if (typeof d === 'string') {
    d = new Date(d);
  }
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

export const toDateRange = (value: string | null): DateStringRange | null => {
    if (value) {
      const [from, to] = value.trim().split(/ to\s*/);
      return {
        from: from && from.trim() ? from.trim() : null,
        to: to && to.trim() ? to.trim() : null,
      };
    } else {
      return null;
    }
}

export const qr = (quickRange: string): DateStringRange | null => {
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

    return { from: dateToString(from), to: dateToString(to) };
  }
  return quickRange;
}

export const defaultQuickRanges = (): AnonymousObject<DateStringRange>  => {
  return ['Last hour', 'Last day', 'Last week', 'Last month', 'Last year'].reduce((accumulator, label) => {
    const quickRange = qr(label);
    if (quickRange) {
      accumulator[label] = quickRange;
    }
    return accumulator;
  }, {} as AnonymousObject<DateStringRange>)
}

export const findQuickRangeLabel = (quickRanges: AnonymousObject<DateStringRange> | undefined, dateRange: DateStringRange | string | null | undefined): string | undefined => {
  if (!quickRanges || !dateRange) return;
  const dr = typeof dateRange === 'string' ? toDateRange(dateRange) : dateRange;
  if (dr === null) return;
  if (!dr.from || !dr.to) return;

  return Object.keys(quickRanges).find((label) => {
    return dr.from === quickRanges[label].from && dr.to=== quickRanges[label].to;
  })
}
