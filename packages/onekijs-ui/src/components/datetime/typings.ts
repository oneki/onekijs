import { AnonymousObject } from 'onekijs-framework';
import { StylableProps } from '../../styles/typings';
import { DropdownWidthModifier } from '../dropdown/typings';

export type CalendarComponentProps = StylableProps & {
  from: DatePickerDate;
  maxDate?: Date;
  minDate?: Date;
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

export type BasePickerProps = StylableProps & {
  animationMs?: number;
  attachDropdownToBody?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  dropdownWidthModifier?: DropdownWidthModifier;
  nullable?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  openOnFocus?: boolean;
  placeholder?: string;
};

export type DatePickerProps = BasePickerProps & {
  onChange?: (value: string | null) => void;
  value?: string | null;
};

export type DateRange = {
  from: string | null;
  to: string | null;
};

export type DateQuickRange = {
  from: Date;
  to: Date;
};

export type DateRangePickerProps = BasePickerProps & {
  value?: DateRange | null;
  onChange?: (value: DateRange | null) => void;
  quickRanges?: AnonymousObject<DateQuickRange>;
  defaultValue?: DateRange | null | string;
};

export type TimePickerProps = BasePickerProps & DisplayTime & {
  onChange?: (value: string | null) => void;
  value?: string | null;
};

export type DateTimePickerProps = DatePickerProps & DisplayTime;

export type DateTimeRangePickerProps = DateRangePickerProps & DisplayTime;

export type DisplayTime = {
  displayHours?: boolean;
  displayMinutes?: boolean;
  displaySeconds?: boolean;
}

export type PickerComponentProps = DatePickerProps &
  DisplayTime & {
    type: DatePickerType;
    quickRanges?: AnonymousObject<DateQuickRange>;
  };

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

export type DatePickerType = {
  date: boolean;
  range: boolean;
  time: boolean;
};

export type QuickTimeRangeComponentProps = {
  quickRanges: AnonymousObject<DateQuickRange>;
  onChange: (quickRangeLabel: string) => void;
};

export type TimeComponentProps = StylableProps &
  Required<DisplayTime> & {
    from: DatePickerDate;
    to: DatePickerDate;
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

export type TimeRangeComponentProps = Required<DisplayTime> & {
  edge: 'from' | 'to';
  value: DatePickerDate;
  type: DatePickerType;
  onChange: (value: string, edge: 'from' | 'to') => void;
};
