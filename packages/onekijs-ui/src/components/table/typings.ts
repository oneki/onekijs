import {
  AnyFunction,
  Collection,
  CollectionBroker,
  CollectionBy,
  CollectionProxy,
  FormContext,
  Item,
  ItemAdaptee,
  LoadingItemStatus,
  QueryFilterOrCriteria,
  QuerySortBy,
  UseCollectionOptions,
} from 'onekijs-framework';
import React from 'react';
import { InputProps } from '../input/typings';
import { ListItemProps, ListItems, ListState, UseListOptions } from '../list/typings';
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
  C extends TableController<T, I, S> = TableController<T, I, S>
> = TableConfig<T, I> & {
  controller: CollectionProxy<T, I, S, C>;
};

export type FormTableProps<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  S extends TableState<T, I> = TableState<T, I>,
  C extends TableController<T, I, S> = TableController<T, I, S>
> = ControllerTableProps<T, I, S, C> & {
  name: string;
  format?: 'id' | 'object' | 'auto';
};

export type FormTableContext<T = any> = FormContext & {
  tableName: string;
  onSelect: (item: TableItem<T>, selected: boolean) => void;
};

export type TableBodyCellProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  colIndex: number;
  column: TableColumn<T, I>;
  rowId?: string | number;
  rowIndex: number;
  item: I;
};

export type TableBodyProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  columns: TableColumn<T, I>[];
  items: (I | undefined)[];
  contentRef: React.RefObject<HTMLDivElement>;
  tableRef: React.RefObject<HTMLDivElement>;
};

export type TableBodyRowProps<T = any, I extends TableItem<T> = TableItem<T>> = ListItemProps<T, I> & {
  className?: string;
  CellComponent?: React.FC<TableBodyCellProps<T, I>>;
  columns: TableColumn<T, I>[];
  onExpand: (item: I | undefined, index: number) => void;
  onExpanding: (item: I | undefined, index: number) => void;
};

export type TableConfig<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  bodyClassName?: string;
  BodyComponent?: React.FC<TableBodyProps<T, I>>;
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
  onRowClick?: TableRowHandler<T, I>;
  onRowEnter?: TableRowHandler<T, I>;
  onRowLeave?: TableRowHandler<T, I>;
  onRowOver?: TableRowHandler<T, I>;
  onRowOut?: TableRowHandler<T, I>;
  rowClassName?: string | ((item: I | undefined, rowIndex: number, columns: TableColumn<T, I>[]) => string);
  RowComponent?: React.FC<TableBodyRowProps<T, I>>;
  sortable?: boolean;
  stripRows?: boolean;
};

export type TableController<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  S extends TableState<T, I> = TableState<T, I>
> = Collection<T, I, S> & {
  addColumn(column: TableColumn<T, I>, position?: number): void;
  addSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  columns: TableColumn<T, I>[];
  initCell(
    rowIndex: number | 'header-title' | 'header-filter' | 'footer',
    colId: string,
    ref: React.RefObject<HTMLDivElement>,
  ): boolean;
  onMount(tableRef: React.RefObject<HTMLDivElement>, contentRef: React.RefObject<HTMLDivElement>): void;
  removeColumn(id: string): void;
  removeSelected<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[];
  setSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  step: 'unmounted' | 'mounted' | 'initializing';
  toggle(item: I): void;
};

export type TableColumn<T, I extends TableItem<T> = TableItem<T>> = TableColumnSpec<T, I> & {
  computedWidth?: TableColumnComputedWidth;
};

export type TableColumnSpec<T, I extends TableItem<T> = TableItem<T>> = {
  className?: string | ((item: I, column: TableColumn<T, I>, rowIndex: number) => string);
  CellComponent?: React.FC<TableBodyCellProps<T, I>>;
  footerClassName?: string | ((column: TableColumn<T, I>) => string);
  FooterComponent?: React.FC<TableFooterCellProps<T, I>>;
  filterable?: boolean;
  FilterComponent?: React.FC<TableFilterProps<T, I>>;
  headerClassName?: string | ((column: TableColumn<T, I>) => string);
  HeaderComponent?: React.FC<TableHeaderCellProps<T, I>>;
  id: string;
  maxWidth?: string;
  minWidth?: string;
  sortable?: boolean;
  title?: string;
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

export type TableFilterProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  column: TableColumn<T, I>;
  filter?: QueryFilterOrCriteria;
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
  selected?: boolean;
  expanded?: boolean;
};

export type TableItemAdaptee = ItemAdaptee;

export type TableItemAdapter<T = any> = (data: T) => TableItemAdaptee;

export type TableRowHandler<T = any, I extends TableItem<T> = TableItem<T>> = (item: I, index: number) => void;

export type TableItems<T = any> = ListItems<T>;

export type TableProps<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  S extends TableState<T, I> = TableState<T, I>,
  C extends TableController<T, I, S> = TableController<T, I, S>
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

export type UseInputColumnOptions<T = any, I extends TableItem<T> = TableItem<T>> = Omit<
  TableColumnSpec<T, I>,
  'CellComponent'
> &
  Omit<InputProps, 'className' | 'onFocus' | 'onChange' | 'onBlur'>;

export type UseSelectColumnOptions<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  F = any,
  FI extends SelectItem<F> = SelectItem<F>
> = Omit<TableColumnSpec<T, I>, 'CellComponent'> &
  Omit<SelectProps, 'className' | 'onFocus' | 'onChange' | 'onBlur' | 'items'> &
  UseCollectionOptions<F, FI> & {
    dataSource: string | F[];
  };

export type UseTableOptions<T = any, I extends TableItem<T> = TableItem<T>> = UseListOptions<T, I> & {
  adapter?: TableItemAdapter<T>;
  dataSource?: T[] | string;
  selected?: T[];
  columns?: TableColumn<T, I>[];
};
