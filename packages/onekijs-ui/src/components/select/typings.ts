import {
  AnyFunction,
  ChangeHandler,
  Collection,
  CollectionBroker,
  CollectionProxy,
  FormFieldProps,
  ValidationStatus,
} from 'onekijs-framework';
import React, { FC } from 'react';
import { TshirtSize } from '../../styles/typings';
import { DropdownWidthModifier } from '../dropdown/typings';
import { FieldLayoutProps } from '../field/typings';
import {
  CollectionListProps,
  ListConfig,
  ListItem,
  ListItemAdaptee,
  ListItemHandler,
  ListItemProps,
  ListNotFoundProps,
  ListState,
  UseListOptions,
} from '../list/typings';
import { TreeController, TreeItem, TreeProps, TreeState } from '../tree/typings';
import SelectService from './SelectService';

export type ArraySelectProps<T = any, I extends SelectItem<T> = SelectItem<T>> = SelectConfig<T, I> & {
  adapter?: SelectItemAdapter<T>;
  dataSource: T[] | [T, string][] | string;
  fetchOnce?: boolean;
};

export type ArrayTreeSelectProps<T = any, I extends TreeSelectItem<T> = TreeSelectItem<T>> = Omit<
  ArraySelectProps<T, I>,
  'dataSource'
> & {
  dataSource: T[] | string;
};

export type ControllerSelectProps<
  T = any,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>,
  C extends SelectController<T, I, S> = SelectController<T, I, S>,
> = SelectConfig<T, I> & {
  controller: CollectionProxy<T, I, S, C>;
};

export type ControllerTreeSelectProps<
  T = any,
  I extends TreeSelectItem<T> = TreeSelectItem<T>,
  S extends TreeSelectState<T, I> = TreeSelectState<T, I>,
  C extends TreeSelectController<T, I, S> = TreeSelectController<T, I, S>,
> = ControllerSelectProps<T, I, S, C> & TreeProps<T, I, S, C>;

export type FormSelectProps<T = any, I extends SelectItem<T> = SelectItem<T>> = SelectProps<T, I> &
  FormFieldProps<T> &
  FieldLayoutProps & {
    defaultValue?: T | T[] | null;
    FieldComponent?: React.FC<SelectProps<T, I>>;
  };

export type SelectController<
  T = any,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>,
> = Collection<T, I, S> & {
  config?: SelectConfig<T, I>;
  check: () => void;
  defaultValue: T | T[] | null | undefined;
  setDefaultValue: (defaultValue: T | T[] | null | undefined) => void;
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
  tokens?: I[];
  open: boolean;
  loading: boolean;
  fetching: boolean;
  setOpen: (open: boolean) => void;
  onChange: (nextValue: string | null) => void;
  multiple: boolean;
  onRemove: SelectOptionHandler<T, I>;
  style?: React.CSSProperties;
  nullable?: boolean;
  searchable: boolean;
  clickable: boolean;
  minChars: number;
  autoCompleteSearch: boolean;
}

export type SelectGroup =
  | string
  | {
      text: string;
      [k: string]: any;
    };

export type SelectItem<T = any> = ListItem<T> & {
  group?: SelectGroup;
};

export type SelectItemAdaptee = ListItemAdaptee & {
  group?: SelectGroup;
};

export type SelectItemAdapter<T = any> = (data: T) => SelectItemAdaptee;

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
  dataSource?: T[] | [T, string][] | string;
  fetchOnce?: boolean;
};

export type SelectBroker<
  T = any,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>,
  C extends SelectController<T, I, S> = SelectController<T, I, S>,
> = CollectionBroker<T, I, S, C> & {
  setDefaultValue: (defaultValue: T | T[] | null | undefined, subscriberId?: string) => void;
};

export type SelectConfig<T = any, I extends SelectItem<T> = SelectItem<T>> = Omit<ListConfig<T, I>, 'ItemComponent'> & {
  attachDropdownToBody?: boolean;
  InputComponent?: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<SelectInputProps<T, I>> & React.RefAttributes<HTMLDivElement>
  >;
  IconComponent?: FC<SelectIconProps>;
  NotFoundComponent?: FC<SelectNotFoundProps>;
  placeholder?: string;
  value?: T | T[] | null;
  onChange?: ChangeHandler<T | T[] | null>;
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
  searchable?: boolean;
  dropdownWidthModifier?: DropdownWidthModifier;
  OptionComponent?: FC<SelectOptionProps<T, I>>;
  OptionGroupComponent?: FC<SelectOptionProps<T, I>>;
  OptionContentComponent?: FC<SelectOptionProps<T, I>>;
  OptionLoadingComponent?: FC;
  MultiOptionsComponent?: FC<SelectOptionProps<T, I>>;
  animationMs?: number;
  disabled?: boolean;
  defaultValue?: T | T[] | null;
  required?: boolean;
  sameWidth?: boolean;
  ListComponent?: React.FC<SelectListComponentProps<T, I>>;
  autoCompleteSearch?: boolean;
};

export type SelectListComponentProps<T = any, I extends SelectItem<T> = SelectItem<T>> = CollectionListProps<T, I> & {
  optionsRef: React.RefObject<HTMLDivElement>;
};

export type SelectState<T = any, I extends SelectItem<T> = SelectItem<T>> = ListState<T, I> & {
  invalidItems?: I[];
  validDefaultValue?: T | T[] | null;
  defaultValue?: T | T[] | null;
};

export interface SelectTokensProps<T = any, I extends SelectItem<T> = SelectItem<T>> {
  tokens?: I[];
  onRemove: SelectOptionHandler<T, I>;
}

export interface SelectTokenProps<T = any, I extends SelectItem<T> = SelectItem<T>> {
  token: I;
  onRemove: SelectOptionHandler<T, I>;
  index: number;
}

export type TreeSelectController<
  T,
  I extends TreeSelectItem<T> = TreeSelectItem<T>,
  S extends TreeSelectState<T, I> = TreeSelectState<T, I>,
> = SelectController<T, I, S> & TreeController<T, I, S>;

export type TreeSelectItem<T = any> = SelectItem<T> & TreeItem<T>;

export type TreeSelectProps<
  T = any,
  I extends TreeSelectItem<T> = TreeSelectItem<T>,
  S extends TreeSelectState<T, I> = TreeSelectState<T, I>,
  C extends TreeSelectController<T, I, S> = TreeSelectController<T, I, S>,
> = SelectProps<T, I, S, C> & TreeProps<T, I, S, C>;

export type TreeSelectState<T = any, I extends TreeSelectItem<T> = TreeSelectItem<T>> = SelectState<T, I> &
  TreeState<T, I>;

export type UseSelectOptions<T, I extends SelectItem<T> = SelectItem<T>> = UseListOptions<T, I>;

export type UseSelectController<T = any, I extends SelectItem<T> = SelectItem<T>> = (
  dataSource: T[] | [T, string][] | string | undefined,
  options?: UseSelectOptions<T, I>,
) => CollectionProxy<T, I, SelectState<T, I>, SelectService<T, I, SelectState<T, I>>>;
