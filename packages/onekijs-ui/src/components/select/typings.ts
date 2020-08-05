import { AnonymousObject, AnyFunction } from 'onekijs';
import { FC } from 'react';
import { ListItemAdapter, ListItemProps, ListProps } from '../list/typings';

export interface SelectInputProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  open: boolean;
  onIconClick: AnyFunction<void>;
}

export interface SelectProps<T> extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'height'>, ListProps<T> {
  InputComponent?: FC<SelectInputProps>;
}

export interface SelectOptionsProps<T> extends ListProps<T> {
  search?: string;
}

export type SelectOptionProps<T> = ListItemProps<T>;

export type SelectAdapter<T> = ListItemAdapter<T>;
