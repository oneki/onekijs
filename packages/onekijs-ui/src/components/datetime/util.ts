import { DateRange } from './typings';

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
