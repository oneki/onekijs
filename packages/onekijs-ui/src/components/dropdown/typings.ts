import { Placement } from '@floating-ui/react';
import { AnyFunction } from 'onekijs-framework';

export type DropdownPlacement = Placement | 'auto' | 'auto-start' | 'auto-end';

export type DropdownProps = {
  attachToBody?: boolean;
  className?: string;
  open?: boolean;
  skidding?: number;
  distance?: number;
  onUpdate?: AnyFunction<void>;
  onDropStart?: (node: HTMLElement, isAppearing: boolean) => void;
  onDropping?: (node: HTMLElement, isAppearing: boolean) => void;
  onDropDone?: (node: HTMLElement, isAppearing: boolean) => void;
  onCollapseStart?: (node: HTMLElement) => void;
  onCollapseDone?: (node: HTMLElement) => void;
  onCollapsing?: (node: HTMLElement) => void;
  animationTimeout?: number;
  placement?: DropdownPlacement;
  fallbackPlacements?: DropdownPlacement[];
  widthModifier?: DropdownWidthModifier;
  width?: string;
  zIndex?: number;
};

export type DropdownWidthModifier = 'same' | 'min' | 'max';

export type DropdownComponentProps = DropdownProps & {
  refElement?: HTMLElement | null;
};
