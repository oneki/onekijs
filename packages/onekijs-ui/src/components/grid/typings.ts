import { CollectionState, Item, ItemMeta, UseCollectionOptions } from '@oneki/collection';
import React, { PropsWithoutRef, RefAttributes } from 'react';
import { ListBodyProps, ListHeaderProps, ListItemProps, ListItems } from '../list/typings';
import GridService from './GridService';

export type GridBodyCellProps<T = any> = {
  rowValue: GridItem<T>;
  rowIndex: number;
  rowId?: string | number;
  colIndex: number;
  column: GridColumn<T>;
};

export type GridBodyProps<T = any> = ListBodyProps<T, GridItemMeta>;

export type GridBodyRowProps<T = any> = ListItemProps<T, GridItemMeta> & {
  columns: GridColumn<T>[];
  CellComponent?: React.FC<GridBodyCellProps<T>>;
};

export type GridColumn<T> = GridColumnSpec<T> & {
  computedWidth?: GridColumnComputedWidth;
};

export type GridColumnSpec<T> = {
  className?: string | ((rowData: T, column: GridColumn<T>, context: GridService<T>) => string);
  CellComponent?: React.FC<GridBodyCellProps<T>>;
  headerClassName?: string | ((column: GridColumn<T>, context: GridService<T>) => string);
  HeaderComponent?: React.FC<GridHeaderCellProps<T>>; //TODO put the correct props
  id: string;
  maxWidth?: string;
  minWidth?: string;
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

export type GridHeaderCellProps<T = any> = {
  colIndex: number;
  column: GridColumn<T>;
};

export type GridHeaderProps<T = any> = ListHeaderProps & {
  columns: GridColumn<T>[];
};

export type GridItem<T> = Item<T, GridItemMeta>;
export type GridItemMeta = ItemMeta;
export type GridItems<T> = ListItems<T, GridItemMeta>;

export type GridProps<T = any> = {
  service: GridService<T>;
  contentRef: React.RefObject<HTMLDivElement>;
};

type _GridState<T> = {
  bodyClassName?: string | ((context: GridService<T>) => string);
  BodyComponent?: React.FC<GridBodyProps<T>>;
  bodyWidth?: string;
  className?: string;
  columns: GridColumn<T>[];
  fit?: boolean;
  fixHeader?: boolean;
  GridComponent?: React.ForwardRefExoticComponent<GridProps<T> & React.RefAttributes<HTMLDivElement>>;
  grow?: string;
  headerClassName?: string | ((context: GridService<T>) => string);
  HeaderComponent?: React.FC<GridHeaderProps>;
  height?: string;
  rowClassName?: string | ((rowData: T, context: GridService<T>) => string);
  RowComponent?: React.FC<GridBodyRowProps<T>>;
};

export type GridState<T> = CollectionState<T, GridItemMeta> & _GridState<T>;

export type UseGridOptions<T> = UseCollectionOptions<T, GridItemMeta> & Omit<_GridState<T>, 'columns'>;
