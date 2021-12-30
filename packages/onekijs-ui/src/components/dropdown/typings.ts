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
  onDropStart?: (node: HTMLElement, isAppearing: boolean) => void;
  onDropping?: (node: HTMLElement, isAppearing: boolean) => void;
  onDropDone?: (node: HTMLElement, isAppearing: boolean) => void;
  onCollapseStart?: (node: HTMLElement) => void;
  onCollapseDone?: (node: HTMLElement) => void;
  onCollapsing?: (node: HTMLElement) => void;
}
