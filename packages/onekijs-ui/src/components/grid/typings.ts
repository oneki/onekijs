import { ListItems } from "../list/typings"
import { AnonymousObject, Item, ItemMeta } from "onekijs-core"
import React from "react"


export type GridBodyCellProps<T=any> = {
  value: any,
  rowValue: GridItem<T>,
  rowIndex: number,
  rowId?: string|number,
  colKey: string,
  colIndex: number,
  column: GridColumn<T>,
  widthRef: React.MutableRefObject<AnonymousObject<number>>,
}

export type GridBodyRowProps<T=any> = {
  value?: GridItem<T>,
  rowIndex: number,
  widthRef: React.MutableRefObject<AnonymousObject<number>>,
}

export type GridColumn<T=any> = {
  key: string,
  BodyCellComponent?: React.FC<GridBodyCellProps<T>>,
  width?: string|number;
}

export type GridContext<T=any> = {
  value: GridItem<T>;
  columns: GridColumn<T>[];
}

export type GridItem<T=any> = Item<T, ItemMeta>
export type GridItems<T=any> = ListItems<T>

export type GridProps<T=any> = {
  className?: string;
  items: GridItems<T>;
  columns: GridColumn<T>[];
}

