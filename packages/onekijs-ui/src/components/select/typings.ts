import {
  AnyFunction,
  ChangeHandler,
  Collection,
  CollectionProxy,
  FormFieldProps,
  ValidationStatus,
} from 'onekijs-framework';
import React, { FC } from 'react';
import { FieldLayoutProps, FieldSize } from '../field/typings';
import {
  ListItem,
  ListItemAdaptee,
  ListItemAdapter,
  ListItemHandler,
  ListItemProps,
  ListState,
  _ListProps,
} from '../list/typings';

export type ArraySelectProps<T = any, I extends SelectItem<T> = SelectItem<T>> = _SelectProps<T, I> & {
  adapter?: SelectItemAdapter<T>;
  dataSource: T[] | string;
  fetchOnce?: boolean;
};

export type FormSelectProps<T = any, I extends SelectItem<T> = SelectItem<T>> = SelectProps<T, I> &
  FormFieldProps &
  FieldLayoutProps & {
    defaultValue?: T | T[] | null;
    FieldComponent?: React.FC<SelectProps>;
  };

export type SelectComponentProps<
  T = any,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>,
  C extends SelectCollection<T, I, S> = SelectCollection<T, I, S>
> = _SelectProps<T, I> & {
  dataSource: CollectionProxy<T, I, S, C>;
};

export type SelectCollection<
  T,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>
> = Collection<T, I, S>;

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
  style?: React.CSSProperties;
}

export type SelectItem<T = any> = ListItem<T> & {
  selected?: boolean;
  highlighted?: boolean;
};

export type SelectItemAdaptee = ListItemAdaptee;

export type SelectItemAdapter<T = any> = ListItemAdapter<T>;

// export type SelectInternalProps<T = any, M extends ItemMeta = SelectOptionMeta> = Omit<SelectProps, 'items'> & {
//   collection: Collection<T, M>;
// };

export type SelectOptionHandler<T = any, I extends SelectItem<T> = SelectItem<T>> = ListItemHandler<T, I>;
export type SelectOptionSelectionHandler<T = any, I extends SelectItem<T> = SelectItem<T>> = (
  item: I,
  index: number,
  close?: boolean,
) => void;

export type SelectOptionProps<T = any, I extends SelectItem<T> = SelectItem<T>> = ListItemProps<T, I> & {
  multiple?: boolean;
};

export type SelectProps<
  T = any,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>,
  C extends SelectCollection<T, I, S> = SelectCollection<T, I, S>
> = ArraySelectProps<T, I> | SelectComponentProps<T, I, S, C>;

export type _SelectProps<T = any, I extends SelectItem<T> = SelectItem<T>> = _ListProps<T, I> & {
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
};

export type SelectState<T = any, I extends SelectItem<T> = SelectItem<T>> = ListState<T, I>;

export interface SelectTokensProps<T = any, I extends SelectItem<T> = SelectItem<T>> {
  tokens?: I[];
  onRemove: SelectOptionHandler<T, I>;
}

export interface SelectTokenProps<T = any, I extends SelectItem<T> = SelectItem<T>> {
  token: I;
  onRemove: SelectOptionHandler<T, I>;
  index: number;
}
