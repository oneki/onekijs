import { AnyFunction } from 'onekijs-framework';
import { SizePropertyTheme } from '../../styles/typings';

export interface DropdownProps {
  className?: string;
  refElement: HTMLElement | null;
  open: boolean;
  height?: SizePropertyTheme;
  skidding?: number;
  distance?: number;
  onUpdate?: AnyFunction<void>;
}
