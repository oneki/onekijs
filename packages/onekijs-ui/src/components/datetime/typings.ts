import { StylableProps } from '../../styles/typings';
import { DropdownWidthModifier } from '../dropdown/typings';

export type CalendarComponentProps = StylableProps & {
  from: DatePickerDate;
  maxDate?: Date;
  minDate?: Date;
  onChange: (formDate: string | undefined, toDate?: string) => void;
  type: DatePickerType;
  to: DatePickerDate;
}


export type CalendarDay = {

  active?: boolean;
  current?: boolean;
  startRange?: boolean;
  endRange?: boolean;
  inRange?: boolean;
  day: number;
  month: number;
  year: number;
}

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
}


export type BaseDatePickerComponentProps = DatePickerProps & {
  type: DatePickerType;
}

export type DatePickerContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

export type DatePickerDate = {
    date?: string;
    time?: string;
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
    minute?: string;
    second?: string;
}

export type DatePickerType = {
  date: boolean;
  range: boolean;
  time: boolean;
}

export type TimeComponentProps = StylableProps & {
  from: DatePickerDate;
  to: DatePickerDate;
  type: DatePickerType;
  onChange: (value: string, dir: 'from' | 'to') => void;
}

export type TimePartComponentProps = {
  dir: 'from' | 'to';
  type: 'hour' | 'minute' | 'second';
  value: string | number;
  onChange: (value: string, dir: 'from' | 'to') => void;
}
