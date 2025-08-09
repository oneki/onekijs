import { StylableProps } from '../../styles/typings';
import { DropdownWidthModifier } from '../dropdown/typings';

export type CalendarComponentProps = StylableProps & {
  month?: string | number;
  year?: string | number;
  minYear?: number;
  maxYear?: number;
  day?: string | number;
  onChange: (value: string) => void;
}


export type CalendarDay = {

  active?: boolean;
  current?: boolean;
  startRange?: boolean;
  stopRange?: boolean;
  inRange?: boolean;
  day: number;
  month: number;
  year: number;
}

export type DatePickerProps = Omit<BaseDatePickerComponentProps, 'range' | 'time' | 'date'>;

export type BaseDatePickerComponentProps = StylableProps & {
  animationMs?: number;
  attachDropdownToBody?: boolean;
  autoFocus?: boolean;
  date: boolean;
  disabled?: boolean;
  dropdownWidthModifier?: DropdownWidthModifier;
  nullable?: boolean;
  onBlur?: () => void;
  onChange?: (value: string | null) => void;
  onFocus?: () => void;
  openOnFocus?: boolean;
  placeholder?: string;
  range: boolean;
  time: boolean;
  value?: string | null;
}

export type DatePickerContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

export type TimeComponentProps = StylableProps & {
  hour?: number | string;
  minute?: number | string;
  onChange: (value: string) => void;
}

export type TimePartComponentProps = {
  type: 'hour' | 'minute' | 'second';
  value: string | number;
  onChange: (value: string) => void;
}
