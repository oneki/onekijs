import { Collection, Item, ItemMeta } from '@oneki/collection';
import React from 'react';
import { ListInternalProps, ListItemProps, ListItems } from '../list/typings';

export type GridBodyCellProps<T = any, M extends ItemMeta = ItemMeta> = {
  rowValue: GridItem<T, M>;
  rowIndex: number;
  rowId?: string | number;
  colId: string;
  colIndex: number;
  column: GridColumn<T, M>;
};

export type GridBodyProps<T = any, M extends ItemMeta = ItemMeta> = Omit<ListInternalProps<T, M>, 'ItemComponent'> & {
  columns: GridColumn<T, M>[];
  RowComponent?: React.FC<GridBodyRowProps<T, M>>
};

export type GridBodyRowProps<T = any, M extends ItemMeta = ItemMeta> = ListItemProps<T, M> & {
  columns: GridColumn<T, M>[];
  CellComponent?: React.FC<GridBodyCellProps<T, M>>
};

export type GridColumn<T, M> = {
  id: string;
  BodyCellComponent?: React.FC<GridBodyCellProps<T, M>>;
  width?: string | number;
  computedWidth?: string;
};


export type GridItem<T, M> = Item<T, M>;
export type GridItems<T, M> = ListItems<T, M>;


export type UseGridProps<T = any, M extends ItemMeta = ItemMeta> = {
  className?: string;
  items: GridItems<T, M>;
  columns: GridColumn<T, M>[];
};

export type GridProps<T = any, M extends ItemMeta = ItemMeta> = {
  controller: GridController<T, M>
}

export type GridState<T, M> = {
  columns:  GridColumn<T, M>[];
  className?: string;
}

export type GridController<T, M> = Collection<T,M> & {
  className?: string;
  columns: GridColumn<T, M>[];
  initCell: (rowNumber: number, colId: string, ref: React.RefObject<HTMLDivElement>) => boolean;
}

export type GridContext<T = any, M extends ItemMeta = ItemMeta> = Omit<GridController<T,M>, 'items' | 'hasMore' | 'items' | 'status' | 'total' | 'columns' | 'className'>
