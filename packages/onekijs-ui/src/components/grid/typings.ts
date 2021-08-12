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

export type FormGridProps<T = any, M extends GridItemMeta = GridItemMeta> = GridProps<T, M> & {
  name: string;
};

export type FormGridContext = FormContext & {
  gridName: string;
};

export type GridBodyCellProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  colIndex: number;
  column: GridColumn<T, M>;
  rowId?: string | number;
  rowIndex: number;
  rowValue: GridItem<T>;
};

export type GridBodyProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  gridRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  controller: GridController<T, M>;
};

export type GridBodyRowProps<T = any, M extends GridItemMeta = GridItemMeta> = ListItemProps<T, M> & {
  columns: GridColumn<T, M>[];
  CellComponent?: React.FC<GridBodyCellProps<T, M>>;
};

export type GridColumn<T = any, M extends GridItemMeta = GridItemMeta> = GridColumnSpec<T, M> & {
  computedWidth?: GridColumnComputedWidth;
};

export type GridColumnSpec<T = any, M extends GridItemMeta = GridItemMeta> = {
  className?: string | ((rowData: T, column: GridColumn<T, M>, context: GridController<T, M>) => string);
  CellComponent?: React.FC<GridBodyCellProps<T, M>>;
  footerClassName?: string | ((column: GridColumn<T, M>, context: GridController<T, M>) => string);
  FooterComponent?: React.FC<GridFooterCellProps<T, M>>;
  filterable?: boolean;
  headerClassName?: string | ((column: GridColumn<T, M>, context: GridController<T, M>) => string);
  HeaderComponent?: React.FC<GridHeaderCellProps<T, M>>;
  id: string;
  maxWidth?: string;
  minWidth?: string;
  sortable?: boolean;
  title?: string;
  width?: string;
};

export type GridColumnWidth = {
  auto?: boolean;
  grow?: boolean;
  force?: boolean;
  unit?: 'px' | '%';
  value?: number;
};

export type GridColumnComputedWidth = {
  width?: string;
  minWidth?: string;
};

export type GridController<T = any, M extends GridItemMeta = GridItemMeta> = Omit<Collection<T, M>, 'asService'> &
  Readonly<_GridState<T, M>> & {
    asService(): GridController<T, M>;
    addColumn(column: GridColumn<T, M>, position?: number): void;
    addSelected(id: string | string[]): void;
    initCell(rowNumber: number | 'header' | 'footer', colId: string, ref: React.RefObject<HTMLDivElement>): boolean;
    onMount(gridRef: React.RefObject<HTMLDivElement>, contentRef: React.RefObject<HTMLDivElement>): void;
    removeColumn(id: string): void;
    removeSelected(id: string | string[]): void;
    setFooter(footer?: boolean): void;
    setFooterComponent(FooterComponent?: React.FC<GridFooterProps>): void;
    setHeader(header?: boolean): void;
    setHeaderComponent(HeaderComponent?: React.FC<GridHeaderProps>): void;
    setSelected(id: string | string[]): void;
    step: 'unmounted' | 'mounted' | 'initializing';
  };

export type GridFilterProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  column: GridColumn<T, M>;
  filter?: QueryFilterOrCriteria;
};

export type GridFooterCellProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  colIndex: number;
  column: GridColumn<T, M>;
};

export type GridFooterProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  controller: GridController<T, M>;
};

export type GridHeaderCellProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  colIndex: number;
  column: GridColumn<T, M>;
  filter?: QueryFilterOrCriteria;
  sort?: QuerySortBy;
};

export type GridHeaderProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  controller: GridController<T, M>;
};

export type GridItem<T = any, M extends GridItemMeta = GridItemMeta> = Item<T, M>;

export type GridRowHandler<T = any, M extends GridItemMeta = GridItemMeta> = (
  value: GridItem<T, M>,
  index: number,
) => void;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GridItemMeta extends ItemMeta {
  selected?: boolean;
}

export type GridItems<T = any, M extends GridItemMeta = GridItemMeta> = ListItems<T, M>;

export type GridProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  controller: GridController<T, M>;
  className?: string;
};

export type GridSortProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  column: GridColumn<T, M>;
  sort: QuerySortBy;
};

type _GridState<T = any, M extends GridItemMeta = GridItemMeta> = {
  bodyClassName?: string | ((context: GridController<T, M>) => string);
  BodyComponent?: React.FC<GridBodyProps<T>>;
  bodyWidth?: string;
  columns: GridColumn<T, M>[];
  filterable?: boolean;
  fit?: boolean;
  fixHeader?: boolean;
  footer?: boolean;
  footerClassName?: string | ((context: GridController<T, M>) => string);
  FooterComponent?: React.FC<GridHeaderProps>;
  grow?: string;
  header?: boolean;
  headerClassName?: string | ((context: GridController<T, M>) => string);
  HeaderComponent?: React.FC<GridHeaderProps>;
  height?: string;
  onRowClick?: GridRowHandler<T, M>;
  onRowEnter?: GridRowHandler<T, M>;
  onRowLeave?: GridRowHandler<T, M>;
  onRowOver?: GridRowHandler<T, M>;
  onRowOut?: GridRowHandler<T, M>;
  rowClassName?: string | ((rowData: T, context: GridController<T, M>) => string);
  RowComponent?: React.FC<GridBodyRowProps<T, M>>;
  selected?: string[];
  sortable?: boolean;
};

export type GridState<T = any, M extends GridItemMeta = GridItemMeta> = CollectionState<T, M> & _GridState<T, M>;

export type InputColumn<T = any, M extends GridItemMeta = GridItemMeta> = GridColumn<T, M>;

export type SelectColumn<T = any, M extends GridItemMeta = GridItemMeta> = GridColumn<T, M> & {
  broker: CollectionBroker<T, M>;
};

export type UseGridOptions<T = any, M extends GridItemMeta = GridItemMeta> = UseCollectionOptions<T, M> &
  _GridState<T, M> & {
    dataSource?: T[] | string;
  };

export type UseInputColumnOptions<T = any, M extends GridItemMeta = GridItemMeta> = Omit<
  GridColumnSpec<T, M>,
  'CellComponent'
> &
  Omit<InputProps, 'className' | 'onFocus' | 'onChange' | 'onBlur'>;

export type UseSelectColumnOptions<T = any, M extends GridItemMeta = GridItemMeta> = Omit<
  GridColumnSpec<T, M>,
  'CellComponent'
> &
  Omit<SelectProps, 'className' | 'onFocus' | 'onChange' | 'onBlur' | 'items'> &
  UseCollectionOptions<T, M> & {
    dataSource: string | T[];
  };
