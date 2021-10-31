import {
  AnyFunction,
  ChangeHandler,
  FormFieldProps,
  Item,
  ValidationStatus,
  CollectionItemAdapter,
} from 'onekijs-framework';
import React, { FC } from 'react';
import { FieldLayoutProps, FieldSize } from '../field/typings';
import { ListItemHandler, ListItemProps, ListProps } from '../list/typings';

export type FormSelectProps<T = any, I extends SelectItem<T> = SelectItem<T>> = SelectProps<T, I> &
  FormFieldProps &
  FieldLayoutProps & {
    defaultValue?: T | T[] | null;
    FieldComponent?: React.FC<SelectProps>;
  };

export type SelectAdapter<T, I extends SelectItem<T> = SelectItem<T>> = CollectionItemAdapter<T, I>;

export type SelectItem<T> = Item<T> & {
  selected?: boolean;
  highlighted?: boolean;
};

export interface SelectIconProps {
  open: boolean;
  loading: boolean;
  fetching: boolean;
  onClick: AnyFunction<void>;
}

export interface SelectInputProps<T = any, I extends SelectItem<T> = SelectItem<T>>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  IconComponent?: FC<SelectIconProps>;
  focus: boolean;
  value?: string;
  tokens?: SelectItem<T>[];
  open: boolean;
  loading: boolean;
  fetching: boolean;
  setOpen: (open: boolean) => void;
  onChange: (nextValue: string) => void;
  multiple: boolean;
  onRemove: SelectOptionHandler<T, I>;
}

export interface SelectTokensProps<T = any, I extends SelectItem<T> = SelectItem<T>> {
  tokens?: I[];
  onRemove: SelectOptionHandler<T, I>;
}

export interface SelectTokenProps<T = any, I extends SelectItem<T> = SelectItem<T>> {
  token: I;
  onRemove: SelectOptionHandler<T, I>;
  index: number;
}

// export type SelectInternalProps<T = any, M extends ItemMeta = SelectOptionMeta> = Omit<SelectProps, 'items'> & {
//   collection: Collection<T, M>;
// };

export type SelectOptionHandler<T, I extends SelectItem<T> = SelectItem<T>> = ListItemHandler<T, I>;
export type SelectOptionSelectionHandler<T, I extends SelectItem<T> = SelectItem<T>> = (
  item: I,
  index: number,
  close?: boolean,
) => void;

export type SelectOptionProps<T = any, I extends SelectItem<T> = SelectItem<T>> = ListItemProps<T, I> & {
  multiple?: boolean;
};

export interface SelectOptionsProps<T = any, I extends SelectItem<T> = SelectItem<T>> extends ListProps<T, I> {
  search?: string;
}

export interface SelectProps<T = any, I extends SelectItem<T> = SelectItem<T>> extends ListProps<T, I> {
  InputComponent?: FC<SelectInputProps<T, I>>;
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
