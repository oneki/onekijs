import React from 'react';
import {
  Collection,
  CollectionState,
  Item,
  ItemMeta,
  QueryFilterOrCriteria,
  QuerySortBy,
  UseCollectionOptions,
} from '../../../collection/typings';
import { ListItemProps, ListItems } from '../list/typings';

export type GridBodyCellProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  colIndex: number;
  column: GridColumn<T, M>;
  onBlur: (field: string) => void;
  onChange: (field: string, nextValue: any) => void;
  onFocus: (field: string) => void;
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
  filterable?: boolean;
  headerClassName?: string | ((column: GridColumn<T, M>, context: GridController<T, M>) => string);
  HeaderComponent?: React.FC<GridHeaderCellProps<T, M>>; //TODO put the correct props
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

export type GridController<T = any, M extends GridItemMeta = GridItemMeta> = Collection<T, M> &
  Readonly<_GridState<T, M>> & {
    asService(): GridController<T, M>;
    initCell(rowNumber: number | 'header' | 'footer', colId: string, ref: React.RefObject<HTMLDivElement>): boolean;
    onMount(gridRef: React.RefObject<HTMLDivElement>, contentRef: React.RefObject<HTMLDivElement>): void;
    step: 'unmounted' | 'mounted' | 'initializing';
  };

export type GridFilterProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  column: GridColumn<T, M>;
  filter?: QueryFilterOrCriteria;
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
export interface GridItemMeta extends ItemMeta {}

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
  grow?: string;
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
  sortable?: boolean;
};

export type GridState<T = any, M extends GridItemMeta = GridItemMeta> = CollectionState<T, M> & _GridState<T, M>;

export type UseGridOptions<T = any, M extends GridItemMeta = GridItemMeta> = UseCollectionOptions<T, M> &
  _GridState<T, M> & {
    dataSource: T[] | string;
  };
