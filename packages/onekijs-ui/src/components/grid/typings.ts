import { CollectionState, Item, ItemMeta, UseCollectionOptions } from '@oneki/collection';
import React from 'react';
import { ListInternalProps, ListItemProps, ListItems } from '../list/typings';
import GridService from './GridService';

export type GridBodyCellProps<T = any> = {
  rowValue: GridItem<T>;
  rowIndex: number;
  rowId?: string | number;
  colId: string;
  colIndex: number;
  column: GridColumn<T>;
};

export type GridBodyProps<T = any> = Omit<ListInternalProps<T, GridItemMeta>, 'ItemComponent'> & {
  columns: GridColumn<T>[];
  RowComponent?: React.FC<GridBodyRowProps<T>>;
};

export type GridBodyRowProps<T = any> = ListItemProps<T, GridItemMeta> & {
  columns: GridColumn<T>[];
  CellComponent?: React.FC<GridBodyCellProps<T>>;
};

export type GridColumn<T> = Omit<GridColumnSpec<T>, 'width'> & {
  width: GridColumnWidth;
  computedWidth?: string;
};

export type GridColumnSpec<T> = {
  className?: string | ((rowData: T, column: GridColumn<T>, context: GridService<T>) => string);
  CellComponent?: React.FC<GridBodyCellProps<T>>;
  HeaderComponent?: React.FC; //TODO put the correct props
  id: string;
  width?: string | number;
};

export type GridColumnWidth = {
  auto?: boolean;
  grow?: boolean;
  force?: boolean;
  unit?: 'px' | '%';
  value?: number;
};

export type GridItem<T> = Item<T, GridItemMeta>;
export type GridItemMeta = ItemMeta;
export type GridItems<T> = ListItems<T, GridItemMeta>;

export type GridProps<T = any> = {
  service: GridService<T>;
  bodyRef: React.RefObject<HTMLDivElement>;
};

type _GridState<T> = {
  bodyClassName?: string | ((context: GridService<T>) => string);
  BodyComponent?: React.ForwardRefExoticComponent<GridBodyProps<T> & React.RefAttributes<HTMLDivElement>>;
  bodyWidth?: string;
  className?: string;
  columns: GridColumn<T>[];
  fit?: boolean;
  GridComponent?: React.ForwardRefExoticComponent<GridProps<T> & React.RefAttributes<HTMLDivElement>>;
  grow?: string;
  HeaderComponent?: React.FC;
  height?: string;
  rowClassName?: string | ((rowData: T, context: GridService<T>) => string);
  RowComponent?: React.FC<GridBodyRowProps<T>>;
};

export type GridState<T> = CollectionState<T, GridItemMeta> & _GridState<T>;

export type UseGridOptions<T> = UseCollectionOptions<T, GridItemMeta> & Omit<_GridState<T>, 'columns'>;
