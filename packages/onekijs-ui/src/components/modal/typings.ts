import { HeightProperty, WidthProperty } from 'csstype';
import { ReactNode } from 'react';
import { SizePropertyTheme, TLength, TshirtSize } from '../../styles/typings';

export type ModalProps = {
  attachToBody?: boolean;
  className?: string;
  size?: TshirtSize;
  width?: TshirtSize | SizePropertyTheme | WidthProperty<TLength>;
  height?: TshirtSize | SizePropertyTheme | HeightProperty<TLength>;
  animationDuration?: number;
  open?: boolean;
  closeIcon?: boolean;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  onClose: () => void;
  onClosed: () => void;
  buttons?: ReactNode[];
  title?: ReactNode;
};
