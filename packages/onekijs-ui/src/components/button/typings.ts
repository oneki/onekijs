import { AnyFunction } from 'onekijs-framework';
import { ReactNode } from 'react';
import { ColorPropertyTheme } from '../../styles/typings';
import { DropdownProps } from '../dropdown/typings';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: ColorPropertyTheme;
  pattern?: 'solid' | 'outline' | 'flat';
  IconComponent?: React.FC<ButtonProps>;
  loading?: boolean;
}

export interface SubmitButtonProps extends ButtonProps {
  showErrors?: boolean;
}

export interface DropDownButtonProps extends ButtonProps, DropdownProps {
  listElement: ReactNode;
  onDrop: AnyFunction;
  onCollapse: AnyFunction;
}

export interface DropDownButtonProps extends ButtonProps, ListProps, DropdownProps {}
