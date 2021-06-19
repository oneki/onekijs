import { AnyFunction, ChangeHandler, FormFieldProps, Item, ItemAdapter, ItemMeta, ValidationStatus } from 'onekijs-core';
import React, { FC } from 'react';
import { FieldLayoutProps, FieldSize } from '../field/typings';
import { ListItemHandler, ListItemProps, ListProps } from '../list/typings';

export type FormSelectProps<T = any, M extends SelectOptionMeta = SelectOptionMeta> = SelectProps<T,M> & FormFieldProps & FieldLayoutProps & {
  defaultValue?: T | T[] | null;
  FieldComponent?: React.FC<SelectProps>
};

export type SelectAdapter<T, M extends SelectOptionMeta = SelectOptionMeta> = ItemAdapter<T, M>;
export type SelectItem<T = any, M extends SelectOptionMeta = SelectOptionMeta> = Item<T, M>;

export interface SelectIconProps {
  open: boolean;
  loading: boolean;
  fetching: boolean;
  onClick: AnyFunction<void>;
}

export interface SelectInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
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
  onRemove: SelectOptionHandler;
}

export interface SelectTokensProps {
  tokens?: SelectItem[];
  onRemove: SelectOptionHandler;
}

export interface SelectTokenProps {
  token: SelectItem;
  onRemove: SelectOptionHandler;
  index: number;
}

// export type SelectInternalProps<T = any, M extends ItemMeta = SelectOptionMeta> = Omit<SelectProps, 'items'> & {
//   collection: Collection<T, M>;
// };

export type SelectOptionHandler<T = any, M extends ItemMeta = SelectOptionMeta> = ListItemHandler<T, M>;
export type SelectOptionSelectionHandler<T = any, M extends ItemMeta = SelectOptionMeta> = (item: Item<T, M>, index: number, close?: boolean) => void;

export interface SelectOptionMeta extends ItemMeta {
  selected?: boolean;
  highlighted?: boolean;
}

export type SelectOptionProps<T = any, M extends SelectOptionMeta = SelectOptionMeta> = ListItemProps<T, M> & {
  multiple?: boolean;
};

export interface SelectOptionsProps<T = any, M extends SelectOptionMeta = SelectOptionMeta> extends ListProps<T, M> {
  search?: string;
}

export interface SelectProps<T = any, M extends SelectOptionMeta = SelectOptionMeta> extends ListProps<T, M> {
  InputComponent?: FC<SelectInputProps>;
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





