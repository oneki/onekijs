import { AnyFunction, ChangeHandler, Collection, ItemAdapter, ItemMeta } from 'onekijs-core';
import { FC } from 'react';
import { ListItemHandler, ListItemProps, ListProps } from '../list/typings';

export type SelectAdapter<T, M extends SelectOptionMeta = SelectOptionMeta> = ItemAdapter<T, M>;

export interface SelectIconProps {
  open: boolean;
  loading: boolean;
  onIconClick: AnyFunction<void>;
}

export interface SelectInputProps extends React.InputHTMLAttributes<HTMLInputElement>, SelectIconProps {
  IconComponent?: FC<SelectIconProps>;
  focus?: boolean;
}

export type SelectInternalProps<T = any, M extends ItemMeta = SelectOptionMeta> = Omit<SelectProps, 'items'> & {
  collection: Collection<T, M>;
};

export type SelectOptionHandler<T = any, M extends ItemMeta = SelectOptionMeta> = ListItemHandler<T, M>;

export interface SelectOptionMeta extends ItemMeta {
  selected?: boolean;
  highlighted?: boolean;
}

export type SelectOptionProps<T = any, M extends SelectOptionMeta = SelectOptionMeta> = ListItemProps<T, M>;

export interface SelectOptionsProps<T = any, M extends SelectOptionMeta = SelectOptionMeta> extends ListProps<T, M> {
  search?: string;
}

export interface SelectProps<T = any, M extends SelectOptionMeta = SelectOptionMeta> extends ListProps<T, M> {
  InputComponent?: FC<SelectInputProps>;
  IconComponent?: FC<SelectIconProps>;
  placeholder?: string;
  value?: T | null;
  onChange?: ChangeHandler<T>;
  autoFocus?: boolean;
  className?: string;
}

export interface ClickOutsideHandler {
  handleClickOutside?: AnyFunction<void>;
}
