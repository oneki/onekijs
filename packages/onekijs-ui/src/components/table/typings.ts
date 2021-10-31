import React from 'react';
import {
  Collection,
  CollectionBroker,
  CollectionState,
  FormContext,
  Item,
  QueryFilterOrCriteria,
  QuerySortBy,
  UseCollectionOptions,
  CollectionItemAdapter,
} from 'onekijs-framework';
import { ListItemProps, ListItems } from '../list/typings';
import { SelectProps } from '../select/typings';
import { InputProps } from '../input/typings';

export type FormTableProps<T = any, I extends TableItem<T> = TableItem<T>> = TableProps<T, I> & {
  name: string;
  format?: 'id' | 'object' | 'auto';
};

export type FormTableContext<T = any> = FormContext & {
  tableName: string;
  onSelect: (item: TableItem<T>, selected: boolean) => void;
};

export type TableBodyCellProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  colIndex: number;
  column: TableColumn<T, I>;
  rowId?: string | number;
  rowIndex: number;
  rowValue: I;
};

export type TableBodyProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  tableRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  controller: TableController<T, I>;
};

export type TableBodyRowProps<T = any, I extends TableItem<T> = TableItem<T>> = ListItemProps<T, I> & {
  columns: TableColumn<T, I>[];
  CellComponent?: React.FC<TableBodyCellProps<T, I>>;
};

export type TableColumn<T, I extends TableItem<T> = TableItem<T>> = TableColumnSpec<T, I> & {
  computedWidth?: TableColumnComputedWidth;
};

export type TableColumnSpec<T, I extends TableItem<T> = TableItem<T>> = {
  className?: string | ((rowData: T, column: TableColumn<T, I>, context: TableController<T, I>) => string);
  CellComponent?: React.FC<TableBodyCellProps<T, I>>;
  footerClassName?: string | ((column: TableColumn<T, I>, context: TableController<T, I>) => string);
  FooterComponent?: React.FC<TableFooterCellProps<T, I>>;
  filterable?: boolean;
  FilterComponent?: React.FC<TableFilterProps<T, I>>;
  headerClassName?: string | ((column: TableColumn<T, I>, context: TableController<T, I>) => string);
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

export type TableController<T, I extends TableItem<T>> = Omit<Collection<T, I>, 'asService'> &
  Readonly<_TableState<T, I>> & {
    asService(): TableController<T, I>;
    addColumn(column: TableColumn<T, I>, position?: number): void;
    addSelected(uid: string | string[]): void;
    initCell(
      rowNumber: number | 'header-title' | 'header-filter' | 'footer',
      colId: string,
      ref: React.RefObject<HTMLDivElement>,
    ): boolean;
    onMount(tableRef: React.RefObject<HTMLDivElement>, contentRef: React.RefObject<HTMLDivElement>): void;
    removeColumn(id: string): void;
    removeSelected(uid: string | string[]): void;
    setFooter(footer?: boolean): void;
    setFooterComponent(FooterComponent?: React.FC<TableFooterProps<T, I>>): void;
    setHeader(header?: boolean): void;
    setHeaderComponent(HeaderComponent?: React.FC<TableHeaderProps<T, I>>): void;
    setSelected(uid: string | string[]): void;
    step: 'unmounted' | 'mounted' | 'initializing';
  };

export type TableFilterProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  column: TableColumn<T, I>;
  filter?: QueryFilterOrCriteria;
};

export type TableFooterCellProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  colIndex: number;
  column: TableColumn<T, I>;
};

export type TableFooterProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  controller: TableController<T, I>;
};

export type TableHeaderCellProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  colIndex: number;
  column: TableColumn<T, I>;
  filter?: QueryFilterOrCriteria;
  filterable: boolean;
  sort?: QuerySortBy;
  sortable: boolean;
};

export type TableHeaderProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  controller: TableController<T, I>;
};

export type TableItem<T> = Item<T> & {
  selected?: boolean;
};

export type TableRowHandler<T, I extends TableItem<T> = TableItem<T>> = (value: I, index: number) => void;

export type TableItems<T = any> = ListItems<T>;

export type TableProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  controller: TableController<T, I>;
  className?: string;
};

export type TableSortProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  column: TableColumn<T, I>;
  sort?: QuerySortBy;
};

type _TableState<T, I extends TableItem<T> = TableItem<T>> = {
  bodyClassName?: string | ((context: TableController<T, I>) => string);
  BodyComponent?: React.FC<TableBodyProps<T, I>>;
  bodyWidth?: string;
  columns: TableColumn<T, I>[];
  filterable?: boolean;
  fit?: boolean;
  fixHeader?: boolean;
  footer?: boolean;
  footerClassName?: string | ((context: TableController<T, I>) => string);
  FooterComponent?: React.FC<TableHeaderProps<T, I>>;
  grow?: string;
  header?: boolean;
  headerClassName?: string | ((context: TableController<T, I>) => string);
  HeaderComponent?: React.FC<TableHeaderProps<T, I>>;
  height?: string;
  highlightRow?: boolean;
  onRowClick?: TableRowHandler<T, I>;
  onRowEnter?: TableRowHandler<T, I>;
  onRowLeave?: TableRowHandler<T, I>;
  onRowOver?: TableRowHandler<T, I>;
  onRowOut?: TableRowHandler<T, I>;
  rowClassName?: string | ((rowData: T, context: TableController<T, I>) => string);
  RowComponent?: React.FC<TableBodyRowProps<T, I>>;
  selected?: string[];
  sortable?: boolean;
  stripRows?: boolean;
};

export type TableState<T, I extends TableItem<T> = TableItem<T>> = CollectionState<T, I> & _TableState<T, I>;

export type InputColumn<T, I extends TableItem<T> = TableItem<T>> = TableColumn<T, I>;

export type SelectColumn<T, I extends TableItem<T> = TableItem<T>> = TableColumn<T, I> & {
  broker: CollectionBroker<T, I>;
};

export type UseTableOptions<T, I extends TableItem<T>> = UseCollectionOptions<T, I> &
  _TableState<T, I> & {
    adapter?: CollectionItemAdapter<T, I>;
    dataSource?: T[] | string;
  };

export type UseInputColumnOptions<T, I extends TableItem<T> = TableItem<T>> = Omit<
  TableColumnSpec<T, I>,
  'CellComponent'
> &
  Omit<InputProps, 'className' | 'onFocus' | 'onChange' | 'onBlur'>;

export type UseSelectColumnOptions<T, I extends TableItem<T> = TableItem<T>> = Omit<
  TableColumnSpec<T, I>,
  'CellComponent'
> &
  Omit<SelectProps, 'className' | 'onFocus' | 'onChange' | 'onBlur' | 'items'> &
  UseCollectionOptions<T, I> & {
    dataSource: string | T[];
  };
