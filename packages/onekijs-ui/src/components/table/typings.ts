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
} from 'onekijs-framework';
import { ListItemProps, ListItems } from '../list/typings';
import { SelectProps } from '../select/typings';
import { InputProps } from '../input/typings';

export type FormTableProps<T = any, M extends TableItemMeta = TableItemMeta> = TableProps<T, M> & {
  name: string;
  format?: 'id' | 'object' | 'auto';
};

export type FormTableContext = FormContext & {
  tableName: string;
  onSelect: (item: TableItem, selected: boolean) => void;
};

export type TableBodyCellProps<T = any, M extends TableItemMeta = TableItemMeta> = {
  colIndex: number;
  column: TableColumn<T, M>;
  rowId?: string | number;
  rowIndex: number;
  rowValue: TableItem<T>;
};

export type TableBodyProps<T = any, M extends TableItemMeta = TableItemMeta> = {
  tableRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  controller: TableController<T, M>;
};

export type TableBodyRowProps<T = any, M extends TableItemMeta = TableItemMeta> = ListItemProps<T, M> & {
  columns: TableColumn<T, M>[];
  CellComponent?: React.FC<TableBodyCellProps<T, M>>;
};

export type TableColumn<T = any, M extends TableItemMeta = TableItemMeta> = TableColumnSpec<T, M> & {
  computedWidth?: TableColumnComputedWidth;
};

export type TableColumnSpec<T = any, M extends TableItemMeta = TableItemMeta> = {
  className?: string | ((rowData: T, column: TableColumn<T, M>, context: TableController<T, M>) => string);
  CellComponent?: React.FC<TableBodyCellProps<T, M>>;
  footerClassName?: string | ((column: TableColumn<T, M>, context: TableController<T, M>) => string);
  FooterComponent?: React.FC<TableFooterCellProps<T, M>>;
  filterable?: boolean;
  FilterComponent?: React.FC<TableFilterProps<T, M>>;
  headerClassName?: string | ((column: TableColumn<T, M>, context: TableController<T, M>) => string);
  HeaderComponent?: React.FC<TableHeaderCellProps<T, M>>;
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

export type TableController<T = any, M extends TableItemMeta = TableItemMeta> = Omit<Collection<T, M>, 'asService'> &
  Readonly<_TableState<T, M>> & {
    asService(): TableController<T, M>;
    addColumn(column: TableColumn<T, M>, position?: number): void;
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
    setFooterComponent(FooterComponent?: React.FC<TableFooterProps>): void;
    setHeader(header?: boolean): void;
    setHeaderComponent(HeaderComponent?: React.FC<TableHeaderProps>): void;
    setSelected(id: string | number | (string | number)[]): void;
    step: 'unmounted' | 'mounted' | 'initializing';
  };

export type TableFilterProps<T = any, M extends TableItemMeta = TableItemMeta> = {
  column: TableColumn<T, M>;
  filter?: QueryFilterOrCriteria;
};

export type TableFooterCellProps<T = any, M extends TableItemMeta = TableItemMeta> = {
  colIndex: number;
  column: TableColumn<T, M>;
};

export type TableFooterProps<T = any, M extends TableItemMeta = TableItemMeta> = {
  controller: TableController<T, M>;
};

export type TableHeaderCellProps<T = any, M extends TableItemMeta = TableItemMeta> = {
  colIndex: number;
  column: TableColumn<T, M>;
  filter?: QueryFilterOrCriteria;
  filterable: boolean;
  sort?: QuerySortBy;
  sortable: boolean;
};

export type TableHeaderProps<T = any, M extends TableItemMeta = TableItemMeta> = {
  controller: TableController<T, M>;
};

export type TableItem<T = any, M extends TableItemMeta = TableItemMeta> = Item<T, M>;

export type TableRowHandler<T = any, M extends TableItemMeta = TableItemMeta> = (
  value: TableItem<T, M>,
  index: number,
) => void;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableItemMeta extends ItemMeta {
  selected?: boolean;
}

export type TableItems<T = any, M extends TableItemMeta = TableItemMeta> = ListItems<T, M>;

export type TableProps<T = any, M extends TableItemMeta = TableItemMeta> = {
  controller: TableController<T, M>;
  className?: string;
};

export type TableSortProps<T = any, M extends TableItemMeta = TableItemMeta> = {
  column: TableColumn<T, M>;
  sort?: QuerySortBy;
};

type _TableState<T = any, M extends TableItemMeta = TableItemMeta> = {
  bodyClassName?: string | ((context: TableController<T, M>) => string);
  BodyComponent?: React.FC<TableBodyProps<T>>;
  bodyWidth?: string;
  columns: TableColumn<T, M>[];
  filterable?: boolean;
  fit?: boolean;
  fixHeader?: boolean;
  footer?: boolean;
  footerClassName?: string | ((context: TableController<T, M>) => string);
  FooterComponent?: React.FC<TableHeaderProps>;
  grow?: string;
  header?: boolean;
  headerClassName?: string | ((context: TableController<T, M>) => string);
  HeaderComponent?: React.FC<TableHeaderProps>;
  height?: string;
  highlightRow?: boolean;
  onRowClick?: TableRowHandler<T, M>;
  onRowEnter?: TableRowHandler<T, M>;
  onRowLeave?: TableRowHandler<T, M>;
  onRowOver?: TableRowHandler<T, M>;
  onRowOut?: TableRowHandler<T, M>;
  rowClassName?: string | ((rowData: T, context: TableController<T, M>) => string);
  RowComponent?: React.FC<TableBodyRowProps<T, M>>;
  selected?: (string | number)[];
  sortable?: boolean;
  stripRows?: boolean;
};

export type TableState<T = any, M extends TableItemMeta = TableItemMeta> = CollectionState<T, M> & _TableState<T, M>;

export type InputColumn<T = any, M extends TableItemMeta = TableItemMeta> = TableColumn<T, M>;

export type SelectColumn<T = any, M extends TableItemMeta = TableItemMeta> = TableColumn<T, M> & {
  broker: CollectionBroker<T, M>;
};

export type UseTableOptions<T = any, M extends TableItemMeta = TableItemMeta> = UseCollectionOptions<T, M> &
  _TableState<T, M> & {
    dataSource?: T[] | string;
  };

export type UseInputColumnOptions<T = any, M extends TableItemMeta = TableItemMeta> = Omit<
  TableColumnSpec<T, M>,
  'CellComponent'
> &
  Omit<InputProps, 'className' | 'onFocus' | 'onChange' | 'onBlur'>;

export type UseSelectColumnOptions<T = any, M extends TableItemMeta = TableItemMeta> = Omit<
  TableColumnSpec<T, M>,
  'CellComponent'
> &
  Omit<SelectProps, 'className' | 'onFocus' | 'onChange' | 'onBlur' | 'items'> &
  UseCollectionOptions<T, M> & {
    dataSource: string | T[];
  };
