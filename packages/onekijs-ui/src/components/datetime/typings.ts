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

export type DatePickerProps = StylableProps & {
  animationMs?: number;
  attachDropdownToBody?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  dropdownWidthModifier?: DropdownWidthModifier;
  nullable?: boolean;
  onBlur?: () => void;
  onChange?: (value: string | null) => void;
  onFocus?: () => void;
  openOnFocus?: boolean;
  placeholder?: string;
  value?: string | null;
};

export type DateRange = {
  from: string | null;
  to: string | null;
};

export type DateQuickRange = {
  label: string;
  from: Date;
  to: Date;
};

export type DateQuickRanges = (DateQuickRange | 'Last hour' | 'Last day' | 'Last week' | 'Last month' | 'Last year')[];

export type DateRangePickerProps = Omit<DatePickerProps, 'value' | 'onChange' | 'defaultValue'> & {
  value?: DateRange | null;
  onChange?: (value: DateRange | null) => void;
  quickRanges?: DateQuickRanges;
  defaultValue?: DateRange | null | string;
};

type TimePickerProps = {
  displayHours?: boolean;
  displayMinutes?: boolean;
  displaySeconds?: boolean;
};

export type DateTimePickerProps = DatePickerProps & TimePickerProps;

export type DateTimeRangePickerProps = DateRangePickerProps & TimePickerProps;

export type BaseDatePickerComponentProps = DatePickerProps &
  TimePickerProps & {
    type: DatePickerType;
    quickRanges?: DateQuickRanges;
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
  quickRanges: DateQuickRanges;
  onChange: (quickRange: DateQuickRange) => void;
};

export type TimeComponentProps = StylableProps &
  Required<TimePickerProps> & {
    from: DatePickerDate;
    to: DatePickerDate;
    type: DatePickerType;
    onChange: (value: string, edge: 'from' | 'to') => void;
  };

export type TimeSelectorComponentProps = Required<TimePickerProps> & {
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

export type TimeRangeComponentProps = Required<TimePickerProps> & {
  edge: 'from' | 'to';
  value: DatePickerDate;
  type: DatePickerType;
  onChange: (value: string, edge: 'from' | 'to') => void;
};
