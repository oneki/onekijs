import { FC } from 'react';
import { Collection, ItemMeta } from '../../lib/typings';

export type ListItems<T = any, M extends ItemMeta = ItemMeta> = T[] | Collection<T, M>;

export interface ListItemProps<T = any, M extends ItemMeta = ItemMeta> {
  index: number;
  id?: string | number;
  text?: string;
  data?: T;
  meta?: M;
}

export interface ListProps<T = any, M extends ItemMeta = ItemMeta> {
  className?: string;
  items: ListItems<T, M>;
  height?: number | string;
  ItemComponent?: FC<ListItemProps<T, M>>;
  itemHeight?: number | ((index: number) => number);
  preload?: number;
  increment?: number;
}

export type ListInternalProps<T = any, M extends ItemMeta = ItemMeta> = Omit<ListProps, 'items'> & {
  collection: Collection<T, M>;
};

export enum ListStatus {
  NotInitialized = 'not initialized',
  NotLoaded = 'not loaded',
  Loading = 'loading',
  Deprecated = 'deprecate',
  PartialDeprecated = 'partial deprecated',
  PartialLoading = 'partial loading',
  Loaded = 'loaded',
}

export type StandardListProps<T = any, M extends ItemMeta = ItemMeta> = Omit<
  ListInternalProps<T, M>,
  'height' | 'itemHeight'
>;

export type VirtualListProps<T = any, M extends ItemMeta = ItemMeta> = ListInternalProps<T, M>;
