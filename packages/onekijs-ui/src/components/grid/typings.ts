import { Collection, CollectionState, Item, ItemMeta, UseCollectionOptions } from '@oneki/collection';
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

export type GridColumn<T> = {
  id: string;
  BodyCellComponent?: React.FC<GridBodyCellProps<T>>;
  width?: string | number;
  computedWidth?: string;
};

export type GridItem<T> = Item<T, GridItemMeta>;
export type GridItemMeta = ItemMeta;
export type GridItems<T> = ListItems<T, GridItemMeta>;

export type GridProps<T = any> = {
  service: GridService<T>;
};

export type GridState<T> = CollectionState<T, GridItemMeta> & {
  columns: GridColumn<T>[];
  className?: string;
};

export type GridController<T> = Collection<T, GridItemMeta> & {
  className?: string;
  columns: GridColumn<T>[];
  initCell: (rowNumber: number, colId: string, ref: React.RefObject<HTMLDivElement>) => boolean;
};

export type UseGridOptions<T> = UseCollectionOptions<T, GridItemMeta> & {
  className?: string;
};
