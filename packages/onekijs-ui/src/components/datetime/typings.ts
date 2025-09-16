import { AnonymousObject } from 'onekijs-framework';
import { StylableProps } from '../../styles/typings';
import { DropdownWidthModifier } from '../dropdown/typings';
import { Placement } from '@popperjs/core';

export type BasePickerProps = StylableProps & {
  animationMs?: number;
  attachDropdownToBody?: boolean;
  autoFocus?: boolean;
  combo?: boolean;
  disabled?: boolean;
  dropdownWidthModifier?: DropdownWidthModifier;
  nullable?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  openOnFocus?: boolean;
  placeholder?: string;
  placement?: Placement;
};

export type CalendarComponentProps = StylableProps & {
  from: DatePickerDate;
  maxDate?: Date;
  minDate?: Date;
  nextSelectEdge: 'from' | 'to';
  onChange: (formDate: string | undefined, toDate?: string) => void;
  type: DatePickerType;
  to: DatePickerDate;
};

export type CalendarDay = {
  active?: boolean;
  current?: boolean;
  startRange?: boolean;
  endRange?: boolean;
  inRange?: boolean;
  day: number;
  month: number;
  year: number;
};

export type DateAdapter<T extends any = any> = {
  fromDate: (date: string) => T;
  toDate: (value: T) => string;
}

export type DatePickerContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  nullable?: boolean;
  onChange: (value: string | null) => void;
};

export type DatePickerDate = {
  date?: string;
  time?: string;
  year?: string;
  month?: string;
  day?: string;
  hour?: string;
  minute?: string;
  second?: string;
};

export type DatePickerProps<T extends any = any> = BasePickerProps & {
  adapter?: DateAdapter<T>;
  onChange?: (value: T | null) => void;
  value?: T | null;
};

export type DatePickerType = {
  date: boolean;
  range: boolean;
  time: boolean;
};

export type DateQuickRange = {
  label: string;
  from: Date;
  to: Date;
};

export type DateRange = {
  from: Date | null;
  to: Date | null;
};

export type DateStringRange = {
  from: string | null;
  to: string | null;
};

export type TimestampRange = {
  from: number | null;
  to: number | null;
};

export type DateRangeAdapter<T extends any = any> = {
  fromDateRange: (range: DateStringRange) => T;
  toDateRange: (value: T) => DateStringRange;
}

export type DateRangePickerProps<T extends any = any> = BasePickerProps & {
  adapter?: DateRangeAdapter<T>;
  closeOnQuickSelect?: boolean;
  onChange?: (value: T | null) => void;
  quickRanges?: AnonymousObject<DateStringRange>;
  value?: T | null;
};

export type DateTimePickerProps<T extends any = any> = DatePickerProps<T> & DisplayTime;

export type DateTimeRangePickerProps<T extends any = any> = DateRangePickerProps<T> & DisplayTime;

export type DefaultQuickRange = 'Last hour' | 'Last day' | 'Last week' | 'Last month' | 'Last year' | 'all';

export type DisplayTime = {
  displayHours?: boolean;
  displayMinutes?: boolean;
  displaySeconds?: boolean;
};

export type PickerComponentProps = BasePickerProps &
  DisplayTime & {
    closeOnQuickSelect?: boolean;
    type: DatePickerType;
    quickRanges?: AnonymousObject<DateStringRange>;
    value?: string | null;
    onChange?: (value: string | null) => void;
  };

export type QuickTimeRangeComponentProps = {
  currentQuickRangeLabel?: string;
  quickRanges: AnonymousObject<DateStringRange>;
  onChange: (quickRangeLabel: string) => void;
};

export type TimeComponentProps = StylableProps &
  Required<DisplayTime> & {
    from: DatePickerDate;
    to: DatePickerDate;
    type: DatePickerType;
    onChange: (value: string, edge: 'from' | 'to') => void;
  };

export type TimePickerProps = BasePickerProps &
  DisplayTime & {
    onChange?: (value: string | null) => void;
    value?: string | null;
  };

export type TimeRangeComponentProps = Required<DisplayTime> & {
  edge: 'from' | 'to';
  value: DatePickerDate;
  type: DatePickerType;
  onChange: (value: string, edge: 'from' | 'to') => void;
};

export type TimeSelectorComponentProps = Required<DisplayTime> & {
  edge: 'from' | 'to';
  value: DatePickerDate;
  onChange: (value: string, edge: 'from' | 'to') => void;
  size?: 'small' | 'large';
};

export type TimeSelectorPartComponentProps = {
  type: 'hour' | 'minute' | 'second';
  value: string | number;
  onChange: (value: string) => void;
  size?: 'small' | 'large';
};
