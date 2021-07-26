import { Collection, Item, ItemMeta } from '@oneki/collection';
import { FC, MutableRefObject } from 'react';

export type ListItems<T = any, M extends ItemMeta = ItemMeta> = T[] | Collection<T, M>;

export type ListItemHandler<T = any, M extends ItemMeta = ItemMeta> = (item: Item<T, M>, index: number) => void;

export interface ListItemProps<T = any, M extends ItemMeta = ItemMeta> {
  index: number;
  item: Item<T, M>;
  onClick?: ListItemHandler<T, M>;
  onMouseOver?: ListItemHandler<T, M>;
  onMouseOut?: ListItemHandler<T, M>;
  onMouseEnter?: ListItemHandler<T, M>;
  onMouseLeave?: ListItemHandler<T, M>;
}

export interface ListProps<T = any, M extends ItemMeta = ItemMeta> {
  className?: string;
  items: ListItems<T, M>;
  height?: number | string;
  ItemComponent?: FC<ListItemProps<T, M>>;
  itemHeight?: number | ((index: number) => number);
  preload?: number;
  increment?: number;
  onItemClick?: ListItemHandler<T, M>;
  onItemMouseOver?: ListItemHandler<T, M>;
  onItemMouseOut?: ListItemHandler<T, M>;
  onItemMouseEnter?: ListItemHandler<T, M>;
  onItemMouseLeave?: ListItemHandler<T, M>;
  parentRef?: MutableRefObject<null>;
  tag?: keyof JSX.IntrinsicElements;
  virtual?: boolean;
}

export type ListInternalProps<T = any, M extends ItemMeta = ItemMeta> = Omit<ListProps, 'items'> & {
  collection: Collection<T, M>;
};

export enum ListStatus {
  NotInitialized = 'not initialized',
  NotLoaded = 'not loaded',
  Loading = 'loading',
  Fetching = 'fetching',
  PartialFetching = 'partial fetching',
  PartialLoading = 'partial loading',
  Loaded = 'loaded',
}

export type StandardListProps<T = any, M extends ItemMeta = ItemMeta> = Omit<
  ListInternalProps<T, M>,
  'height' | 'itemHeight'
>;

export type VirtualListProps<T = any, M extends ItemMeta = ItemMeta> = ListInternalProps<T, M>;
