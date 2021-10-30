import React from 'react';
import {
  Collection,
  CollectionBroker,
  CollectionState,
  FormContext,
  Item,
  ItemMeta,
  QueryFilterOrCriteria,
  QuerySortBy,
  UseCollectionOptions,
  CollectionItemAdapter,
} from 'onekijs-framework';
import { ListItemProps, ListItems } from '../list/typings';
import { SelectProps } from '../select/typings';
import { InputProps } from '../input/typings';

export type FormTableProps<
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
> = TableProps<T, M, I> & {
  name: string;
  format?: 'id' | 'object' | 'auto';
};

export type FormTableContext = FormContext & {
  tableName: string;
  onSelect: (item: TableItem, selected: boolean) => void;
};

export type TableBodyCellProps<
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
> = {
  colIndex: number;
  column: TableColumn<T, M, I>;
  rowId?: string | number;
  rowIndex: number;
  rowValue: I;
};

export type TableBodyProps<
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
> = {
  tableRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  controller: TableController<T, M, I>;
};

export type TableBodyRowProps<
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
> = ListItemProps<T, M, I> & {
  columns: TableColumn<T, M, I>[];
  CellComponent?: React.FC<TableBodyCellProps<T, M, I>>;
};

export type TableColumn<T, M extends TableItemMeta, I extends TableItem<T, M>> = TableColumnSpec<T, M, I> & {
  computedWidth?: TableColumnComputedWidth;
};

export type TableColumnSpec<T, M extends TableItemMeta, I extends TableItem<T, M>> = {
  className?: string | ((rowData: T, column: TableColumn<T, M, I>, context: TableController<T, M, I>) => string);
  CellComponent?: React.FC<TableBodyCellProps<T, M, I>>;
  footerClassName?: string | ((column: TableColumn<T, M, I>, context: TableController<T, M, I>) => string);
  FooterComponent?: React.FC<TableFooterCellProps<T, M, I>>;
  filterable?: boolean;
  FilterComponent?: React.FC<TableFilterProps<T, M, I>>;
  headerClassName?: string | ((column: TableColumn<T, M, I>, context: TableController<T, M, I>) => string);
  HeaderComponent?: React.FC<TableHeaderCellProps<T, M, I>>;
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

export type TableController<T, M extends TableItemMeta, I extends TableItem<T, M>> = Omit<
  Collection<T, M, I>,
  'asService'
> &
  Readonly<_TableState<T, M, I>> & {
    asService(): TableController<T, M, I>;
    addColumn(column: TableColumn<T, M, I>, position?: number): void;
    addSelected(id: string | number | (string | number)[]): void;
    initCell(
      rowNumber: number | 'header-title' | 'header-filter' | 'footer',
      colId: string,
      ref: React.RefObject<HTMLDivElement>,
    ): boolean;
    onMount(tableRef: React.RefObject<HTMLDivElement>, contentRef: React.RefObject<HTMLDivElement>): void;
    removeColumn(id: string): void;
    removeSelected(id: string | number | (string | number)[]): void;
    setFooter(footer?: boolean): void;
    setFooterComponent(FooterComponent?: React.FC<TableFooterProps<T, M, I>>): void;
    setHeader(header?: boolean): void;
    setHeaderComponent(HeaderComponent?: React.FC<TableHeaderProps<T, M, I>>): void;
    setSelected(id: string | number | (string | number)[]): void;
    step: 'unmounted' | 'mounted' | 'initializing';
  };

export type TableFilterProps<
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
> = {
  column: TableColumn<T, M, I>;
  filter?: QueryFilterOrCriteria;
};

export type TableFooterCellProps<
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
> = {
  colIndex: number;
  column: TableColumn<T, M, I>;
};

export type TableFooterProps<
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
> = {
  controller: TableController<T, M, I>;
};

export type TableHeaderCellProps<
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
> = {
  colIndex: number;
  column: TableColumn<T, M, I>;
  filter?: QueryFilterOrCriteria;
  filterable: boolean;
  sort?: QuerySortBy;
  sortable: boolean;
};

export type TableHeaderProps<
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
> = {
  controller: TableController<T, M, I>;
};

export type TableItem<T = any, M extends TableItemMeta = TableItemMeta> = Item<T, M>;

export type TableRowHandler<T, M extends TableItemMeta, I extends TableItem<T, M>> = (value: I, index: number) => void;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableItemMeta extends ItemMeta {
  selected?: boolean;
}

export type TableItems<T = any, M extends TableItemMeta = TableItemMeta> = ListItems<T, M>;

export type TableProps<
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
> = {
  controller: TableController<T, M, I>;
  className?: string;
};

export type TableSortProps<
  T = any,
  M extends TableItemMeta = TableItemMeta,
  I extends TableItem<T, M> = TableItem<T, M>
> = {
  column: TableColumn<T, M, I>;
  sort?: QuerySortBy;
};

type _TableState<T, M extends TableItemMeta, I extends TableItem<T, M>> = {
  bodyClassName?: string | ((context: TableController<T, M, I>) => string);
  BodyComponent?: React.FC<TableBodyProps<T>>;
  bodyWidth?: string;
  columns: TableColumn<T, M, I>[];
  filterable?: boolean;
  fit?: boolean;
  fixHeader?: boolean;
  footer?: boolean;
  footerClassName?: string | ((context: TableController<T, M, I>) => string);
  FooterComponent?: React.FC<TableHeaderProps<T, M, I>>;
  grow?: string;
  header?: boolean;
  headerClassName?: string | ((context: TableController<T, M, I>) => string);
  HeaderComponent?: React.FC<TableHeaderProps<T, M, I>>;
  height?: string;
  highlightRow?: boolean;
  onRowClick?: TableRowHandler<T, M, I>;
  onRowEnter?: TableRowHandler<T, M, I>;
  onRowLeave?: TableRowHandler<T, M, I>;
  onRowOver?: TableRowHandler<T, M, I>;
  onRowOut?: TableRowHandler<T, M, I>;
  rowClassName?: string | ((rowData: T, context: TableController<T, M, I>) => string);
  RowComponent?: React.FC<TableBodyRowProps<T, M, I>>;
  selected?: (string | number)[];
  sortable?: boolean;
  stripRows?: boolean;
};

export type TableState<T, M extends TableItemMeta, I extends TableItem<T, M>> = CollectionState<T, M, I> &
  _TableState<T, M, I>;

export type InputColumn<T, M extends TableItemMeta, I extends TableItem<T, M>> = TableColumn<T, M, I>;

export type SelectColumn<T, M extends TableItemMeta, I extends TableItem<T, M>> = TableColumn<T, M, I> & {
  broker: CollectionBroker<T, M, I>;
};

export type UseTableOptions<T, M extends TableItemMeta, I extends TableItem<T, M>> = UseCollectionOptions<T, M> &
  _TableState<T, M, I> & {
    adapter?: CollectionItemAdapter<T, M, I>;
    dataSource?: T[] | string;
  };

export type UseInputColumnOptions<T, M extends TableItemMeta, I extends TableItem<T, M>> = Omit<
  TableColumnSpec<T, M, I>,
  'CellComponent'
> &
  Omit<InputProps, 'className' | 'onFocus' | 'onChange' | 'onBlur'>;

export type UseSelectColumnOptions<T, M extends TableItemMeta, I extends TableItem<T, M>> = Omit<
  TableColumnSpec<T, M, I>,
  'CellComponent'
> &
  Omit<SelectProps, 'className' | 'onFocus' | 'onChange' | 'onBlur' | 'items'> &
  UseCollectionOptions<T, M> & {
    dataSource: string | T[];
  };
