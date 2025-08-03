import { StylableProps } from '../../styles/typings';
import { DropdownWidthModifier } from '../dropdown/typings';

export type CalendarComponentProps = StylableProps & {
  month?: string | number;
  year?: string | number;
  day?: string | number;
  onChange: (value: string | null) => void;
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

export type DatePickerContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
