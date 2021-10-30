import {
  AnyFunction,
  ChangeHandler,
  FormFieldProps,
  Item,
  ItemMeta,
  ValidationStatus,
  CollectionItemAdapter,
} from 'onekijs-framework';
import React, { FC } from 'react';
import { FieldLayoutProps, FieldSize } from '../field/typings';
import { ListItemHandler, ListItemProps, ListProps } from '../list/typings';

export type FormSelectProps<
  T = any,
  M extends SelectOptionMeta = SelectOptionMeta,
  I extends SelectItem<T, M> = SelectItem<T, M>
> = SelectProps<T, M, I> &
  FormFieldProps &
  FieldLayoutProps & {
    defaultValue?: T | T[] | null;
    FieldComponent?: React.FC<SelectProps>;
  };

export type SelectAdapter<
  T,
  M extends SelectOptionMeta = SelectOptionMeta,
  I extends SelectItem<T, M> = SelectItem<T, M>
> = CollectionItemAdapter<T, M, I>;
export type SelectItem<T = any, M extends SelectOptionMeta = SelectOptionMeta> = Item<T, M>;

export interface SelectIconProps {
  open: boolean;
  loading: boolean;
  fetching: boolean;
  onClick: AnyFunction<void>;
}

export interface SelectInputProps<
  T = any,
  M extends SelectOptionMeta = SelectOptionMeta,
  I extends SelectItem<T, M> = SelectItem<T, M>
> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  IconComponent?: FC<SelectIconProps>;
  focus: boolean;
  value?: string;
  tokens?: SelectItem[];
  open: boolean;
  loading: boolean;
  fetching: boolean;
  setOpen: (open: boolean) => void;
  onChange: (nextValue: string) => void;
  multiple: boolean;
  onRemove: SelectOptionHandler<T, M, I>;
}

export interface SelectTokensProps<
  T = any,
  M extends SelectOptionMeta = SelectOptionMeta,
  I extends SelectItem<T, M> = SelectItem<T, M>
> {
  tokens?: I[];
  onRemove: SelectOptionHandler<T, M, I>;
}

export interface SelectTokenProps<
  T = any,
  M extends SelectOptionMeta = SelectOptionMeta,
  I extends SelectItem<T, M> = SelectItem<T, M>
> {
  token: I;
  onRemove: SelectOptionHandler<T, M, I>;
  index: number;
}

// export type SelectInternalProps<T = any, M extends ItemMeta = SelectOptionMeta> = Omit<SelectProps, 'items'> & {
//   collection: Collection<T, M>;
// };

export type SelectOptionHandler<T, M extends SelectOptionMeta, I extends SelectItem<T, M>> = ListItemHandler<T, M, I>;
export type SelectOptionSelectionHandler<T, M extends SelectOptionMeta, I extends SelectItem<T, M>> = (
  item: I,
  index: number,
  close?: boolean,
) => void;

export interface SelectOptionMeta extends ItemMeta {
  selected?: boolean;
  highlighted?: boolean;
}

export type SelectOptionProps<
  T = any,
  M extends SelectOptionMeta = SelectOptionMeta,
  I extends SelectItem<T, M> = SelectItem<T, M>
> = ListItemProps<T, M, I> & {
  multiple?: boolean;
};

export interface SelectOptionsProps<
  T = any,
  M extends SelectOptionMeta = SelectOptionMeta,
  I extends SelectItem<T, M> = SelectItem<T, M>
> extends ListProps<T, M, I> {
  search?: string;
}

export interface SelectProps<
  T = any,
  M extends SelectOptionMeta = SelectOptionMeta,
  I extends SelectItem<T, M> = SelectItem<T, M>
> extends ListProps<T, M, I> {
  InputComponent?: FC<SelectInputProps<T, M, I>>;
  IconComponent?: FC<SelectIconProps>;
  placeholder?: string;
  value?: T | T[] | null;
  onChange?: ChangeHandler<T>;
  onFocus?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
  className?: string;
  multiple?: boolean;
  status?: ValidationStatus;
  name?: string;
  size?: FieldSize;
}
