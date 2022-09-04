import {
  Collection,
  CollectionBroker,
  CollectionBy,
  CollectionProxy,
  FormFieldProps,
  Item,
  ItemAdaptee,
  QueryFilterOrCriteria,
  QuerySortBy,
  UseCollectionOptions,
  ValidationStatus,
} from 'onekijs-framework';
import React, { FC } from 'react';
import { TshirtSize } from '../../styles/typings';
import { CheckboxProps } from '../checkbox/typings';
import { FieldLayoutProps } from '../field/typings';
import { InputProps } from '../input/typings';
import { ListItemProps, ListItems, ListNotFoundProps, ListState, UseListOptions } from '../list/typings';
import { SelectItem, SelectProps } from '../select/typings';

export type ArrayTableProps<T = any, I extends TableItem<T> = TableItem<T>> = TableConfig<T, I> & {
  adapter?: TableItemAdapter<T>;
  columns?: TableColumn<T, I>[];
  dataSource?: string | T[];
  fetchOnce?: boolean;
  selected?: T[];
};

export type ControllerTableProps<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  S extends TableState<T, I> = TableState<T, I>,
  C extends TableController<T, I, S> = TableController<T, I, S>,
> = TableConfig<T, I> & {
  controller: CollectionProxy<T, I, S, C>;
};

export type FormTableProps<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  S extends TableState<T, I> = TableState<T, I>,
  C extends TableController<T, I, S> = TableController<T, I, S>,
> = ControllerTableProps<T, I, S, C> &
  FormFieldProps &
  FieldLayoutProps & {
    addLabel?: string;
    format?: 'id' | 'object' | 'auto';
    defaultValue?: T[];
    FieldComponent?: React.FC<FormTableProps<T, I, S, C>>;
    value?: T[];
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: (value: T[]) => void;
    status?: ValidationStatus;
    size?: TshirtSize;
  };

export type FormTableContext<T = any> = {
  tableName: string;
  onSelect: (item: TableItem<T>, selected: boolean) => void;
  addLabel: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
};

export type TableBodyCellProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  colIndex: number;
  column: TableColumn<T, I>;
  rowId?: string | number;
  rowIndex: number;
  item: I;
  data: T;
};

export type Cell<T = any, I extends TableItem<T> = TableItem<T>> = FC<TableBodyCellProps<T, I>>;

export type TableBodyProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  columns: TableColumn<T, I>[];
  items: (I | undefined)[];
  contentRef: React.RefObject<HTMLDivElement>;
  tableRef: React.RefObject<HTMLDivElement>;
};

export type TableBodyRowProps<T = any, I extends TableItem<T> = TableItem<T>> = Omit<
  ListItemProps<T, I>,
  'CellComponent'
> & {
  className?: string;
  CellComponent?: React.FC<Omit<TableBodyCellProps<T, I>, 'data'>>;
  columns: TableColumn<T, I>[];
  onExpand?: (item: I | undefined, index: number) => void;
  onExpanding?: (item: I | undefined, index: number) => void;
  onExpanded?: (item: I | undefined, index: number) => void;
  onCollapse?: (item: I | undefined, index: number) => void;
  onCollapsing?: (item: I | undefined, index: number) => void;
  onCollapsed?: (item: I | undefined, index: number) => void;
};

export type TableConfig<T = any, I extends TableItem<T> = TableItem<T>> = {
  bodyClassName?: string;
  BodyComponent?: React.FC<TableBodyProps<T, I>>;
  className?: string;
  ExpandedComponent?: React.FC<TableExpandedProps<T, I>>;
  filterable?: boolean;
  fit?: boolean;
  fixHeader?: boolean;
  footer?: boolean;
  footerClassName?: string;
  FooterComponent?: React.FC<TableFooterProps<T, I>>;
  grow?: string;
  header?: boolean;
  headerClassName?: string;
  HeaderComponent?: React.FC<TableHeaderProps<T, I>>;
  height?: string;
  highlightRow?: boolean;
  increment?: number;
  LoadingComponent?: React.FC;
  LoadingRowComponent?: React.FC;
  NotFoundComponent?: React.FC<TableNotFoundProps> | null;
  onRowClick?: TableRowHandler<T, I>;
  onRowEnter?: TableRowHandler<T, I>;
  onRowLeave?: TableRowHandler<T, I>;
  onRowOver?: TableRowHandler<T, I>;
  onRowOut?: TableRowHandler<T, I>;
  preload?: number;
  rowClassName?: string | ((item: I | undefined, rowIndex: number, columns: TableColumn<T, I>[]) => string);
  RowComponent?: React.FC<TableBodyRowProps<T, I>>;
  sortable?: boolean;
  stripRows?: boolean;
};

export type TableController<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  S extends TableState<T, I> = TableState<T, I>,
> = Collection<T, I, S> & {
  addColumn(column: TableColumn<T, I>, position?: number): void;
  addSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  columns: TableColumn<T, I>[];
  initCell(
    rowIndex: number | 'header-title' | 'header-filter' | 'footer',
    colId: string,
    ref: React.RefObject<HTMLDivElement>,
  ): void;
  removeColumn(id: string): void;
  removeSelected<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[];
  setSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  toggle(item: I): void;
};

export type TableColumn<T, I extends TableItem<T> = TableItem<T>> = TableColumnSpec<T, I> & {
  computedWidth?: TableColumnComputedWidth;
};

export type TableColumnSpec<T, I extends TableItem<T> = TableItem<T>> = {
  className?: string | ((item: I, column: TableColumn<T, I>, rowIndex: number) => string);
  CellComponent?: Cell<T, I>;
  footerClassName?: string | ((column: TableColumn<T, I>) => string);
  FooterComponent?: React.FC<TableFooterCellProps<T, I>>;
  filterable?: boolean;
  FilterComponent?: React.FC<TableHeaderCellProps<T, I>>;
  headerClassName?: string | ((column: TableColumn<T, I>) => string);
  id: string;
  maxWidth?: string;
  minWidth?: string;
  sortable?: boolean;
  title?: string;
  TitleComponent?: React.FC<TableHeaderCellProps<T, I>>;
  weight?: number;
  width?: string;
};

export type TableColumnWidth = {
  auto?: boolean;
  grow?: boolean;
  force?: boolean;
  unit?: 'px' | '%';
  value?: number;
};

export type TableColumnComputedWidth = {
  width?: string;
  minWidth?: string;
};

export type TableExpandedProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  item: I;
  rowId?: string | number;
  rowIndex: number;
};

export type TableFooterCellProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  colIndex: number;
  column: TableColumn<T, I>;
};

export type TableFooterProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  columns: TableColumn<T, I>[];
};

export type TableHeaderCellProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  colIndex: number;
  column: TableColumn<T, I>;
  filter?: QueryFilterOrCriteria;
  filterable: boolean;
  sort?: QuerySortBy;
  sortable: boolean;
};

export type TableHeaderProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  columns: TableColumn<T, I>[];
};

export type TableItem<T = any> = Item<T> & {
  expanded?: boolean;
};

export type TableItemAdaptee = ItemAdaptee;

export type TableItemAdapter<T = any> = (data: T) => TableItemAdaptee;

export type TableRowHandler<T = any, I extends TableItem<T> = TableItem<T>> = (item: I, index: number) => void;

export type TableItems<T = any> = ListItems<T>;

export type TableNotFoundProps = ListNotFoundProps;

export type TableProps<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  S extends TableState<T, I> = TableState<T, I>,
  C extends TableController<T, I, S> = TableController<T, I, S>,
> = TableConfig<T, I> & {
  adapter?: TableItemAdapter<T>;
  controller?: CollectionProxy<T, I, S, C>;
  columns?: TableColumn<T, I>[];
  dataSource?: string | T[];
  fetchOnce?: boolean;
  selected?: T[];
};

export type TableSortProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  column: TableColumn<T, I>;
  sort?: QuerySortBy;
};

export type TableState<T = any, I extends TableItem<T> = TableItem<T>> = ListState<T, I> & {
  adapter?: TableItemAdapter<T>;
  columns: TableColumn<T, I>[];
  dataSource?: T[] | string;
  selected?: string[];
};

export type TableColumnsState<T = any, I extends TableItem<T> = TableItem<T>> = {
  columns: TableColumn<T, I>[];
};

export type CheckboxColumn<T = any, I extends TableItem<T> = TableItem<T>> = TableColumn<T, I>;

export type InputColumn<T = any, I extends TableItem<T> = TableItem<T>> = TableColumn<T, I>;

export type SelectColumn<T = any, I extends TableItem<T> = TableItem<T>> = TableColumn<T, I> & {
  broker: CollectionBroker<T, I>;
};

export type UseLinkColumnOptions<T = any, I extends TableItem<T> = TableItem<T>> = Omit<
  TableColumnSpec<T, I>,
  'CellComponent'
> & {
  href: string | ((item: I) => string);
};

export type UseCheckboxColumnOptions<T = any, I extends TableItem<T> = TableItem<T>> = Omit<
  TableColumnSpec<T, I>,
  'CellComponent'
> &
  Omit<FormFieldProps, 'name'> &
  Omit<CheckboxProps, 'className' | 'onFocus' | 'onChange' | 'onBlur' | 'defaultValue'> & {
    CellComponent?: (options: UseCheckboxColumnOptions<T, I>) => React.FC<TableBodyCellProps<T, I>>;
    defaultValue?: boolean;
  };

export type UseInputColumnOptions<T = any, I extends TableItem<T> = TableItem<T>> = Omit<
  TableColumnSpec<T, I>,
  'CellComponent'
> &
  Omit<FormFieldProps, 'name'> &
  Omit<InputProps, 'className' | 'onFocus' | 'onChange' | 'onBlur'> & {
    CellComponent?: (options: UseInputColumnOptions<T, I>) => React.FC<TableBodyCellProps<T, I>>;
  };

export type UseSelectColumnOptions<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  F = any,
  FI extends SelectItem<F> = SelectItem<F>,
> = Omit<TableColumnSpec<T, I>, 'CellComponent'> &
  Omit<SelectProps, 'className' | 'onFocus' | 'onChange' | 'onBlur' | 'items'> &
  Omit<FormFieldProps, 'name'> &
  UseCollectionOptions<F, FI> & {
    dataSource: string | F[];
    CellComponent?: (
      options: UseSelectColumnOptions<F, FI>,
      broker: CollectionBroker<F, FI>,
    ) => React.FC<TableBodyCellProps<T, I>>;
  };

export type UseTableOptions<T = any, I extends TableItem<T> = TableItem<T>> = UseListOptions<T, I> & {
  adapter?: TableItemAdapter<T>;
  selected?: T[];
};
