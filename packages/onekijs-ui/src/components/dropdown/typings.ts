import { AnyFunction } from "onekijs-core";
import { SizeProperty } from "styles/typings";

export interface DropdownProps {
  className?: string;
  refElement: HTMLElement | null;
  open: boolean;
  height?: SizeProperty;
  skidding?: number;
  distance?: number;
  onUpdate?: AnyFunction<void>;
}


