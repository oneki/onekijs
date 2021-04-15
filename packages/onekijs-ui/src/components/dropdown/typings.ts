import { SizeProperty } from "styles/typings";

export interface DropdownProps {
  className?: string;
  refElement: HTMLElement | null;
  open: boolean;
  height?: SizeProperty;
}
