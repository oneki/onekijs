import { AnonymousObject } from 'onekijs-framework';
import { DateQuickRange, DateStringRange, DefaultQuickRange } from './typings';

export const dateToString = (d: Date | string | (() => Date)): string => {
  if (typeof d === 'function') {
    d = d();
  }
  if (typeof d === 'string') {
    d = new Date(d);
  }
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

export const toDateRange = (value: string | null, label?: string | null): DateStringRange | null => {
    if (value) {
      const [from, to] = value.trim().split(/ to\s*/);
      return {
        from: from && from.trim() ? from.trim() : null,
        to: to && to.trim() ? to.trim() : null,
        label,
      };
    } else {
      return null;
    }
}

export const qr = (quickRange: DefaultQuickRange): DateQuickRange => {
  return {
    label: quickRange,
    from: () => {
      const d = new Date();
      switch(quickRange) {
        case 'Last hour': d.setHours(d.getHours() - 1); break;
        case 'Last day': d.setDate(d.getDate() - 1); break;
        case 'Last week': d.setDate(d.getDate() - 7); break;
        case 'Last month': d.setMonth(d.getMonth() - 1); break;
        case 'Last year': d.setFullYear(d.getFullYear() - 1); break;
      }
      return d;
    },
    to: () => new Date(),
  }
}

export const defaultQuickRanges = (): AnonymousObject<DateQuickRange>  => {
  return (['Last hour', 'Last day', 'Last week', 'Last month', 'Last year'] as DefaultQuickRange[]).reduce((accumulator, label) => {
    const quickRange = qr(label);
    if (quickRange) {
      accumulator[label] = quickRange;
    }
    return accumulator;
  }, {} as AnonymousObject<DateQuickRange>)
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
