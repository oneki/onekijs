import { AnyFunction } from 'onekijs';
import { FC } from 'react';
import { ListItemAdapter, ListItemProps, ListProps } from '../list/typings';

export type SelectAdapter<T> = ListItemAdapter<T>;

export interface SelectIconProps {
  open: boolean;
  loading: boolean;
  onIconClick: AnyFunction<void>;
}

export interface SelectInputProps extends React.InputHTMLAttributes<HTMLInputElement>, SelectIconProps {
  IconComponent?: FC<SelectIconProps>;
  focus?: boolean;
}

export type SelectOptionProps<T = any> = ListItemProps<T>;

export interface SelectOptionsProps<T> extends ListProps<T> {
  search?: string;
}

export interface SelectProps<T>
  extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'height' | 'value'>,
    ListProps<T> {
  InputComponent?: FC<SelectInputProps>;
  IconComponent?: FC<SelectIconProps>;
  placeholder?: string;
  value?: T | null;
  autoFocus?: boolean;
}

export interface ClickOutsideHandler {
  handleClickOutside?: AnyFunction<void>;
}
