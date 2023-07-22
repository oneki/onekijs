import { Property } from 'csstype';
import { ReactNode } from 'react';
import { SizePropertyTheme, TLength, TshirtSize } from '../../styles/typings';

export type ModalProps = {
  attachToBody?: boolean;
  className?: string;
  size?: TshirtSize;
  width?: TshirtSize | SizePropertyTheme | Property.Width<TLength>;
  height?: TshirtSize | SizePropertyTheme | Property.Height<TLength>;
  animationDuration?: number;
  open?: boolean;
  closeIcon?: boolean;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  onClose?: () => void;
  onClosed?: () => void;
  buttons?: ReactNode[];
  title?: ReactNode;
};
