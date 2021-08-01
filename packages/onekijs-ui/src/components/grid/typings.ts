import { CollectionState, Item, ItemMeta, UseCollectionOptions } from '@oneki/collection';
import React from 'react';
import { ListBodyProps, ListHeaderProps, ListItemProps, ListItems } from '../list/typings';
import GridService from './GridService';

export type GridBodyCellProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  rowValue: GridItem<T>;
  rowIndex: number;
  rowId?: string | number;
  colIndex: number;
  column: GridColumn<T, M>;
};

export type GridBodyProps<T = any, M extends GridItemMeta = GridItemMeta> = ListBodyProps<T, M>;

export type GridBodyRowProps<T = any, M extends GridItemMeta = GridItemMeta> = ListItemProps<T, M> & {
  columns: GridColumn<T, M>[];
  CellComponent?: React.FC<GridBodyCellProps<T, M>>;
};

export type GridColumn<T = any, M extends GridItemMeta = GridItemMeta> = GridColumnSpec<T, M> & {
  computedWidth?: GridColumnComputedWidth;
};

export type GridColumnSpec<T = any, M extends GridItemMeta = GridItemMeta> = {
  className?: string | ((rowData: T, column: GridColumn<T, M>, context: GridService<T, M>) => string);
  CellComponent?: React.FC<GridBodyCellProps<T, M>>;
  headerClassName?: string | ((column: GridColumn<T, M>, context: GridService<T, M>) => string);
  HeaderComponent?: React.FC<GridHeaderCellProps<T, M>>; //TODO put the correct props
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

export type GridHeaderCellProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  colIndex: number;
  column: GridColumn<T, M>;
};

export type GridHeaderProps<T = any, M extends GridItemMeta = GridItemMeta> = ListHeaderProps & {
  columns: GridColumn<T, M>[];
};

export type GridItem<T = any, M extends GridItemMeta = GridItemMeta> = Item<T, M>;

export interface GridItemMeta extends ItemMeta {
  toto: string;
}

export type GridItems<T = any, M extends GridItemMeta = GridItemMeta> = ListItems<T, M>;

export type GridProps<T = any, M extends GridItemMeta = GridItemMeta> = {
  service: GridService<T, M>;
  contentRef: React.RefObject<HTMLDivElement>;
  className?: string;
};

type _GridState<T = any, M extends GridItemMeta = GridItemMeta> = {
  bodyClassName?: string | ((context: GridService<T, M>) => string);
  BodyComponent?: React.FC<GridBodyProps<T>>;
  bodyWidth?: string;
  className?: string;
  columns: GridColumn<T, M>[];
  fit?: boolean;
  fixHeader?: boolean;
  GridComponent?: React.ForwardRefExoticComponent<GridProps<T, M> & React.RefAttributes<HTMLDivElement>>;
  grow?: string;
  headerClassName?: string | ((context: GridService<T, M>) => string);
  HeaderComponent?: React.FC<GridHeaderProps>;
  height?: string;
  rowClassName?: string | ((rowData: T, context: GridService<T, M>) => string);
  RowComponent?: React.FC<GridBodyRowProps<T, M>>;
};

export type GridState<T = any, M extends GridItemMeta = GridItemMeta> = CollectionState<T, M> & _GridState<T, M>;

export type UseGridOptions<T = any, M extends GridItemMeta = GridItemMeta> = UseCollectionOptions<T, M> &
  _GridState<T, M> & {
    dataSource: T[] | string;
  };
