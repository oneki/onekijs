import {
  AnyFunction,
  ChangeHandler,
  Collection,
  CollectionProxy,
  FormFieldProps,
  ValidationStatus,
} from 'onekijs-framework';
import React, { FC } from 'react';
import { TshirtSize } from '../../styles/typings';
import { DropdownWidthModifier } from '../dropdown/typings';
import { FieldLayoutProps } from '../field/typings';
import {
  ListConfig,
  ListItem,
  ListItemAdaptee,
  ListItemAdapter,
  ListItemHandler,
  ListItemProps,
  ListNotFoundProps,
  ListState,
} from '../list/typings';

export type ArraySelectProps<T = any, I extends SelectItem<T> = SelectItem<T>> = SelectConfig<T, I> & {
  adapter?: SelectItemAdapter<T>;
  dataSource: T[] | string;
  fetchOnce?: boolean;
};

export type ControllerSelectProps<
  T = any,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>,
  C extends SelectController<T, I, S> = SelectController<T, I, S>,
> = SelectConfig<T, I> & {
  controller: CollectionProxy<T, I, S, C>;
};

export type FormSelectProps<T = any, I extends SelectItem<T> = SelectItem<T>> = SelectProps<T, I> &
  FormFieldProps &
  FieldLayoutProps & {
    defaultValue?: T | T[] | null;
    FieldComponent?: React.FC<SelectProps>;
  };

export type SelectController<
  T,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>,
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
  onChange: (nextValue: string | null) => void;
  multiple: boolean;
  onRemove: SelectOptionHandler<T, I>;
  style?: React.CSSProperties;
  nullable?: boolean;
  clickable: boolean;
  minChars: number;
}

export type SelectItem<T = any> = ListItem<T>;

export type SelectItemAdaptee = ListItemAdaptee;

export type SelectItemAdapter<T = any> = ListItemAdapter<T>;

// export type SelectInternalProps<T = any, M extends ItemMeta = SelectOptionMeta> = Omit<SelectProps, 'items'> & {
//   collection: Collection<T, M>;
// };

export type SelectNotFoundProps = ListNotFoundProps;

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
  C extends SelectController<T, I, S> = SelectController<T, I, S>,
> = SelectConfig<T, I> & {
  adapter?: SelectItemAdapter<T>;
  controller?: CollectionProxy<T, I, S, C>;
  dataSource?: T[] | string;
  fetchOnce?: boolean;
};

export type SelectConfig<T = any, I extends SelectItem<T> = SelectItem<T>> = Omit<ListConfig<T, I>, 'ItemComponent'> & {
  attachDropdownToBody?: boolean;
  InputComponent?: FC<SelectInputProps<T, I>>;
  IconComponent?: FC<SelectIconProps>;
  NotFoundComponent?: FC<SelectNotFoundProps>;
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
  size?: TshirtSize;
  nullable?: boolean;
  minChars?: number;
  openOnFocus?: boolean;
  clickable?: boolean;
  dropdownWidthModifier?: DropdownWidthModifier;
  ItemComponent?: FC<SelectOptionProps>;
  OptionComponent?: FC<SelectOptionProps>;
  MultiOptionsComponent?: FC<SelectOptionProps>;
  animationMs?: number;
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
